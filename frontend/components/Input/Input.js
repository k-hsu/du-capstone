import React, { forwardRef } from "react";
import styled from "@emotion/styled";
import Text from "../Text/Text";
import { color, fontWeight, spacing } from "../../theme";

const StyledFlex = styled.label`
  display: flex;
  flex-direction: column;
`;

const StyledInput = styled.input`
  border-radius: ${spacing["0.5"]};
  padding: ${spacing["0.5"]} ${spacing["0.75"]};
  font-family: "IBM Plex Sans", sans-serif;
`;

const Input = forwardRef(
  ({ id, labelText, errorMessage, autoFocus, ...props }, ref) => {
    return (
      <StyledFlex htmlFor={id}>
        <Text fontWeight={fontWeight.bold}>{labelText}</Text>
        <StyledInput id={id} ref={ref} autoFocus={autoFocus} {...props} />
        {errorMessage && <Text color={color.red}>{errorMessage}</Text>}
      </StyledFlex>
    );
  }
);
Input.displayName = "Input";

export default Input;
