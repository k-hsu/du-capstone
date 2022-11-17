import React from "react";
import { render, screen } from "../../../test-utils";
import Layout from "../../../components/Layout/Layout";

describe("Layout", () => {
  it("should render layout component", () => {
    render(<Layout>children</Layout>);
    expect(screen.getByText("children")).toBeInTheDocument();
  });
});
