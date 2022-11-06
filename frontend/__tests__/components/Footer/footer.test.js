import React from "react";
import { render, screen, renderer } from "../../../test-utils";
import Footer from "../../../components/Footer/Footer";

describe("Footer", () => {
  it("should render footer component", () => {
    render(<Footer />);
    expect(screen.getByText("Hello World")).toBeInTheDocument();
  });

  it("should render footer component styling", () => {
    const component = renderer.create(<Footer />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
