import React, { useRef } from "react";
import { render, screen, renderer } from "../../../test-utils";
import TextArea from "../../../components/TextArea/TextArea";

describe("Text Area", () => {
  const RefComponent = (props) => {
    const ref = useRef();
    return <TextArea ref={ref} {...props} />;
  };
  it("should render text area component", () => {
    render(<RefComponent labelText="prompt" />);
    expect(screen.getByText("prompt")).toBeInTheDocument();
  });
  it("should render text area component styles", () => {
    const component = renderer.create(<RefComponent labelText="prompt" />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
