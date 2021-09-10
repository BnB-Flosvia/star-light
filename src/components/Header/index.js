import React, { useState } from "react"
import styled from "styled-components"
import { withRouter } from "react-router-dom"
import { checkLocalToken } from "utils/authProvider"
import useViewMode from "utils/hooks/useViewMode"
import { darkBackgroundColor } from "styles/colors"
import { MenuIconButton } from "components/IconButtons"
import LogoText from "components/LogoText"
import UserMenuPopover from "./UserMenuPopover"
import RowNavigation from "./RowNavigation"
import BottomNavigationBox from "./BottomNavigationBox"

const Container = styled.header`
  display: flex;
  width: 100%;
  height: 80px;
  flex: 0 0 80px;
  align-items: center;
  position: sticky;
  z-index: 100;
  padding: ${(props) =>
    props.isSmall ? "0 24px" : props.isMedium ? "0 40px" : "0 56px 0 80px"};
  margin: 0;
  background: ${darkBackgroundColor};
`

// Using only desktop mode
const RowMenuWrapper = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: flex-end;
  .userMenu {
    margin-left: 50px;
  }
`

// Using small view (mobile, tablet)
const MenuIconButtonWrapper = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: flex-start;
`

function Header({ history }) {
  const isLoggedIn = checkLocalToken()
  const [isSmallView, isMediumView, isLargeView] = useViewMode(420)
  // Small View 혹은 Medium View 일 때 사용됨
  const [isBottomMenuOpened, setIsBottomMenuOpend] = useState(false)

  return (
    <>
      <Container isSmall={isSmallView} isMedium={isMediumView}>
        {!isLargeView && (
          <MenuIconButtonWrapper>
            <MenuIconButton onClick={() => setIsBottomMenuOpend((value) => !value)} />
          </MenuIconButtonWrapper>
        )}
        <LogoText isSmall />
        <RowMenuWrapper>
          {isLargeView && <RowNavigation isLoggedIn={isLoggedIn} />}
          {isLoggedIn && <UserMenuPopover isSmallView={isSmallView} history={history} />}
        </RowMenuWrapper>
      </Container>
      {!isLargeView && (
        <BottomNavigationBox
          isSmallView={isSmallView}
          isLoggedIn={isLoggedIn}
          isBottomMenuOpened={isBottomMenuOpened}
        />
      )}
    </>
  )
}

export default withRouter(Header)
