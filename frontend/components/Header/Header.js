import React from "react";
import Flex from "../Flex/Flex";
import Image from "../Image/Image";
import Link from "../Link/Link";
import Text from "../Text/Text";
import { spacing } from "../../theme";

const Header = (props) => {
  return (
    <Flex
      p={`${spacing["0.75"]} ${spacing["4"]}`}
      gap={spacing["0.75"]}
      {...props}
    >
      <Link href="/">
        <Flex alignItems="center" height="100%">
          <Image
            src="/DU-Logo-Mark.svg"
            alt="capstone-logo"
            width="64px"
            height="64px"
          />
        </Flex>
      </Link>
      <Text as="h1" lineHeight={spacing["1.5"]}>
        Kobi&apos;s Capstone Project
      </Text>
    </Flex>
  );
};

export default Header;
