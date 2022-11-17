import React from "react";
import { render, screen } from "../../../test-utils";
import Grid from "../../../components/Grid/Grid";

describe("Grid", () => {
  it("should render grid component", () => {
    render(<Grid>transformer</Grid>);
    expect(screen.getByText("transformer")).toBeInTheDocument();
  });
});
