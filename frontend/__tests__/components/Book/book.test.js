import React from "react";
import { useRouter } from "next/router";
import { render, screen, userEvent } from "../../../test-utils";
import Book from "../../../components/Book/Book";

jest.mock("next/router", () => ({ useRouter: jest.fn() }));
describe("Book", () => {
  it("should render book component", () => {
    render(
      <Book
        title="Harry Potter and the Chamber of Secrets"
        author={{ firstName: "J.K.", lastName: "Rowling" }}
      />
    );
    expect(
      screen.getByText("Harry Potter and the Chamber of Secrets")
    ).toBeInTheDocument();
    expect(screen.getByText("J.K. Rowling")).toBeInTheDocument();
  });
  it("should route to url when clicked", () => {
    const mockRouterPush = jest.fn();
    useRouter.mockImplementation(() => ({ push: mockRouterPush }));
    render(
      <Book
        id="rowling-1"
        title="Harry Potter and the Chamber of Secrets"
        author={{ firstName: "J.K.", lastName: "Rowling" }}
      />
    );
    userEvent.click(
      screen.getByText("Harry Potter and the Chamber of Secrets")
    );

    expect(mockRouterPush).toBeCalledWith("/books/rowling-1");
  });
});
