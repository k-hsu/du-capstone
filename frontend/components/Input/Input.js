import React, { forwardRef } from "react";
import styled from "@emotion/styled";
import Text from "../Text/Text";
import { color, fontWeight, spacing } from "../../theme";

const StyledLabel = styled.label`
  display: flex;
  flex-direction: column;
`;

const StyledInput = styled.input`
  border-radius: ${spacing["0.5"]};
  padding: ${spacing["0.5"]} ${spacing["0.75"]};
`;

const Input = forwardRef(({ id, labelText, errorMessage, ...props }, ref) => {
  return (
    <StyledLabel htmlFor={id}>
      <Text fontWeight={fontWeight.bold}>{labelText}</Text>
      <StyledInput id={id} ref={ref} {...props} />
      {errorMessage && <Text color={color.red}>{errorMessage}</Text>}
    </StyledLabel>
  );
});
Input.displayName = "Input";

export default Input;
