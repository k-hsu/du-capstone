import React, { useEffect } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { render, screen } from "../../test-utils";
import {
  useGetAuthors,
  useGetAuthor,
  useAddAuthor,
  useFindAuthorByName,
} from "../../api/authors";

jest.mock("@apollo/client");

describe("Authors test", () => {
  const AuthorsTest = () => {
    const { authors } = useGetAuthors();
    const { author } = useGetAuthor();
    const { authorByName } = useFindAuthorByName();
    const { addAuthor } = useAddAuthor();
    addAuthor({
      variables: {},
    });
    return authors && author && authorByName ? <div>test</div> : null;
  };
  it("should use authors hook without error", () => {
    const data = { findAuthorByName: null };
    useQuery.mockReturnValue({
      loading: false,
      error: null,
      data,
      refetch: () => {},
    });
    useMutation.mockReturnValue([
      () => {},
      { loading: false, error: null, data },
    ]);
    render(<AuthorsTest />);

    expect(screen.getByText("test")).toBeInTheDocument();
  });
});
