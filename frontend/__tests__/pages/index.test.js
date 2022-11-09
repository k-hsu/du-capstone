import React from "react";
import { render, screen, userEvent, waitFor } from "../../test-utils";
import Index from "../../pages/index";
import ToastProvider from "../../providers/ToastProvider/ToastProvider";
import { useGetBooks, useAddBookByAuthorName } from "../../api/books";
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
    useAddBookByAuthorName.mockReturnValue({ addBook: () => {} });
    render(<Index />);

    expect(screen.getByText("My Library")).toBeInTheDocument();
    expect(screen.getByText("DU Capstone")).toBeInTheDocument();
    expect(screen.getByText("There is nothing here")).toBeInTheDocument();
  });
  it("should render Index page with a book", () => {
    const booksData = [
      {
        id: "1",
        title: "Harry Potter and the Chamber of Secrets",
        author: { firstName: "J.K.", lastName: "Rowling" },
        description:
          "Harry Potter and the Chamber of Secrets is a 1998 young adult fantasy novel by J.K. Rowling, the second in the Harry Potter series. The story follows Harry’s tumultuous second year at Hogwarts School of Witchcraft and Wizardry, including an encounter with Voldemort, the wizard who killed Harry’s parents. Against this fantastic backdrop, Rowling examines such themes as death, fame, friendship, choice, and prejudice. Upon release, the novel became a worldwide bestseller and won several awards, including Children’s Book of the Year at the British Book Awards and the Nestlé Smarties Book Award; it was subsequently adapted into a 2002 film directed by Chris Columbus.",
      },
      {
        id: "2",
        title: "Harry Potter and the Prisoner of Azkaban",
        author: "1",
      },
    ];
    useGetBooks.mockReturnValue({ books: booksData });
    useAddBookByAuthorName.mockReturnValue({ addBook: () => {} });
    render(<Index />);

    expect(screen.getByText("My Library")).toBeInTheDocument();
    expect(screen.getByText("DU Capstone")).toBeInTheDocument();
    expect(screen.getByText(booksData[0].title)).toBeInTheDocument();
    expect(
      screen.getByText(
        `${booksData[0].author.firstName} ${booksData[0].author.lastName}`
      )
    ).toBeInTheDocument();
    expect(screen.getByText(booksData[1].title)).toBeInTheDocument();
    expect(
      screen.getByText(
        `${booksData[1].author.firstName} ${booksData[1].author.lastName}`
      )
    ).toBeInTheDocument();
  });
  it("should close Add Book Modal if onClose is called", async () => {
    useGetBooks.mockReturnValue({ books: [] });
    useAddBookByAuthorName.mockReturnValue({ addBook: () => {} });
    AddBookModal.mockImplementation(({ onClose }) => {
      return <button onClick={onClose}>Book Is Being Added</button>;
    });
    render(<Index />);

    await userEvent.click(screen.getByText("+ Add Book"));
    expect(screen.getByText("Book Is Being Added")).toBeInTheDocument();

    await userEvent.click(screen.getByText("Book Is Being Added"));
    expect(screen.queryByText("Book Is Being Added")).toBeNull();
  });
  it("should add book if onSubmit is called", async () => {
    const addBookMock = jest.fn();
    useGetBooks.mockReturnValue({ books: [] });
    useAddBookByAuthorName.mockReturnValue({ addBook: addBookMock });
    const bookInputData = {
      title: "Book",
      author: "Encyclopedia Brown",
      description:
        'Encyclopedia Brown is a series of books featuring the adventures of boy detective Leroy Brown, nicknamed "Encyclopedia" for his intelligence and range of knowledge. The series of 29 children\'s novels was written (one co-written) by Donald J. Sobol, with the first book published in 1963 and the last published posthumously in 2012.',
    };
    AddBookModal.mockImplementation(({ onSubmit }) => {
      return (
        <button onClick={() => onSubmit(bookInputData)}>
          Book Is Being Added
        </button>
      );
    });
    render(
      <ToastProvider>
        <Index />
      </ToastProvider>
    );

    await userEvent.click(screen.getByText("+ Add Book"));
    expect(screen.getByText("Book Is Being Added")).toBeInTheDocument();

    await userEvent.click(screen.getByText("Book Is Being Added"));
    expect(screen.queryByText("Book Is Being Added")).toBeNull();
    await waitFor(() => screen.findByText("Book was added to the library"), {
      timeout: 3000,
    });
    expect(addBookMock).toBeCalledWith(
      bookInputData.title,
      bookInputData.author.split(" ")[0],
      bookInputData.author.split(" ")[1],
      null,
      [],
      bookInputData.description
    );
  });
});
