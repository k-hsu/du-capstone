import React from "react";
import { render, screen } from "../../../test-utils";
import Text from "../../../components/Text/Text";

describe("Text", () => {
  it("should render text component", () => {
    render(<Text>text mex</Text>);
    expect(screen.getByText("text mex")).toBeInTheDocument();
    expect(screen.getByText("text mex")).toHaveStyle(
      `font-family: "IBM Plex Sans"`
    );
  });

  it("should render flex component with styles", () => {
    render(<Text lineHeight="1px">text mex</Text>);
    expect(screen.getByText("text mex")).toBeInTheDocument();
    expect(screen.getByText("text mex")).toHaveStyle(
      `font-family: "IBM Plex Sans"; line-height: 1px;`
    );
  });
});
