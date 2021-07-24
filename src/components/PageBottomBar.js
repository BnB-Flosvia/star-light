import React from "react"
import styled from "styled-components"
import { LineSmallButton } from "components/Buttons"
import { errorColor, primaryColor, backgroundColor1 } from "styles/colors"

const BottomBar = styled.div`
  display: flex;
  width: 100%;
  position: fixed;
  z-index: 1000;
  bottom: 0;
  flex: 0 0 80px;
  height: 80px;
  background: ${backgroundColor1};
  align-items: center;
  justify-content: center;
`

const ButtonGroupWrapper = styled.div`
  display: flex;
  width: 720px;
  align-items: center;
  justify-content: flex-end;
  padding: 0 40px;
  & > button:first-child {
    margin-right: 24px;
  }
`

export default function PageBottomBar({
  onCancelClick,
  cancelText = "나가기",
  onSubmitClick,
  submitText = "확인",
  enableSubmitButton,
}) {
  return (
    <BottomBar>
      <ButtonGroupWrapper>
        <LineSmallButton onClick={onCancelClick} color={errorColor}>
          {cancelText}
        </LineSmallButton>
        <LineSmallButton
          onClick={onSubmitClick}
          color={primaryColor}
          disabled={!enableSubmitButton}
        >
          {submitText}
        </LineSmallButton>
      </ButtonGroupWrapper>
    </BottomBar>
  )
}
