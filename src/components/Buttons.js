import React from "react"
import styled from "styled-components"
import { UserOutlined } from "@ant-design/icons"
import {
  body1Bold,
  body2Bold,
  body3Bold,
  body2Normal,
  body3Normal,
} from "styles/textTheme"
import {
  whiteColor,
  borderColor,
  disableColor,
  primaryColor,
  primaryTextColor,
  interactionColor,
  darkPrimaryColor,
} from "styles/colors"
import { Link } from "react-router-dom"

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
  color: ${whiteColor};
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
    fill: ${whiteColor};
  }
`

export const FullWidthButton = styled(Button)`
  height: ${(props) => (props.size === "small" ? "40px" : "48px")};
  ${(props) => props.size === "small" && body2Bold};
  color: ${whiteColor};
`

export const SmallButton = styled(Button)`
  width: 120px;
  height: 40px;
  background: ${darkPrimaryColor};
  ${body3Bold}
  color: ${whiteColor};
`

export const RoundedLinkButton = styled(Link)`
  display: flex;
  padding: 12px 24px;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  border-radius: 24px;
  background: ${darkPrimaryColor};
  ${(props) => (props.isSmall ? body3Normal : body2Normal)};
  color: ${whiteColor};
  &:hover {
    font-weight: bold;
    color: ${primaryTextColor};
    background: ${interactionColor};
  }
`

export const LineSmallButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 12px 30px;
  border: ${(props) =>
    props.color ? `1px solid ${props.color}` : `1px solid ${primaryTextColor}`};
  ${body2Normal}
  color: ${(props) => (props.color ? props.color : primaryTextColor)};
  border-radius: 24px;
  cursor: pointer;
`

export const DarkSmallButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 14px 18px;
  ${body3Normal}
  color: ${whiteColor};
  border-radius: 4px;
  background: ${darkPrimaryColor};
  border: none;
  &:hover {
    background: ${interactionColor};
    font-weight: bold;
  }
`

export const UserSettingButton = ({ onClick, ref }) => {
  return (
    <CircleButtonContainer onClick={() => onClick()} ref={ref}>
      <UserOutlined />
    </CircleButtonContainer>
  )
}
