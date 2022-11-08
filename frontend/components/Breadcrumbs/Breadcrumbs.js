import React from "react";
import Link from "next/link";
import Flex from "../Flex/Flex";
import Text from "../Text/Text";
import { fontWeight, spacing } from "../../theme";

const Breadcrumbs = ({ path = [], currentPage }) => {
  return (
    <Flex gap={spacing["0.5"]}>
      {path.map((pathProps, index) =>
        [
          <Link id={pathProps.id} href={pathProps.href}>
            <Text cursor="pointer">{pathProps.page}</Text>
          </Link>,
          <Text id={`div-${index}`}>/</Text>,
        ].flatMap((element) => element)
      )}
      <Text fontWeight={fontWeight.bold}>{currentPage}</Text>
    </Flex>
  );
};

export default Breadcrumbs;
