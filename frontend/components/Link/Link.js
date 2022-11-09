import React from "react";
import Text from "../Text/Text";

const Link = ({ children, href, ...props }) => {
  return (
    <Text as="a" href={href} {...props}>
      {children}
    </Text>
  );
};

export default Link;
