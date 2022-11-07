import React from "react";
import { render, screen, renderer } from "../../../test-utils";
import EmptyState from "../../../components/EmptyState/EmptyState";

describe("EmptyState", () => {
  it("should render empty state component of type loading", () => {
    render(<EmptyState loading />);
    expect(screen.getByText("loading...")).toBeInTheDocument();
  });
  it("should render empty state component of type error", () => {
    render(<EmptyState />);
    expect(screen.getByText("An error has occured")).toBeInTheDocument();
  });
  it("should render empty state component styles of type loading", () => {
    const component = renderer.create(<EmptyState loading />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it("should render empty state component styles of type error", () => {
    const component = renderer.create(<EmptyState />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
