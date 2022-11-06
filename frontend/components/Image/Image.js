import React from "react";
import Image from "next/image";

const BaseImage = ({ src, alt, width, height, ...props }) => {
  return <Image src={src} alt={alt} width={width} height={height} {...props} />;
};

export default BaseImage;
