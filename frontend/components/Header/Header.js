import React from "react";
import Flex from "../Flex/Flex";
import Image from "../Image/Image";
import Text from "../Text/Text";
import { spacing } from "../../theme";

const Header = ({ height = spacing["2.5"], ...props }) => {
  return (
    <Flex
      p={`${spacing["0.5"]} ${spacing["4"]}`}
      gap={spacing["0.75"]}
      {...props}
    >
      <Image
        src="/DU-Logo-Mark.svg"
        alt="capstone-logo"
        width={height}
        height={height}
      />
      <Text as="h1" lineHeight={height}>
        Kobi&apos;s Capstone Project
      </Text>
    </Flex>
  );
};

export default Header;
