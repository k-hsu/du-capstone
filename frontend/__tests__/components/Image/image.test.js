import React from "react";
import { render, screen } from "../../../test-utils";
import Image from "../../../components/Image/Image";

jest.mock("next/image", () => {
  return ({ src, alt, height, width }) => (
    <img src={src} alt={alt} height={height} width={width} />
  );
});

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
    expect(screen.getByAltText("image shiz")).toHaveAttribute(
      "src",
      "/image-shiz.gif"
    );
    expect(screen.getByAltText("image shiz")).toHaveAttribute(
      "alt",
      "image shiz"
    );
    expect(screen.getByAltText("image shiz")).toHaveAttribute("height", "69px");
    expect(screen.getByAltText("image shiz")).toHaveAttribute("width", "69px");
  });
});
