import React from "react";
import { render, screen } from "../../../test-utils";
import EmptyState from "../../../components/EmptyState/EmptyState";

describe("EmptyState", () => {
  it("should render empty state component of type other", () => {
    render(<EmptyState />);
    expect(screen.getByText("There is nothing here")).toBeInTheDocument();
  });
  it("should render empty state component of type loading", () => {
    render(<EmptyState loading />);
    expect(screen.getByText("loading...")).toBeInTheDocument();
  });
  it("should render empty state component of type error", () => {
    render(<EmptyState error />);
    expect(screen.getByText("An error has occured")).toBeInTheDocument();
  });
});
