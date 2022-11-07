import React from "react";
import styled from "@emotion/styled";

const StyledFlex = styled.div`
  display: flex;
  ${({ direction }) => `flex-direction: ${direction};`}
  ${({ gap }) => (gap ? `gap: ${gap};` : "")}
  ${({ p }) => (p ? `padding: ${p};` : "")}
  ${({ m }) => (m ? `margin: ${m};` : "")}
  ${({ width }) => (width ? `width: ${width};` : "")}
  ${({ height }) => (height ? `height: ${height};` : "")}
  ${({ justifyContent }) =>
    justifyContent ? `justify-content: ${justifyContent};` : ""}
  ${({ alignItems }) => (alignItems ? `align-items: ${alignItems};` : "")}
  ${({ flexWrap }) => (flexWrap ? `flex-wrap: ${flexWrap};` : "")}
`;

const Flex = ({ children, direction = "row", ...props }) => {
  return (
    <StyledFlex direction={direction} {...props}>
      {children}
    </StyledFlex>
  );
};

export default Flex;
