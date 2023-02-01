import React from "react";
import { render, screen, userEvent, waitFor } from "../../test-utils";
import Index from "../../pages/index";
import ToastProvider from "../../providers/ToastProvider/ToastProvider";
import { useGetBooks, useAddBook } from "../../api/books";
import AddBookModal from "../../components/AddBookModal/AddBookModal";

jest.mock(
  "next/head",
  () =>
    ({ children }) =>
      children
);

jest.mock("../../api/books");

jest.mock("../../components/AddBookModal/AddBookModal");

describe("Index page", () => {
  it("should render Index page with no books", () => {
    useGetBooks.mockReturnValue({ books: [] });
    useAddBook.mockReturnValue({ addBook: () => {} });
    render(<Index />);

    expect(screen.getByText("My Library")).toBeInTheDocument();
    expect(screen.getByText("There is nothing here")).toBeInTheDocument();
  });
  it("should render Index page with a book", () => {
    useGetBooks.mockReturnValue({
      books: [
        {
          id: "1",
          title: "Harry Potter and the Chamber of Secrets",
          author: { id: "1", firstName: "J.K.", lastName: "Rowling" },
          description:
            "Harry Potter and the Chamber of Secrets is a 1998 young adult fantasy novel by J.K. Rowling, the second in the Harry Potter series. The story follows Harry’s tumultuous second year at Hogwarts School of Witchcraft and Wizardry, including an encounter with Voldemort, the wizard who killed Harry’s parents. Against this fantastic backdrop, Rowling examines such themes as death, fame, friendship, choice, and prejudice. Upon release, the novel became a worldwide bestseller and won several awards, including Children’s Book of the Year at the British Book Awards and the Nestlé Smarties Book Award; it was subsequently adapted into a 2002 film directed by Chris Columbus.",
        },
        {
          id: "2",
          title: "Harry Potter and the Prisoner of Azkaban",
          author: { id: "2", firstName: "JK", lastName: "Rowling" },
        },
      ],
    });
    useAddBook.mockReturnValue({ addBook: () => {} });
    render(<Index />);

    expect(screen.getByText("My Library")).toBeInTheDocument();
    expect(
      screen.getByText("Harry Potter and the Chamber of Secrets")
    ).toBeInTheDocument();
    expect(screen.getByText("J.K. Rowling")).toBeInTheDocument();
    expect(
      screen.getByText("Harry Potter and the Prisoner of Azkaban")
    ).toBeInTheDocument();
    expect(screen.getByText("JK Rowling")).toBeInTheDocument();
  });
  it("should close Add Book Modal if onClose is called", () => {
    useGetBooks.mockReturnValue({ books: [] });
    useAddBook.mockReturnValue({ addBook: () => {} });
    AddBookModal.mockImplementation(({ onClose }) => {
      return <button onClick={onClose}>Book Is Being Added</button>;
    });
    render(<Index />);

    userEvent.click(screen.getByText("+ Add Book"));
    expect(screen.getByText("Book Is Being Added")).toBeInTheDocument();

    userEvent.click(screen.getByText("Book Is Being Added"));
    expect(screen.queryByText("Book Is Being Added")).toBeNull();
  });
  it("should add book if onSubmit is called", async () => {
    const addBookMock = jest.fn();
    useGetBooks.mockReturnValue({ books: [] });
    useAddBook.mockReturnValue({ addBook: addBookMock });
    AddBookModal.mockImplementation(({ onSubmit }) => {
      return (
        <button
          onClick={() =>
            onSubmit({
              title: "Book",
              author: "Encyclopedia Brown",
              description:
                'Encyclopedia Brown is a series of books featuring the adventures of boy detective Leroy Brown, nicknamed "Encyclopedia" for his intelligence and range of knowledge. The series of 29 children\'s novels was written (one co-written) by Donald J. Sobol, with the first book published in 1963 and the last published posthumously in 2012.',
            })
          }
        >
          Book Is Being Added
        </button>
      );
    });
    render(
      <ToastProvider>
        <Index />
      </ToastProvider>
    );

    userEvent.click(screen.getByText("+ Add Book"));
    expect(screen.getByText("Book Is Being Added")).toBeInTheDocument();

    userEvent.click(screen.getByText("Book Is Being Added"));
    await waitFor(
      () => expect(screen.queryByText("Book Is Being Added")).toBeNull(),
      {
        timeout: 3000,
      }
    );
    expect(
      screen.getByText("Book was added to the library")
    ).toBeInTheDocument();
    expect(addBookMock).toBeCalledWith(
      "Book",
      "Encyclopedia Brown",
      null,
      [],
      'Encyclopedia Brown is a series of books featuring the adventures of boy detective Leroy Brown, nicknamed "Encyclopedia" for his intelligence and range of knowledge. The series of 29 children\'s novels was written (one co-written) by Donald J. Sobol, with the first book published in 1963 and the last published posthumously in 2012.'
    );
  });
});
