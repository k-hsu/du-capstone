import React from "react";
import { render, screen, renderer } from "../../../test-utils";
import Text from "../../../components/Text/Text";

describe("Text", () => {
  it("should render text component", () => {
    render(<Text>text mex</Text>);
    expect(screen.getByText("text mex")).toBeInTheDocument();
    expect(screen.getByText("text mex")).toHaveStyle(
      `font-family: "IBM Plex Sans"`
    );
  });
  it("should render h1 component styles", () => {
    const component = renderer.create(<Text as="h1">text mex</Text>);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it("should render h2 component styles", () => {
    const component = renderer.create(<Text as="h2">text mex</Text>);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it("should render h3 component styles", () => {
    const component = renderer.create(<Text as="h3">text mex</Text>);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it("should render default text component styles", () => {
    const component = renderer.create(<Text>text mex</Text>);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
