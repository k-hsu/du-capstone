import React from "react";
import styled from "@emotion/styled";
import Link from "next/link";
import Text from "../Text/Text";
import { color, fontWeight, spacing } from "../../theme";

const StyledBook = styled.div`
  display: flex;
  flex-direction: column;
  width: 250px;
  padding: ${spacing["2.5"]} ${spacing["0.75"]};
  border: 1px solid ${color.white};
  cursor: pointer;
`;

const Book = ({ id, author: { firstName, lastName }, title }) => {
  return (
    <Link href={`/books/${id}`}>
      <StyledBook>
        <Text as="h2" lineHeight={0}>
          {title}
        </Text>
        <Text
          as="h2"
          lineHeight={0}
          fontWeight={fontWeight.normal}
          fontStyle="italic"
        >{`${firstName} ${lastName}`}</Text>
      </StyledBook>
    </Link>
  );
};

export default Book;
