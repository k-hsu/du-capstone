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

const EmptyState = ({ loading, error, empty, children }) => {
  if (loading) {
    return <EmptyStateElement type="loading" />;
  }
  if (error) {
    return <EmptyStateElement type="error" />;
  }
  return empty ? <EmptyStateElement type="other" /> : children;
};

export default EmptyState;
