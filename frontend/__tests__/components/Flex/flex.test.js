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

  it("should render flex component with props", () => {
    render(
      <Flex
        direction="column"
        gap="5px"
        p="4px"
        m="3px"
        width="2px"
        height="1px"
        justifyContent="flex-end"
        alignItems="center"
        flexWrap="wrap"
        backgroundColor="black"
        cursor="pointer"
      >
        big flex
      </Flex>
    );
    expect(screen.getByText("big flex")).toBeInTheDocument();
    expect(screen.getByText("big flex")).toHaveStyle(`
      display: flex;
      flex-direction: column;
      gap: 5px;
      padding: 4px;
      margin: 3px;
      width: 2px;
      height: 1px;
      justify-content: flex-end;
      align-items: center;
      flex-wrap: wrap;
      background-color: black;
      cursor: pointer;
    `);
  });
});
