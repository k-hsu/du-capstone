import React from "react";
import { render, screen } from "../../../test-utils";
import Flex from "../../../components/Flex/Flex";

describe("Flex", () => {
  it("should render flex component", () => {
    render(<Flex>big flex</Flex>);
    expect(screen.getByText("big flex")).toBeInTheDocument();
    expect(screen.getByText("big flex")).toHaveStyle(`
      display: flex;
      flex-direction: row;
    `);
  });
});
