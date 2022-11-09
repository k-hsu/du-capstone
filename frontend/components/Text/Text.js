import React from "react";
import styled from "@emotion/styled";
import { typography } from "../../theme";

const StyledText = styled.text`
  ${({ fontFamily }) => `font-family: "${fontFamily}";`}
  ${({ as, lineHeight }) =>
    as || lineHeight
      ? `line-height: ${lineHeight ?? typography[as].lineHeight};`
      : ""}
  ${({ as, fontWeight }) =>
    as || fontWeight
      ? `font-weight: ${fontWeight ?? typography[as].fontWeight};`
      : ""}
  ${({ as, fontSize }) =>
    as || fontSize ? `font-size: ${fontSize ?? typography[as].fontSize};` : ""}
  ${({ fontStyle }) => (fontStyle ? `font-style: ${fontStyle};` : "")}
  ${({ color }) => (color ? `color: ${color};` : "")}
  ${({ textDecoration }) =>
    textDecoration ? `text-decoration: ${textDecoration};` : ""}
  ${({ cursor }) => (cursor ? `cursor: ${cursor};` : "")}
`;

const Text = ({
  children,
  as = "p",
  fontFamily = "IBM Plex Sans",
  ...props
}) => {
  return (
    <StyledText as={as} fontFamily={fontFamily} {...props}>
      {children}
    </StyledText>
  );
};

export default Text;
