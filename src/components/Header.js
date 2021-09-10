import React, { useState } from "react"
import styled from "styled-components"
import {
  darkBackgroundColor,
  darkPrimaryColor,
  dividerColor,
  interactionColor,
  primaryTextColor,
} from "styles/colors"
import LogoText from "components/LogoText"
import useAppData from "utils/hooks/useAppData"
import { logout, checkLocalToken } from "utils/authProvider"
import { useMediaQuery } from "react-responsive"
import Dropdown from "components/Dropdown"
import { Link, withRouter } from "react-router-dom"
import { body2Normal, body3Normal } from "styles/textTheme"
import { RoundedLinkButton } from "./Buttons"
import DropdownContainer from "./DropdownContainer"
import { MenuIconButton } from "./IconButtons"

const LogoLink = styled(Link)`
  display: flex;
  align-items: center;
  width: fit-content;
`

const HeaderContainer = styled.header`
  display: flex;
  position: sticky;
  top: 0;
  align-items: center;
  width: 100%;
  height: 80px;
  flex: 0 0 80px;
  padding: ${(props) =>
    props.isSmall ? "0 24px" : props.isMedium ? "0 40px" : "0 56px 0 80px"};
  margin: 0;
  background: ${darkBackgroundColor};
  z-index: 100;
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

// Using small view
const MenuIconButtonWrapper = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: flex-start;
`

const RowNavigationMenuBox = styled.div`
  display: flex;
  & > a:not(:last-child) {
    margin-right: 16px;
  }
`

const BottomNavigationBox = styled.div`
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

const LinkText = styled(Link)`
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

function RowNavigation({ isLoggedIn }) {
  return (
    <RowNavigationMenuBox>
      <RoundedLinkButton to="/trackOfBest">나만 아는 갓띵곡</RoundedLinkButton>
      <RoundedLinkButton to="/musicOfMonth">이달의 명곡</RoundedLinkButton>
      <RoundedLinkButton to="/hallOfFame">명예의 전당</RoundedLinkButton>
      {!isLoggedIn && <RoundedLinkButton to="/signin">로그인</RoundedLinkButton>}
    </RowNavigationMenuBox>
  )
}

function BottomNavigation({ isSmall, isLoggedIn, isBottomMenuOpened }) {
  let height = 0
  if (isBottomMenuOpened) {
    height = "55px"
    if (isSmall) {
      height = "45px"
    }
  }

  return (
    <BottomNavigationBox isSmall={isSmall} height={height}>
      <LinkText className="item" to="/trackOfBest">
        나만 아는 갓띵곡
      </LinkText>
      <LinkText className="item" to="/musicOfMonth">
        이달의 명곡
      </LinkText>
      <LinkText className="item" to="/hallOfFame">
        명예의 전당
      </LinkText>
      {!isLoggedIn && (
        <LinkText className="item" to="signin">
          로그인
        </LinkText>
      )}
    </BottomNavigationBox>
  )
}

function Header({ history }) {
  // TODO: check user type => set correct icon
  // This is default user icon
  const icon = "🦄"
  const { nickname } = useAppData()
  const isMediumMode = useMediaQuery({
    query: "(min-width: 420px) and (max-width: 768px)",
  })
  const isSmallMode = useMediaQuery({
    query: "(max-width: 420px)",
  })

  const [isBottomMenuOpened, setIsBottomMenuOpend] = useState(false)
  const userMenu = [
    {
      name: "마이페이지",
      onClick: () => {
        history.push("/mypage")
      },
    },
    {
      name: "로그아웃",
      onClick: () => {
        logout()
        history.push("/main")
      },
    },
  ]

  const isLoggedIn = checkLocalToken()
  const isSmallView = isSmallMode || isMediumMode
  return (
    <>
      <HeaderContainer isSmall={isSmallMode} isMedium={isMediumMode}>
        {isSmallView && (
          <MenuIconButtonWrapper>
            <MenuIconButton onClick={() => setIsBottomMenuOpend((value) => !value)} />
          </MenuIconButtonWrapper>
        )}
        <LogoLink to="/main">
          <LogoText isSmall />
        </LogoLink>
        <RowMenuWrapper>
          {!isSmallView && <RowNavigation isLoggedIn={isLoggedIn} />}
          {isLoggedIn && (
            <Dropdown
              className="userMenu"
              type="userSetting"
              menus={userMenu}
              offset={[-18, 10]}
              dropdownContainerBuilder={() => {
                return (
                  <DropdownContainer
                    icon={icon}
                    nickname={nickname}
                    menus={userMenu}
                    isSmall={isSmallMode}
                  />
                )
              }}
            />
          )}
        </RowMenuWrapper>
      </HeaderContainer>
      {isSmallView && (
        <BottomNavigation
          isSmall={isSmallMode}
          isLoggedIn={isLoggedIn}
          isBottomMenuOpened={isBottomMenuOpened}
        />
      )}
    </>
  )
}

export default withRouter(Header)
