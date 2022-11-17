import React from "react";
import { render, screen } from "../../../test-utils";
import Form from "../../../components/Form/Form";

describe("Form", () => {
  it("should render form component", () => {
    render(<Form>feedback</Form>);
    expect(screen.getByText("feedback")).toBeInTheDocument();
  });
});
