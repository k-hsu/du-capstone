import React from "react";
import { render, screen } from "../../test-utils";
import App from "../../pages/_app";

jest.mock("@emotion/react", () => ({
  css: () => "",
  Global: () => <div>rendering styles</div>,
}));

describe("App page", () => {
  it("should render App page", () => {
    render(<App Component={() => <div>section content</div>} />);

    expect(screen.getByText("section content")).toBeInTheDocument();
    expect(screen.getByText("rendering styles")).toBeInTheDocument();
  });
});
