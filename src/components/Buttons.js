import React from "react"
import styled from "styled-components"
import { CaretDownOutlined, UserOutlined } from "@ant-design/icons"
import {
  body1Bold,
  body2Bold,
  body3Bold,
  body2Normal,
  body3Normal,
} from "styles/textTheme"
import {
  borderColor,
  primaryColor,
  primaryTextColor,
  interactionColor,
  darkPrimaryColor,
  dividerColor,
  darkBackgroundColor,
  disableColor,
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
  color: white;
`

const UserSettingButtonContainer = styled.button`
  display: flex;
  align-items: center;
  background: transparent;
  border: none;
  .iconBox {
    display: flex;
    width: 24px;
    height: 24px;
    align-items: center;
    justify-content: center;
  }
  &:hover {
    background: transparent;
    border: none;
  }
  &:hover .iconBox svg {
    fill: ${disableColor};
  }
  padding: 0;
`

const CircleButtonContainer = styled.div`
  display: flex;
  width: 30px;
  height: 30px;
  box-sizing: border-box;
  border: none;
  border-radius: 15px;
  justify-content: center;
  align-items: center;
  background: ${borderColor};
  svg {
    fill: white;
  }
`

export const FullWidthButton = styled(Button)`
  height: ${(props) => (props.size === "small" ? "40px" : "48px")};
  ${(props) => props.size === "small" && body2Bold};
  color: white;
`

export const SmallButton = styled(Button)`
  width: 120px;
  height: 40px;
  background: ${darkPrimaryColor};
  ${body3Bold}
  color: white;
`

export const RoundedLinkButton = styled(Link)`
  display: flex;
  padding: 12px 16px;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  border-radius: 60px;
  background: ${darkBackgroundColor};
  ${(props) => (props.isSmall ? body3Normal : body2Normal)};
  font-style: normal;
  font-weight: 400;
  color: ${dividerColor};
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
  color: white;
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
    <UserSettingButtonContainer onClick={() => onClick()} ref={ref}>
      <CircleButtonContainer className="userMenuButton">
        <UserOutlined style={{ fontSize: "20px" }} />
      </CircleButtonContainer>
      <div className="iconBox">
        <CaretDownOutlined style={{ color: "#fff" }} />
      </div>
    </UserSettingButtonContainer>
  )
}
