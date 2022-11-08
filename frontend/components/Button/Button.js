import React from "react";
import styled from "@emotion/styled";
import { color, spacing } from "../../theme";

const StyledButton = styled.button`
  background-color: ${color.white};
  border: 1px solid ${color.black};
  border-radius: ${spacing["0.25"]};
  padding: ${spacing["0.75"]} ${spacing["1.25"]};
  cursor: pointer;
`;

const Button = ({ children, ...props }) => {
  return <StyledButton {...props}>{children}</StyledButton>;
};

export default Button;
