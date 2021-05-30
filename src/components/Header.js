import React from "react"
import styled from "styled-components"
import {
  backgroundColor1,
  darkPrimaryColor,
  primaryTextColor,
  interactionColor,
} from "styles/colors"
import { ReactComponent as MediumLogo } from "assets/MediumLogo.svg"
import { ReactComponent as SmallLogo } from "assets/SmallLogo.svg"
import { useMediaQuery } from "react-responsive"
import { logout, checkLocalToken } from "authProvider"
import Dropdown from "components/Dropdown"
import { body2Normal, body3Normal } from "styles/textTheme"
import { Link, withRouter } from "react-router-dom"

const Container = styled.div`
  display: flex;
  width: 100%;
  flex: ${(props) => (props.isSmall ? "0 0 80px" : "0 0 100px")};
  background: ${backgroundColor1};
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  & > div {
    flex: 1;
  }
`

const UserMenuSection = styled.div`
  display: flex;
  flex: 1;
  justify-content: flex-end;
  align-items: center;
  & > span {
    ${body2Normal};
    & > .nickname {
      padding-left: 2px;
      font-weight: bold;
    }
  }
`

const LoginButton = styled(Link)`
  display: flex;
  padding: 12px 24px;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  border-radius: 24px;
  background: ${darkPrimaryColor};
  ${(props) => (props.isSmall ? body3Normal : body2Normal)};
  color: #fff;
  &:hover {
    font-weight: bold;
    color: ${primaryTextColor};
    background: ${interactionColor};
  }
`

const LogoLink = styled(Link)`
  display: flex;
  align-items: center;
  width: fit-content;
`

function Header({ history }) {
  // TODO: check user type => set correct icon
  // This is default user icon
  const icon = "🦄"
  // TODO: get user nickname
  const nickname = "메론소다"
  const isSmallMode = useMediaQuery({
    query: "(max-width: 768px)",
  })

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

  return (
    <Container isSmall={isSmallMode}>
      <div />
      <LogoLink to="/main">{isSmallMode ? <SmallLogo /> : <MediumLogo />}</LogoLink>
      <UserMenuSection>
        {isLoggedIn ? (
          <>
            {!isSmallMode && (
              <span>
                {icon}
                <span className="nickname">{nickname}</span>님
              </span>
            )}
            {isSmallMode ? (
              <Dropdown buttonType="userSetting" menus={userMenu} offset={[0, 10]} />
            ) : (
              <Dropdown menus={userMenu} offset={[0, 10]} />
            )}
          </>
        ) : (
          <>
            {!isSmallMode && (
              <LoginButton to="/signin" isSmall={isSmallMode}>
                로그인
              </LoginButton>
            )}
          </>
        )}
      </UserMenuSection>
    </Container>
  )
}

export default withRouter(Header)
