import React from "react"
import styled from "styled-components"
import { secondaryColor, primaryTextColor } from "src/styles/colors"
import {
  ArrowDropDown,
  ArrowDropUp,
  Visibility,
  VisibilityOff,
  GitHub,
  Search,
} from "@material-ui/icons"

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

// 24*24 size
export const DropdownIconButton = ({ isOpen = false, onClick, ref }) => {
  return (
    <SmallButtonContainer
      ref={ref}
      onClick={() => {
        if (typeof onClick === "function") {
          onClick()
        }
      }}
    >
      {isOpen ? <ArrowDropUp /> : <ArrowDropDown />}
    </SmallButtonContainer>
  )
}

export const GitHubIconButton = ({ onClick }) => {
  return (
    <SmallButtonContainer
      color="#fff"
      onClick={() => {
        if (typeof onClick === "function") {
          onClick()
        }
      }}
    >
      <GitHub />
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
      <Search />
    </MediumButtonContainer>
  )
}

export const VisibilityIconButton = ({ isVisible = false, onClick }) => {
  return (
    <MediumButtonContainer
      onClick={() => {
        if (typeof onClick === "function") {
          onClick()
        }
      }}
    >
      {isVisible ? <VisibilityOff /> : <Visibility />}
    </MediumButtonContainer>
  )
}
