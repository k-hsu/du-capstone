import React from "react";
import { render, screen } from "../../test-utils";
import Index from "../../pages/index";

jest.mock(
  "next/head",
  () =>
    ({ children }) =>
      children
);

describe("Index page", () => {
  it("should render Index page", () => {
    render(<Index />);

    expect(screen.getByText("DU Capstone")).toBeInTheDocument();
  });
});
