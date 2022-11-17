import React from "react";
import { render, screen } from "../../../test-utils";
import Header from "../../../components/Header/Header";

describe("Header", () => {
  it("should render header component", () => {
    render(<Header />);
    expect(screen.getByAltText("capstone-logo")).toBeInTheDocument();
    expect(screen.getByText("Kobi's Capstone Project")).toBeInTheDocument();
  });
});
