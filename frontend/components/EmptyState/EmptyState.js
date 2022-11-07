import React from "react";
import Flex from "../Flex/Flex";
import Text from "../Text/Text";

const EmptyStateElement = ({ type = "loading" }) => {
  return (
    <Flex width="100%" justifyContent="center">
      <Text>{type === "loading" ? "loading..." : "An error has occured"}</Text>
    </Flex>
  );
};

const EmptyState = ({ loading }) => {
  return loading ? (
    <EmptyStateElement type="loading" />
  ) : (
    <EmptyStateElement type="error" />
  );
};

export default EmptyState;
