import { useMutation, useQuery } from "@apollo/client";
import { renderHook } from "../../test-utils";
import { useGetAuthors, useGetAuthor, useAddAuthor } from "../../api/authors";

jest.mock("@apollo/client");

describe("Authors test", () => {
  it("should call useGetAuthors hook without error", () => {
    const getAuthors = [
      {
        id: "1",
        firstName: "J.K.",
        lastName: "Rowling",
      },
    ];
    useQuery.mockReturnValue({
      loading: false,
      error: null,
      data: { getAuthors },
    });

    const { result } = renderHook(() => useGetAuthors());

    expect(result.current.authorsLoading).toBe(false);
    expect(result.current.authorsError).toBe(null);
    expect(result.current.authors).toEqual(getAuthors);
  });
  it("should call useGetAuthor hook without error", () => {
    const getAuthor = {
      id: "1",
      firstName: "J.K.",
      lastName: "Rowling",
    };
    useQuery.mockReturnValue({
      loading: false,
      error: null,
      data: { getAuthor },
    });

    const { result } = renderHook(() => useGetAuthor("1"));

    expect(result.current.authorLoading).toBe(false);
    expect(result.current.authorError).toBe(null);
    expect(result.current.author).toEqual(getAuthor);
  });
  it("should call useAddAuthor hook without error", async () => {
    const addAuthor = {
      id: "1",
      firstName: "J.K.",
      lastName: "Rowling",
    };
    const addAuthorMock = jest.fn(() => ({ data: { addAuthor } }));
    useMutation.mockReturnValue([
      addAuthorMock,
      { loading: false, error: null, data: { addAuthor } },
    ]);

    const { result } = renderHook(() => useAddAuthor("1"));

    expect(result.current.addAuthorLoading).toBe(false);
    expect(result.current.addAuthorError).toBe(null);
    expect(result.current.addAuthorData).toEqual({ addAuthor });
    const response = await result.current.addAuthor("J.K.", "Rowling");
    expect(response).toEqual(addAuthor);
    expect(addAuthorMock).toBeCalledWith({
      variables: { firstName: "J.K.", lastName: "Rowling" },
    });
  });
});
