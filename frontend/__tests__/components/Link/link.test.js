import React from "react";
import { render, screen, renderer } from "../../../test-utils";
import Link from "../../../components/Link/Link";

describe("Link", () => {
  it("should render link component", () => {
    render(<Link>legend of zelda</Link>);
    expect(screen.getByText("legend of zelda")).toBeInTheDocument();
  });
  it("should render link component styles", () => {
    const component = renderer.create(<Link>legend of zelda</Link>);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
