import React from "react"
import styled from "styled-components"
import {
  highlightTextColor,
  primaryTextColor,
  backgroundColor1,
  disableColor,
} from "styles/colors"
import { body1Normal, body2Normal } from "styles/textTheme"
import { menus } from "constants/menus"
import { useMediaQuery } from "react-responsive"
import { Link, useLocation } from "react-router-dom"
import PerfectScrollBar from "react-perfect-scrollbar"

const Container = styled.div`
  display: flex;
  width: 100%;
  height: ${(props) => (props.isSmall ? "45px" : "60px")};
  align-items: center;
  justify-content: center;
  overflow: hidden;
  padding: 0 8px;
  background: ${backgroundColor1};
  border-top: 0.5px solid ${disableColor};
  border-bottom: 0.5px solid ${disableColor};
  top: 0;
  z-index: 2;
  position: ${(props) => (props.isFixed ? "fixed" : "static")};
`

const MenuWrapper = styled.div`
  display: flex;
  width: fit-content;
  height: 100%;
  align-items: center;
  overflow-y: hidden;
`

const MenuItem = styled(Link)`
  text-decoration: none;
  white-space: nowrap;
  padding: ${(props) => (props.isSmall ? "0 16px" : "0 25px")};
  ${(props) => (props.isSmall ? body2Normal : body1Normal)};
  color: ${(props) => (props.isSelected ? highlightTextColor : primaryTextColor)};
  font-weight: ${(props) => (props.isSelected ? "bold" : "w500")};
  &:hover {
    color: ${highlightTextColor};
    font-weight: bold;
    cursor: pointer;
  }
`

export default function NavigationBar({ isFixed }) {
  const isSmallMode = useMediaQuery({
    query: "(max-width: 768px)",
  })
  const location = useLocation()

  return (
    <Container isSmall={isSmallMode} isFixed={isFixed}>
      <PerfectScrollBar>
        <MenuWrapper>
          {menus.map((menu) => {
            const { name, path } = menu
            return (
              <MenuItem
                to={path}
                isSmall={isSmallMode}
                isSelected={location?.pathname === path}
              >
                {name}
              </MenuItem>
            )
          })}
        </MenuWrapper>
      </PerfectScrollBar>
    </Container>
  )
}
