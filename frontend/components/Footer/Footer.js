import React from "react";
import Flex from "../Flex/Flex";
import Text from "../Text/Text";
import { spacing } from "../../theme";

const Footer = (props) => {
  return (
    <Flex p={`${spacing["0.75"]} ${spacing["4"]}`} {...props}>
      <Text>Hello World</Text>
    </Flex>
  );
};

export default Footer;
