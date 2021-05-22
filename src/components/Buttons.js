import React from "react"
import styled from "styled-components"
import { PersonOutline } from "@material-ui/icons"
import { body1Bold, body2Bold, body3Bold } from "styles/textTheme"
import {
  borderColor,
  disableColor,
  primaryColor,
  interactionColor,
  darkPrimaryColor,
} from "styles/colors"

const Button = styled.button`
  display: flex;
  width: 100%;
  height: 48px;
  border: none;
  box-sizing: border-box;
  border-radius: 4px;
  justify-content: center;
  align-items: center;
  background: ${primaryColor};
  &:hover {
    background: ${interactionColor};
    color: ${darkPrimaryColor};
  }
  ${body1Bold}
  color: #fff;
`

const CircleButtonContainer = styled.button`
  display: flex;
  width: 30px;
  height: 30px;
  box-sizing: border-box;
  border: none;
  border-radius: 15px;
  justify-content: center;
  align-items: center;
  background: ${borderColor};
  &:hover {
    background: ${disableColor};
  }
  svg {
    fill: #fff;
  }
`

export const FullWidthButton = styled(Button)`
  height: ${(props) => (props.size === "small" ? "40px" : "48px")};
  ${(props) => props.size === "small" && body2Bold};
  color: #fff;
`

export const SmallButton = styled(Button)`
  width: 120px;
  height: 40px;
  background: ${darkPrimaryColor};
  ${body3Bold}
  color: #fff;
`

export const UserSettingButton = ({ onClick, ref }) => {
  return (
    <CircleButtonContainer onClick={() => onClick()} ref={ref}>
      <PersonOutline />
    </CircleButtonContainer>
  )
}
