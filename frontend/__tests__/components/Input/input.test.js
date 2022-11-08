import React, { useRef } from "react";
import { render, screen, renderer } from "../../../test-utils";
import Input from "../../../components/Input/Input";

describe("Input", () => {
  const RefComponent = (props) => {
    const ref = useRef();
    return <Input ref={ref} {...props} />;
  };
  it("should render input component", () => {
    render(<RefComponent labelText="prompt" />);
    expect(screen.getByText("prompt")).toBeInTheDocument();
  });
  it("should render input component styles", () => {
    const component = renderer.create(<RefComponent labelText="prompt" />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
