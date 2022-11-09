import React from "react";
import Link from "../Link/Link";
import Flex from "../Flex/Flex";
import Text from "../Text/Text";
import { color, fontWeight, spacing } from "../../theme";

const Breadcrumbs = ({ path = [], currentPage }) => {
  return (
    <Flex gap={spacing["0.5"]}>
      {path.map((pathProps, index) =>
        [
          <Text key={pathProps.id}>
            <Link
              href={pathProps.href}
              color={color.black}
              textDecoration="none"
            >
              {pathProps.page}
            </Link>
          </Text>,
          <Text key={`div-${index}`}>/</Text>,
        ].flatMap((element) => element)
      )}
      <Text fontWeight={fontWeight.bold}>{currentPage}</Text>
    </Flex>
  );
};

export default Breadcrumbs;
