import React from "react";
import { renderHook, waitFor } from "../../test-utils";
import { GET_AUTHORS_GQL, ADD_AUTHOR_GQL } from "../../api/authors";
import {
  useGetBooks,
  useGetBook,
  useAddBook,
  useRemoveBook,
  GET_BOOKS_GQL,
  GET_BOOK_GQL,
  ADD_BOOK_GQL,
  REMOVE_BOOK_GQL,
} from "../../api/books";
import { MockedProvider } from "@apollo/client/testing";

describe("Books test", () => {
  const mocks = [
    {
      request: {
        query: GET_AUTHORS_GQL,
        variables: {},
      },
      result: {
        data: {
          getAuthors: [],
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
        query: GET_BOOKS_GQL,
        variables: {},
      },
      result: {
        data: {
          getBooks: [
            {
              id: "1",
              title: "Harry Potter and the Chamber of Secrets",
              author: {
                id: "1",
                firstName: "J.K.",
                lastName: "Rowling",
              },
            },
          ],
        },
      },
    },
    {
      request: {
        query: GET_BOOK_GQL,
        variables: {
          id: "1",
        },
      },
      result: {
        data: {
          getBook: {
            id: "1",
            title: "Harry Potter and the Chamber of Secrets",
            author: {
              id: "1",
              firstName: "J.K.",
              lastName: "Rowling",
            },
          },
        },
      },
    },
    {
      request: {
        query: ADD_BOOK_GQL,
        variables: {
          title: "Harry Potter and the Chamber of Secrets",
          authorId: "1",
          coverImage: null,
          categoryIds: [],
          description:
            "Harry Potter and the Chamber of Secrets is a 1998 young adult fantasy novel by J.K. Rowling, the second in the Harry Potter series. The story follows Harry’s tumultuous second year at Hogwarts School of Witchcraft and Wizardry, including an encounter with Voldemort, the wizard who killed Harry’s parents. Against this fantastic backdrop, Rowling examines such themes as death, fame, friendship, choice, and prejudice. Upon release, the novel became a worldwide bestseller and won several awards, including Children’s Book of the Year at the British Book Awards and the Nestlé Smarties Book Award; it was subsequently adapted into a 2002 film directed by Chris Columbus.",
        },
      },
      result: {
        data: {
          addBook: {
            id: "1",
            title: "Harry Potter and the Chamber of Secrets",
            author: {
              id: "1",
              firstName: "J.K.",
              lastName: "Rowling",
            },
          },
        },
      },
    },
    {
      request: {
        query: REMOVE_BOOK_GQL,
        variables: {
          id: "1",
        },
      },
      result: {
        data: {
          removeBook: null,
        },
      },
    },
  ];
  it("should call useGetBooks hook without error", async () => {
    const { result } = renderHook(() => useGetBooks(), {
      wrapper: ({ children }) => (
        <MockedProvider mocks={mocks}>{children}</MockedProvider>
      ),
    });

    await waitFor(() => expect(result.current.booksLoading).toBe(false), {
      timeout: 3000,
    });
    expect(result.current.booksLoading).toBe(false);
    expect(result.current.booksError).toBe(undefined);
    expect(result.current.books).toEqual([
      {
        id: "1",
        title: "Harry Potter and the Chamber of Secrets",
        author: {
          id: "1",
          firstName: "J.K.",
          lastName: "Rowling",
        },
      },
    ]);
  });
  it("should call useGetBook hook without error", async () => {
    const { result } = renderHook(() => useGetBook("1"), {
      wrapper: ({ children }) => (
        <MockedProvider mocks={mocks}>{children}</MockedProvider>
      ),
    });

    await waitFor(() => expect(result.current.bookLoading).toBe(false), {
      timeout: 3000,
    });
    expect(result.current.bookLoading).toBe(false);
    expect(result.current.bookError).toBe(undefined);
    expect(result.current.book).toEqual({
      id: "1",
      title: "Harry Potter and the Chamber of Secrets",
      author: {
        id: "1",
        firstName: "J.K.",
        lastName: "Rowling",
      },
    });
  });
  it("should call useAddBook hook without error", async () => {
    const { result } = renderHook(() => useAddBook("1"), {
      wrapper: ({ children }) => (
        <MockedProvider mocks={mocks}>{children}</MockedProvider>
      ),
    });

    await result.current.addBook(
      "Harry Potter and the Chamber of Secrets",
      "J.K. Rowling",
      null,
      [],
      "Harry Potter and the Chamber of Secrets is a 1998 young adult fantasy novel by J.K. Rowling, the second in the Harry Potter series. The story follows Harry’s tumultuous second year at Hogwarts School of Witchcraft and Wizardry, including an encounter with Voldemort, the wizard who killed Harry’s parents. Against this fantastic backdrop, Rowling examines such themes as death, fame, friendship, choice, and prejudice. Upon release, the novel became a worldwide bestseller and won several awards, including Children’s Book of the Year at the British Book Awards and the Nestlé Smarties Book Award; it was subsequently adapted into a 2002 film directed by Chris Columbus."
    );
    expect(result.current.addBookLoading).toBe(false);
    expect(result.current.addBookError).toBe(undefined);
    expect(result.current.getAddBookData()).toEqual({
      id: "1",
      title: "Harry Potter and the Chamber of Secrets",
      author: {
        id: "1",
        firstName: "J.K.",
        lastName: "Rowling",
      },
    });
  });
  it("should call useRemoveBook hook without error", async () => {
    const { result } = renderHook(() => useRemoveBook("1"), {
      wrapper: ({ children }) => (
        <MockedProvider mocks={mocks}>{children}</MockedProvider>
      ),
    });

    await waitFor(() => expect(result.current.removeBookLoading).toBe(false), {
      timeout: 3000,
    });
    expect(result.current.removeBookError).toBe(undefined);
    expect(result.current.removeBookData).toBe(undefined);
    expect(result.current.removeBook).toEqual(expect.any(Function));
  });
});
