import React from "react";
import { render, screen } from "../../../test-utils";
import EmptyState from "../../../components/EmptyState/EmptyState";

describe("EmptyState", () => {
  it("should render empty state component of type other if there is no error and the component is not loading", () => {
    render(<EmptyState empty>There is something here</EmptyState>);
    expect(screen.getByText("There is nothing here")).toBeInTheDocument();
  });
  it("should render empty state component of type loading if the component is loading", () => {
    render(<EmptyState loading>There is something here</EmptyState>);
    expect(screen.getByText("loading...")).toBeInTheDocument();
  });
  it("should render empty state component of type error if there is an error", () => {
    render(<EmptyState error>There is something here</EmptyState>);
    expect(screen.getByText("An error has occured")).toBeInTheDocument();
  });
  it("should render children if there is no error if there is no error and the component is not loading", () => {
    render(<EmptyState>There is something here</EmptyState>);
    expect(screen.getByText("There is something here")).toBeInTheDocument();
  });
});
