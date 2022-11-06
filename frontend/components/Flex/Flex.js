import React from "react";
import styled from "@emotion/styled";

const StyledFlex = styled.div`
  display: flex;
  ${({ direction }) => `flex-direction: ${direction};`}
  ${({ gap }) => (gap ? `gap: ${gap};` : "")}
  ${({ p }) => (p ? `padding: ${p};` : "")}
  ${({ m }) => (m ? `margin: ${m};` : "")}
`;

const Flex = ({ children, direction = "row", ...props }) => {
  return (
    <StyledFlex direction={direction} {...props}>
      {children}
    </StyledFlex>
  );
};

export default Flex;
