import React from "react";
import { useMutation, useQuery } from "@apollo/client";
import { render, screen } from "../../test-utils";
import { useGetAuthors, useGetAuthor, useAddAuthor } from "../../api/authors";

jest.mock("@apollo/client");

describe("Authors test", () => {
  const AuthorsTest = () => {
    const { authors } = useGetAuthors();
    const { author } = useGetAuthor();
    const { addAuthor } = useAddAuthor();
    addAuthor({
      variables: {},
    });
    return authors && author ? <div>test</div> : null;
  };
  it("should use authors hook without error", () => {
    const data = {};
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
