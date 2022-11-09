import React from "react";
import { render, screen, renderer } from "../../../test-utils";
import Book from "../../../components/Book/Book";

jest.mock("next/router", () => ({
  useRouter: () => ({ push: () => {} }),
}));
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
  it("should render book component styles", () => {
    const component = renderer.create(
      <Book
        title="Harry Potter and the Chamber of Secrets"
        author={{ firstName: "J.K.", lastName: "Rowling" }}
      />
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
