import React from "react";
import styled from "@emotion/styled";

const StyledGrid = styled.div`
  display: grid;
  ${({ gap }) => (gap ? `gap: ${gap};` : "")}
  ${({ p }) => (p ? `padding: ${p};` : "")}
  ${({ m }) => (m ? `margin: ${m};` : "")}
  ${({ width }) => (width ? `width: ${width};` : "")}
  ${({ height }) => (height ? `height: ${height};` : "")}
  ${({ gridTemplateColumns }) =>
    gridTemplateColumns ? `grid-template-columns: ${gridTemplateColumns};` : ""}
`;

const Grid = ({ children, ...props }) => {
  return <StyledGrid {...props}>{children}</StyledGrid>;
};

export default Grid;
