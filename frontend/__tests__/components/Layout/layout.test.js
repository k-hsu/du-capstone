import React from "react";
import { render, screen, renderer } from "../../../test-utils";
import Layout from "../../../components/Layout/Layout";

describe("Layout", () => {
  it("should render layout component", () => {
    render(<Layout>children</Layout>);
    expect(screen.getByText("children")).toBeInTheDocument();
  });
  it("should render layout component styles", () => {
    const component = renderer.create(<Layout>children</Layout>);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
