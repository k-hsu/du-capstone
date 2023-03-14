import React from "react";
import Flex from "../Flex/Flex";
import Text from "../Text/Text";
import { spacing } from "../../theme";

const Footer = (props) => {
  return (
    <Flex
      backgroundColor="black"
      justifyContent="center"
      p={`${spacing["0.75"]} ${spacing["4"]}`}
      {...props}
    >
      <Text color="white">
        &copy;2022 OmniFederal &middot; All Rights Reserved &middot; Hello World
      </Text>
    </Flex>
  );
};

export default Footer;
