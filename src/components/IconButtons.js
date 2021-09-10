import React from "react"
import styled from "styled-components"
import {
  secondaryColor,
  primaryTextColor,
  interactionColor,
  secondaryTextColor,
} from "styles/colors"
import {
  CaretDownOutlined,
  CaretUpOutlined,
  SearchOutlined,
  MoreOutlined,
  MenuOutlined,
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
  width: 30px;
  height: 30px;
  &:hover {
    svg {
      fill: ${secondaryColor};
    }
  }
`

const LargeButtonContainer = styled(SmallButtonContainer)`
  width: 36px;
  height: 36px;
  &:hover {
    svg {
      fill: ${secondaryColor};
    }
  }
`

const MediumCircularButtonContainer = styled.button`
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
export const DropdownIconButton = ({ className, isOpen = false, onClick }) => {
  return (
    <SmallButtonContainer
      className={className}
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

// 36*36 size
export const SearchIconButton = ({ className, onClick }) => {
  return (
    <LargeButtonContainer
      className={className}
      onClick={() => {
        if (typeof onClick === "function") {
          onClick()
        }
      }}
    >
      <SearchOutlined style={{ fontSize: "20px" }} />
    </LargeButtonContainer>
  )
}

// 25*25 size
export const MoreVertIconButton = ({ className, onClick }) => {
  return (
    <MediumCircularButtonContainer
      className={className}
      onClick={() => {
        if (typeof onClick === "function") {
          onClick()
        }
      }}
      color={secondaryTextColor}
    >
      <MoreOutlined />
    </MediumCircularButtonContainer>
  )
}

// 30*30 size
export const MenuIconButton = ({ className, onClick }) => {
  return (
    <MediumButtonContainer
      className={className}
      color="#fff"
      onClick={() => {
        if (typeof onClick === "function") {
          onClick()
        }
      }}
    >
      <MenuOutlined style={{ fontSize: "24px" }} />
    </MediumButtonContainer>
  )
}
