import styled from "@emotion/styled";

const StyledText = styled.text`
  ${({ fontFamily }) => `font-family: "${fontFamily}";`}
  ${({ lineHeight }) => `line-height: ${lineHeight};`}
`;

const Text = ({ children, fontFamily = "IBM Plex Sans", ...props }) => {
  return (
    <StyledText fontFamily={fontFamily} {...props}>
      {children}
    </StyledText>
  );
};

export default Text;
