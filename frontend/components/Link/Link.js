import React from "react";
import Text from "../Text/Text";
import { useRouter } from "next/router";

const Link = ({ children, href, ...props }) => {
  const router = useRouter();

  const onLinkClick = () => {
    router.push(href);
  };
  return (
    <Text as="a" onClick={onLinkClick} cursor="pointer" {...props}>
      {children}
    </Text>
  );
};

export default Link;
