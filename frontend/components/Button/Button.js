import React from "react";
import styled from "@emotion/styled";
import { spacing } from "../../theme";

const StyledButton = styled.button`
  background-color: white;
  border: 1px solid black;
  border-radius: ${spacing["0.25"]};
  padding: ${spacing["0.25"]} ${spacing["0.5"]};
`;

const Button = ({ children, ...props }) => {
  return <StyledButton {...props}>{children}</StyledButton>;
};

export default Button;
