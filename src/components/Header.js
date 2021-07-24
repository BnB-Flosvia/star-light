import React from "react"
import styled from "styled-components"
import { backgroundColor1 } from "styles/colors"
import { ReactComponent as MediumLogo } from "assets/MediumLogo.svg"
import { ReactComponent as SmallLogo } from "assets/SmallLogo.svg"
import { useMediaQuery } from "react-responsive"
import { logout, checkLocalToken } from "utils/authProvider"
import Dropdown from "components/Dropdown"
import { body2Normal } from "styles/textTheme"
import { Link, withRouter } from "react-router-dom"
import useAppData from "utils/hooks/useAppData"
import { RoundedLinkButton } from "./Buttons"

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

const LogoLink = styled(Link)`
  display: flex;
  align-items: center;
  width: fit-content;
`

function Header({ history }) {
  // TODO: check user type => set correct icon
  // This is default user icon
  const icon = "🦄"
  const { nickname } = useAppData()
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
              <RoundedLinkButton to="/signin" isSmall={isSmallMode}>
                로그인
              </RoundedLinkButton>
            )}
          </>
        )}
      </UserMenuSection>
    </Container>
  )
}

export default withRouter(Header)
