import React from "react";
import { useQuery, useMutation } from "@apollo/client";
import { render, screen } from "../../test-utils";
import {
  useGetBooks,
  useGetBook,
  useAddBook,
  useRemoveBook,
} from "../../api/books";

jest.mock("@apollo/client");

describe("Books test", () => {
  const BooksTest = () => {
    const { books } = useGetBooks();
    const { book } = useGetBook();
    const { addBook } = useAddBook();
    const { removeBook } = useRemoveBook();
    addBook();
    removeBook();

    return books && book ? <div>test</div> : null;
  };
  it("should use books hook without error", () => {
    const data = {};
    useQuery.mockReturnValue({ loading: false, error: null, data });
    useMutation.mockReturnValue([
      () => {},
      { loading: false, error: null, data },
    ]);
    render(<BooksTest />);

    expect(screen.getByText("test")).toBeInTheDocument();
  });
});
