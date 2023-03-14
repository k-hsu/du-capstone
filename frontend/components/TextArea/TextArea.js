import React, { forwardRef } from "react";
import styled from "@emotion/styled";
import Text from "../Text/Text";
import { color, fontWeight, spacing } from "../../theme";

const StyledFlex = styled.label`
  display: flex;
  flex-direction: column;
`;

const StyledTextArea = styled.textarea`
  border-radius: ${spacing["0.5"]};
  padding: ${spacing["0.5"]} ${spacing["0.75"]};
  font-family: "IBM Plex Sans", sans-serif;
`;

const TextArea = forwardRef(
  ({ id, labelText, errorMessage, ...props }, ref) => {
    return (
      <StyledFlex htmlFor={id}>
        <Text fontWeight={fontWeight.bold}>{labelText}</Text>
        <StyledTextArea id={id} ref={ref} {...props} />
        {errorMessage && <Text color={color.red}>{errorMessage}</Text>}
      </StyledFlex>
    );
  }
);
TextArea.displayName = "TextArea";

export default TextArea;
