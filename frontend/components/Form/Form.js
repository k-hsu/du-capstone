import React from "react";
import styled from "@emotion/styled";
import { spacing } from "../../theme";

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${spacing["1.25"]};
`;

const Form = (props) => <StyledForm {...props} />;

export default Form;
