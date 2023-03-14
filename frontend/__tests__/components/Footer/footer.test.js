import React from "react";
import { render, screen } from "../../../test-utils";
import Footer from "../../../components/Footer/Footer";

describe("Footer", () => {
  it("should render footer component", () => {
    render(<Footer />);
    expect(screen.getByText(/Hello World/)).toBeInTheDocument();
  });
});
