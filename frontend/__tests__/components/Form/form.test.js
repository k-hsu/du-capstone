import React from "react";
import { render, screen, renderer } from "../../../test-utils";
import Form from "../../../components/Form/Form";

describe("Form", () => {
  it("should render form component", () => {
    render(<Form>feedback</Form>);
    expect(screen.getByText("feedback")).toBeInTheDocument();
  });
  it("should render form component styles", () => {
    const component = renderer.create(<Form>feedback</Form>);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
