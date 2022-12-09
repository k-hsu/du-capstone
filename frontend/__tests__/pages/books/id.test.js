import React from "react";
import { render, screen } from "../../../test-utils";
import BooksDetailPage from "../../../pages/books/[id]";
import { useGetBook } from "../../../api/books";

jest.mock("../../../api/books");
jest.mock("next/router", () => ({
  useRouter: () => ({ query: { id: "1" } }),
}));

describe("Books Detail Page", () => {
  it("should render books detail page", () => {
    const bookData = {
      title: "Harry Potter and the Chamber of Secrets",
      author: { firstName: "J.K.", lastName: "Rowling" },
      description:
        "Harry Potter and the Chamber of Secrets is a 1998 young adult fantasy novel by J.K. Rowling, the second in the Harry Potter series. The story follows Harry’s tumultuous second year at Hogwarts School of Witchcraft and Wizardry, including an encounter with Voldemort, the wizard who killed Harry’s parents. Against this fantastic backdrop, Rowling examines such themes as death, fame, friendship, choice, and prejudice. Upon release, the novel became a worldwide bestseller and won several awards, including Children’s Book of the Year at the British Book Awards and the Nestlé Smarties Book Award; it was subsequently adapted into a 2002 film directed by Chris Columbus.",
    };
    useGetBook.mockReturnValue({ book: bookData });
    render(<BooksDetailPage />);
    expect(screen.getAllByText(bookData.title)[0]).toBeInTheDocument();
    expect(screen.getByText(bookData.description)).toBeInTheDocument();
    expect(
      screen.getByText(
        `${bookData.author.firstName} ${bookData.author.lastName}`
      )
    ).toBeInTheDocument();
  });

  it("should show error if data is not loaded correctly", () => {
    useGetBook.mockReturnValue({ bookError: "Err on the Side of Caution" });
    render(<BooksDetailPage />);
    expect(screen.getByText("An error has occured")).toBeInTheDocument();
  });
});
