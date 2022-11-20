import React, { useRef } from "react";
import { render, screen, userEvent } from "../../../test-utils";
import TextArea from "../../../components/TextArea/TextArea";

describe("Text Area", () => {
  const RefComponent = (props) => {
    const ref = useRef();
    return <TextArea ref={ref} {...props} />;
  };
  it("should render text area component", () => {
    render(<RefComponent labelText="description" />);
    expect(screen.getByText("description")).toBeInTheDocument();
    expect(
      screen.getByRole("textbox", { name: "description" })
    ).toBeInTheDocument();
  });
  it("should show values as typed by user", () => {
    render(<RefComponent labelText="description" />);

    userEvent.type(
      screen.getByRole("textbox", { name: "description" }),
      "The #2 pop song of the year 1982"
    );
    expect(screen.getByRole("textbox", { name: "description" })).toHaveValue(
      "The #2 pop song of the year 1982"
    );
  });
});
