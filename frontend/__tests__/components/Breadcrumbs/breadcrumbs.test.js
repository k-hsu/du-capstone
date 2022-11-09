import React from "react";
import { render, screen, renderer } from "../../../test-utils";
import Breadcrumbs from "../../../components/Breadcrumbs/Breadcrumbs";

describe("Breadcrumbs", () => {
  it("should render breadcrumbs component", () => {
    render(
      <Breadcrumbs
        path={[{ id: "crumb-path", page: "crumb", href: "/to-the-crumb" }]}
        currentPage="bread"
      />
    );
    expect(screen.getByText("bread")).toBeInTheDocument();
    expect(screen.getByText("crumb")).toBeInTheDocument();
    expect(screen.getByText("crumb")).toHaveAttribute("href", "/to-the-crumb");
  });
  it("should render breadcrumbs component styles", () => {
    const component = renderer.create(
      <Breadcrumbs
        path={[{ id: "crumb-path", page: "crumb", href: "/to-the-crumb" }]}
        currentPage="bread"
      />
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
