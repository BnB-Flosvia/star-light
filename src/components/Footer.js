import React from "react"
import styled from "styled-components"
import { dartBackgroundColor } from "styles/colors"
import { ReactComponent as MediumLogo } from "assets/MediumLogo.svg"
import { ReactComponent as SmallLogo } from "assets/SmallLogo.svg"
import { useMediaQuery } from "react-responsive"
import { body2Normal } from "styles/textTheme"
import { GithubOutlined } from "@ant-design/icons"

const Container = styled.div`
  display: flex;
  flex-flow: column;
  width: 100%;
  flex: ${(props) => (props.isSmall ? "0 0 100px" : "0 0 120px")};
  align-items: center;
  justify-content: center;
  background: ${dartBackgroundColor};
`

const InfoSection = styled.div`
  display: flex;
  margin-top: 10px;
  align-items: center;
  width: fit-content;
  & > span {
    ${body2Normal}
    color: #fff;
    padding-right: 24px;
  }
`

export default function Footer() {
  const isSmallMode = useMediaQuery({
    query: "(max-width: 768px)",
  })

  return (
    <Container isSmall={isSmallMode}>
      {isSmallMode ? <SmallLogo /> : <MediumLogo />}
      <InfoSection>
        <span>BnB-Flosvia ⓒ 2021</span>
        <a href="https://github.com/BnB-Flosvia" target="_blank" rel="noreferrer">
          <GithubOutlined style={{ color: "#fff", fontSize: "24px" }} />
        </a>
      </InfoSection>
    </Container>
  )
}
