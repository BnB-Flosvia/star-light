import React from "react"
import styled from "styled-components"
import {
  borderColor,
  lightBackgroundColor,
  primaryTextColor,
  secondaryTextColor,
} from "styles/colors"
import { useMediaQuery } from "react-responsive"
import { body2Normal } from "styles/textTheme"
import { GithubOutlined } from "@ant-design/icons"

const Container = styled.footer`
  display: flex;
  width: 100%;
  flex: ${(props) => (props.isSmall ? "0 0 60px" : "0 0 70px")};
  align-items: center;
  justify-content: center;
  background: ${lightBackgroundColor};
  padding: 0 0 10px;
  border-top: 1px solid ${borderColor};
  margin: 0;
`

const InfoSection = styled.div`
  display: flex;
  margin-top: 10px;
  align-items: center;
  height: 100%;
  width: fit-content;
  & > span {
    ${body2Normal}
    color: ${secondaryTextColor};
    padding-right: 12px;
  }
  a:hover {
    svg {
      fill: ${primaryTextColor};
    }
  }
`

export default function Footer() {
  const isSmallMode = useMediaQuery({
    query: "(max-width: 768px)",
  })

  return (
    <Container isSmall={isSmallMode}>
      <InfoSection>
        <span>ⓒ 2021 BnB-Flosvia. All Rights Reserved.</span>
        <a href="https://github.com/BnB-Flosvia" target="_blank" rel="noreferrer">
          <GithubOutlined style={{ color: `${secondaryTextColor}`, fontSize: "24px" }} />
        </a>
      </InfoSection>
    </Container>
  )
}
