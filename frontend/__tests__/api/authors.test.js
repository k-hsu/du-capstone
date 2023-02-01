import React from "react";
import { MockedProvider } from "@apollo/client/testing";
import { renderHook, waitFor, act } from "../../test-utils";
import {
  useGetAuthors,
  useGetAuthor,
  useAddAuthor,
  ADD_AUTHOR_GQL,
  GET_AUTHOR_GQL,
  GET_AUTHORS_GQL,
} from "../../api/authors";

describe("Authors test", () => {
  const mocks = [
    {
      request: {
        query: GET_AUTHORS_GQL,
        variables: {},
      },
      result: {
        data: {
          getAuthors: [
            {
              id: "1",
              firstName: "J.K.",
              lastName: "Rowling",
            },
          ],
        },
      },
    },
    {
      request: {
        query: GET_AUTHOR_GQL,
        variables: {
          id: "1",
        },
      },
      result: {
        data: {
          getAuthor: {
            id: "1",
            firstName: "J.K.",
            lastName: "Rowling",
            books: [],
          },
        },
      },
    },
    {
      request: {
        query: ADD_AUTHOR_GQL,
        variables: {
          firstName: "J.K.",
          lastName: "Rowling",
        },
      },
      result: {
        data: {
          addAuthor: {
            id: "1",
            firstName: "J.K.",
            lastName: "Rowling",
          },
        },
      },
    },
    {
      request: {
        query: ADD_AUTHOR_GQL,
        variables: {
          firstName: "Suzanne",
          lastName: "Collins",
        },
      },
      result: {
        data: {
          addAuthor: {
            id: "2",
            firstName: "Suzanne",
            lastName: "Collins",
          },
        },
      },
    },
  ];
  it("should call useGetAuthors hook without error", async () => {
    const { result } = renderHook(() => useGetAuthors(), {
      wrapper: ({ children }) => (
        <MockedProvider mocks={mocks}>{children}</MockedProvider>
      ),
    });

    await waitFor(() => expect(result.current.authorsLoading).toBe(false), {
      timeout: 3000,
    });
    expect(result.current.authorsLoading).toBe(false);
    expect(result.current.authorsError).toBe(undefined);
    expect(result.current.getAuthors()).toEqual([]);

    await act(async () => await result.current.refetchAuthors());
    expect(result.current.getAuthors()).toEqual([
      {
        id: "1",
        firstName: "J.K.",
        lastName: "Rowling",
      },
    ]);
  });
  it("should call useGetAuthor hook without error", async () => {
    const { result } = renderHook(() => useGetAuthor("1"), {
      wrapper: ({ children }) => (
        <MockedProvider mocks={mocks}>{children}</MockedProvider>
      ),
    });
    await waitFor(() => expect(result.current.authorLoading).toBe(false), {
      timeout: 3000,
    });
    expect(result.current.authorLoading).toBe(false);
    expect(result.current.authorError).toBe(undefined);
    expect(result.current.author).toEqual({
      id: "1",
      firstName: "J.K.",
      lastName: "Rowling",
      books: [],
    });
  });
  it("should call useAddAuthor hook without error", async () => {
    const { result } = renderHook(() => useAddAuthor("J.K.", "Rowling"), {
      wrapper: ({ children }) => (
        <MockedProvider mocks={mocks}>{children}</MockedProvider>
      ),
    });
    await act(async () => await result.current.addAuthor("J.K.", "Rowling"));
    expect(result.current.addAuthorLoading).toBe(false);
    expect(result.current.addAuthorError).toBe(undefined);
    expect(result.current.getAddAuthorData()).toEqual({
      id: "1",
      firstName: "J.K.",
      lastName: "Rowling",
    });
    await act(async () => await result.current.addAuthor("Suzanne", "Collins"));
    expect(result.current.getAddAuthorData()).toEqual({
      id: "2",
      firstName: "Suzanne",
      lastName: "Collins",
    });
  });
});
