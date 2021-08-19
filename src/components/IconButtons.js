import React from "react"
import styled from "styled-components"
import {
  secondaryColor,
  primaryTextColor,
  whiteColor,
  interactionColor,
  secondaryTextColor,
} from "styles/colors"
import {
  CaretDownOutlined,
  CaretUpOutlined,
  GithubOutlined,
  SearchOutlined,
  MoreOutlined,
} from "@ant-design/icons"

const SmallButtonContainer = styled.button`
  display: flex;
  width: 24px;
  height: 24px;
  box-sizing: border-box;
  background: none;
  border: none;
  justify-content: center;
  align-items: center;
  svg {
    fill: ${(props) => (props.color ? props.color : `${primaryTextColor}`)};
  }
`

const MediumButtonContainer = styled(SmallButtonContainer)`
  width: 36px;
  height: 36px;
  &:hover {
    svg {
      fill: ${secondaryColor};
    }
  }
`

const MediumCircularButtonContainer = styled.div`
  display: flex;
  width: 25px;
  height: 25px;
  box-sizing: border-box;
  background: none;
  border: 1.5px solid ${secondaryTextColor};
  justify-content: center;
  align-items: center;
  border-radius: 14px;
  svg {
    fill: ${(props) => (props.color ? props.color : `${primaryTextColor}`)};
  }
  &:hover {
    background: ${interactionColor};
  }
`

// 24*24 size
export const DropdownIconButton = ({ isOpen = false, onClick }) => {
  return (
    <SmallButtonContainer
      onClick={() => {
        if (typeof onClick === "function") {
          onClick()
        }
      }}
    >
      {isOpen ? <CaretUpOutlined /> : <CaretDownOutlined />}
    </SmallButtonContainer>
  )
}

export const GitHubIconButton = ({ onClick }) => {
  return (
    <SmallButtonContainer
      color={whiteColor}
      onClick={() => {
        if (typeof onClick === "function") {
          onClick()
        }
      }}
    >
      <GithubOutlined />
    </SmallButtonContainer>
  )
}

// 36*36 size
export const SearchIconButton = ({ onClick }) => {
  return (
    <MediumButtonContainer
      onClick={() => {
        if (typeof onClick === "function") {
          onClick()
        }
      }}
    >
      <SearchOutlined style={{ fontSize: "20px" }} />
    </MediumButtonContainer>
  )
}

export const MoreVertIconButton = ({ onClick, className }) => {
  return (
    <MediumCircularButtonContainer
      onClick={() => {
        if (typeof onClick === "function") {
          onClick()
        }
      }}
      color={secondaryTextColor}
      className={className}
    >
      <MoreOutlined />
    </MediumCircularButtonContainer>
  )
}
