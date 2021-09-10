import React from "react"
import styled from "styled-components"
import { RoundedLinkButton } from "components/Buttons"
import menus from "constants/menus"

const Container = styled.div`
  display: flex;
  & > a:not(:last-child) {
    margin-right: 16px;
  }
`

// Desktop 뷰(isLargeView 일 때)에서 사용됩니다.
export default function RowNavigation({ isLoggedIn }) {
  return (
    <Container>
      {menus.map((menu) => {
        return <RoundedLinkButton to={menu.path}>{menu.name}</RoundedLinkButton>
      })}
      {!isLoggedIn && <RoundedLinkButton to="/signin">로그인</RoundedLinkButton>}
    </Container>
  )
}
