import React from "react";
import { render, screen, setup } from "../../../test-utils";
import Button from "../../../components/Button/Button";

describe("Button", () => {
  it("should render button component", () => {
    render(<Button>big red button</Button>);
    expect(screen.getByText("big red button")).toBeInTheDocument();
  });

  it("should call onClick when clicked", async () => {
    const mockOnClick = jest.fn();
    const { user } = setup(
      <Button onClick={mockOnClick}>big red button</Button>
    );

    await user.click(screen.getByText("big red button"));
    expect(mockOnClick).toBeCalledTimes(1);
  });
});
