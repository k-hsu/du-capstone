import React from "react";
import Flex from "../Flex/Flex";
import Text from "../Text/Text";

const EmptyStateElement = ({ type = "loading" }) => {
  const message = {
    loading: "loading...",
    error: "An error has occured",
    other: "There is nothing here",
  };
  return (
    <Flex width="100%" justifyContent="center">
      <Text fontStyle={type === "other" ? "italic" : "none"}>
        {message[type]}
      </Text>
    </Flex>
  );
};

const EmptyState = ({ loading, error }) => {
  return loading ? (
    <EmptyStateElement type="loading" />
  ) : error ? (
    <EmptyStateElement type="error" />
  ) : (
    <EmptyStateElement type="other" />
  );
};

export default EmptyState;
