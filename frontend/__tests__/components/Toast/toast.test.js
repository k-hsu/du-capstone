import React from "react";
import { render, screen } from "../../../test-utils";
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
});
