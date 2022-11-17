import { useQuery, useMutation } from "@apollo/client";
import { renderHook } from "../../test-utils";
import {
  useGetBooks,
  useGetBook,
  useAddBook,
  useRemoveBook,
} from "../../api/books";

jest.mock("@apollo/client");

describe("Books test", () => {
  it("should call useGetBooks hook without error", () => {
    const getBooks = [
      {
        id: "1",
        title: "Harry Potter and the Chamber of Secrets",
        author: {
          id: "1",
          firstName: "J.K.",
          lastName: "Rowling",
        },
      },
    ];
    useQuery.mockReturnValue({
      loading: false,
      error: null,
      data: { getBooks },
    });

    const { result } = renderHook(() => useGetBooks());

    expect(result.current.booksLoading).toBe(false);
    expect(result.current.booksError).toBe(null);
    expect(result.current.books).toEqual(getBooks);
  });
  it("should call useGetBook hook without error", () => {
    const getBook = {
      id: "1",
      title: "Harry Potter and the Chamber of Secrets",
      author: {
        id: "1",
        firstName: "J.K.",
        lastName: "Rowling",
      },
    };
    useQuery.mockReturnValue({
      loading: false,
      error: null,
      data: { getBook },
    });

    const { result } = renderHook(() => useGetBook("1"));

    expect(result.current.bookLoading).toBe(false);
    expect(result.current.bookError).toBe(null);
    expect(result.current.book).toEqual(getBook);
  });
  it("should call useAddBook hook without error", async () => {
    const addBook = {
      id: "1",
      title: "Harry Potter and the Chamber of Secrets",
      author: {
        id: "1",
        firstName: "J.K.",
        lastName: "Rowling",
      },
    };
    const addBookMock = jest.fn(() => ({ data: { addBook } }));
    useMutation.mockReturnValue([
      addBookMock,
      { loading: false, error: null, data: { addBook } },
    ]);

    const { result } = renderHook(() => useAddBook("1"));

    expect(result.current.addBookLoading).toBe(false);
    expect(result.current.addBookError).toBe(null);
    expect(result.current.addBookData).toEqual({ addBook });
    const response = await result.current.addBook(
      "Harry Potter and the Chamber of Secrets",
      "1",
      null,
      [],
      "Harry Potter and the Chamber of Secrets is a 1998 young adult fantasy novel by J.K. Rowling, the second in the Harry Potter series. The story follows Harry’s tumultuous second year at Hogwarts School of Witchcraft and Wizardry, including an encounter with Voldemort, the wizard who killed Harry’s parents. Against this fantastic backdrop, Rowling examines such themes as death, fame, friendship, choice, and prejudice. Upon release, the novel became a worldwide bestseller and won several awards, including Children’s Book of the Year at the British Book Awards and the Nestlé Smarties Book Award; it was subsequently adapted into a 2002 film directed by Chris Columbus."
    );
    expect(response).toEqual({ data: { addBook } });
    expect(addBookMock).toBeCalledWith({
      variables: {
        title: "Harry Potter and the Chamber of Secrets",
        authorId: "1",
        coverImage: null,
        categoryIds: [],
        description:
          "Harry Potter and the Chamber of Secrets is a 1998 young adult fantasy novel by J.K. Rowling, the second in the Harry Potter series. The story follows Harry’s tumultuous second year at Hogwarts School of Witchcraft and Wizardry, including an encounter with Voldemort, the wizard who killed Harry’s parents. Against this fantastic backdrop, Rowling examines such themes as death, fame, friendship, choice, and prejudice. Upon release, the novel became a worldwide bestseller and won several awards, including Children’s Book of the Year at the British Book Awards and the Nestlé Smarties Book Award; it was subsequently adapted into a 2002 film directed by Chris Columbus.",
      },
    });
  });
  it("should call useRemoveBook hook without error", () => {
    useMutation.mockReturnValue([
      () => null,
      { loading: false, error: null, data: null },
    ]);

    const { result } = renderHook(() => useRemoveBook("1"));
    expect(result.current.removeBookLoading).toBe(false);
    expect(result.current.removeBookError).toBe(null);
    expect(result.current.removeBookData).toBe(null);
    expect(result.current.removeBook).toEqual(expect.any(Function));
  });
});
