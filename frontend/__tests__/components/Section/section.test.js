import React from "react";
import { render, screen } from "../../../test-utils";
import Section from "../../../components/Section/Section";

describe("Section", () => {
  it("should render section component", () => {
    render(<Section>part me</Section>);
    expect(screen.getByText("part me")).toBeInTheDocument();
  });
});
