import React from "react";
import { render, screen } from "../../../test-utils";
import Image from "../../../components/Image/Image";

describe("Image", () => {
  it("should render image component", () => {
    render(
      <Image
        src="/image-shiz.gif"
        alt="image shiz"
        height="69px"
        width="69px"
      />
    );
    expect(screen.getByAltText("image shiz")).toBeInTheDocument();
    expect(screen.getByAltText("image shiz")).toHaveAttribute("src");
  });
});
