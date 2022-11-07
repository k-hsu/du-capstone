import React from "react";
import { render, screen, renderer } from "../../../test-utils";
import Button from "../../../components/Button/Button";

describe("Button", () => {
  it("should render button component", () => {
    render(<Button>big red button</Button>);
    expect(screen.getByText("big red button")).toBeInTheDocument();
  });
  it("should render button component styles", () => {
    const component = renderer.create(<Button>big red button</Button>);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
