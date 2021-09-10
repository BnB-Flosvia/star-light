import React from "react"
import styled from "styled-components"
import { Link } from "react-router-dom"
import {
  darkPrimaryColor,
  dividerColor,
  interactionColor,
  primaryTextColor,
} from "styles/colors"
import { body2Normal, body3Normal } from "styles/textTheme"
import menus from "constants/menus"

const Container = styled.div`
  display: flex;
  flex-flow: column;
  width: 100%;
  background: ${darkPrimaryColor};
  .item {
    ${(props) => (props.isSmall ? body3Normal : body2Normal)}
    color: ${dividerColor};
    height: ${(props) => (props.height ? props.height : 0)};
  }
`

const MenuLinkText = styled(Link)`
  cursor: pointer;
  display: flex;
  text-decoration: none;
  justify-content: center;
  align-items: center;
  width: 100%;
  background: ${darkPrimaryColor};
  &:hover {
    background: ${interactionColor};
    color: ${primaryTextColor};
    font-weight: bold;
  }
  -webkit-transition: height 0.3s;
  transition: height 0.3s;
  -webkit-transition-timing-function: ease;
  transition-timing-function: ease;
`

// 모바일 뷰 혹은 타블렛 뷰 일 때 좌측 메뉴 버튼으로 표시되는 하단 네비게이션
export default function BottomNavigationBox({
  isLoggedIn,
  isBottomMenuOpened,
  isSmallView,
}) {
  // 메뉴를 열어야 하는 상태일 때, height 상태 값에 변화를 줌
  // height의 변화를 감지하고 transition 효과로 box를 표시
  let height = 0
  if (isBottomMenuOpened) {
    height = "55px"
    if (isSmallView) {
      height = "45px"
    }
  }

  return (
    <Container isSmall={isSmallView} height={height}>
      {menus.map((menu) => {
        return (
          <MenuLinkText className="item" to={menu.path}>
            {menu.name}
          </MenuLinkText>
        )
      })}
      {!isLoggedIn && (
        <MenuLinkText className="item" to="/signin">
          로그인
        </MenuLinkText>
      )}
    </Container>
  )
}
