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
    useGetBook.mockReturnValue({
      book: {
        title: "Harry Potter and the Chamber of Secrets",
        author: { firstName: "J.K.", lastName: "Rowling" },
        description:
          "Harry Potter and the Chamber of Secrets is a 1998 young adult fantasy novel by J.K. Rowling, the second in the Harry Potter series.",
      },
    });
    render(<BooksDetailPage />);
    expect(
      screen.getByRole("heading", {
        name: "Harry Potter and the Chamber of Secrets",
      })
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "Harry Potter and the Chamber of Secrets is a 1998 young adult fantasy novel by J.K. Rowling, the second in the Harry Potter series."
      )
    ).toBeInTheDocument();
    expect(screen.getByText("J.K. Rowling")).toBeInTheDocument();
  });

  it("should show error if data is not loaded correctly", () => {
    useGetBook.mockReturnValue({
      bookError: "Err on the Side of Caution",
      book: {},
    });
    render(<BooksDetailPage />);
    expect(screen.getByText("An error has occured")).toBeInTheDocument();
  });
});
