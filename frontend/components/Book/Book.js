import React from "react";
import styled from "@emotion/styled";
import Text from "../Text/Text";
import { fontWeight, spacing } from "../../theme";

const StyledBook = styled.div`
  display: flex;
  flex-direction: column;
  width: 200px;
  padding: ${spacing["2.5"]} ${spacing["0.75"]};
  border: 1px solid white;
`;

const Book = ({ author: { firstName, lastName }, title }) => {
  return (
    <StyledBook>
      <Text fontWeight={fontWeight.bold}>{title}</Text>
      <Text fontStyle="italic">{`${firstName} ${lastName}`}</Text>
    </StyledBook>
  );
};

export default Book;
