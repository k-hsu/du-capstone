import React from "react";
import { render, screen, userEvent } from "../../../test-utils";
import Button from "../../../components/Button/Button";

describe("Button", () => {
  it("should render button component", () => {
    render(<Button>big red button</Button>);
    expect(screen.getByText("big red button")).toBeInTheDocument();
  });

  it("should call onClick when clicked", () => {
    const mockOnClick = jest.fn();
    render(<Button onClick={mockOnClick}>big red button</Button>);

    userEvent.click(screen.getByText("big red button"));
    expect(mockOnClick).toBeCalledTimes(1);
  });
});
