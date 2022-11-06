import React from "react";
import { render, screen, renderer } from "../../../test-utils";
import Section from "../../../components/Section/Section";

describe("Section", () => {
  it("should render section component", () => {
    render(<Section>part me</Section>);
    expect(screen.getByText("part me")).toBeInTheDocument();
  });
  it("should render section component styles", () => {
    const component = renderer.create(<Section>part me</Section>);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
