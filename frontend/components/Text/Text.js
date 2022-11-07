import React from "react";
import styled from "@emotion/styled";

const StyledText = styled.text`
  ${({ fontFamily }) => `font-family: "${fontFamily}";`}
  ${({ lineHeight }) => (lineHeight ? `line-height: ${lineHeight};` : "")}
  ${({ fontWeight }) => (fontWeight ? `font-weight: ${fontWeight};` : "")}
`;

const Text = ({ children, fontFamily = "IBM Plex Sans", ...props }) => {
  return (
    <StyledText fontFamily={fontFamily} {...props}>
      {children}
    </StyledText>
  );
};

export default Text;
