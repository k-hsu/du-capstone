import React from "react";
import { render, screen, renderer } from "../../../test-utils";
import Toast from "../../../components/Toast/Toast";

describe("Toast", () => {
  it("should render error toast component", () => {
    render(<Toast message="Good bye, toast" />);
    expect(screen.getByText("Error!")).toBeInTheDocument();
    expect(screen.getByText("Good bye, toast")).toBeInTheDocument();
  });

  it("should render success toast component", () => {
    render(<Toast type="success" message="Hello, toast" />);
    expect(screen.getByText("Success!")).toBeInTheDocument();
    expect(screen.getByText("Hello, toast")).toBeInTheDocument();
  });

  it("should render error toast component styling", () => {
    const component = renderer.create(<Toast message="Good bye, toast" />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("should render success toast component styling", () => {
    const component = renderer.create(
      <Toast type="success" message="Hello, toast" />
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
