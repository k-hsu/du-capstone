import React, { useLayoutEffect, useState } from "react";
import { createPortal } from "react-dom";
import styled from "@emotion/styled";
import Button from "../Button/Button";
import Flex from "../Flex/Flex";
import Text from "../Text/Text";
import { color, spacing } from "../../theme";

const StyledModalBackground = styled.div`
  position: fixed;
  inset: 0;
  background-color: ${color.black60};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledModal = styled.div`
  padding: ${spacing["2"]} ${spacing["2.25"]};
  background-color: ${color.white};
  min-width: 400px;
  border-radius: ${spacing["0.75"]};
`;

const Modal = ({
  title,
  children,
  onClose,
  onSubmit,
  cancelText = "Cancel",
  submitText = "Submit",
}) => {
  const [appRoot, setAppRoot] = useState(null);
  useLayoutEffect(() => {
    if (appRoot !== document?.getElementById("app-root")) {
      setAppRoot(document.getElementById("app-root"));
    }
  }, [appRoot]);
  return appRoot
    ? createPortal(
        <StyledModalBackground onClick={onClose}>
          <StyledModal onClick={(event) => event.stopPropagation()}>
            <Flex justifyContent="space-between" p={`0 0 ${spacing["2"]} 0`}>
              <Text fontWeight="bold">{title}</Text>
              <Text
                onClick={onClose}
                onKeyDown={onClose}
                cursor="pointer"
                tabIndex={0}
              >
                X
              </Text>
            </Flex>
            {children}
            <Flex
              justifyContent="flex-end"
              alignItems="center"
              gap={spacing["1.5"]}
              p={`${spacing["2"]} 0 0 0`}
            >
              <Text
                color={color.red}
                onClick={onClose}
                onKeyDown={onClose}
                lineHeight={0}
                cursor="pointer"
                tabIndex={0}
              >
                {cancelText}
              </Text>
              <Button onClick={onSubmit}>
                <Text>{submitText}</Text>
              </Button>
            </Flex>
          </StyledModal>
        </StyledModalBackground>,
        appRoot
      )
    : null;
};

export default Modal;
