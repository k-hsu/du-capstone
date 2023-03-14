import React from "react";
import styled from "@emotion/styled";
import { spacing } from "../../theme";

const StyledSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1 0 auto;
  padding: ${spacing["2.5"]} ${spacing["4"]};
  background: #dfdfdf;
  margin: 0;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 0;
  gap: ${spacing["1"]};
`;

const Section = ({ children }) => {
  return (
    <StyledSection>
      <Container>{children}</Container>
    </StyledSection>
  );
};

export default Section;
