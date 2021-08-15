import React from "react"
import styled from "styled-components"
import { dartBackgroundColor, whiteColor } from "styles/colors"
import { useMediaQuery } from "react-responsive"
import { body2Normal } from "styles/textTheme"
import { GithubOutlined } from "@ant-design/icons"

const Container = styled.div`
  display: flex;
  flex-flow: column;
  width: 100%;
  flex: ${(props) => (props.isSmall ? "0 0 50px" : "0 0 60px")};
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
    color: ${whiteColor};
    padding-right: 24px;
  }
`

export default function Footer() {
  const isSmallMode = useMediaQuery({
    query: "(max-width: 768px)",
  })

  return (
    <Container isSmall={isSmallMode}>
      <InfoSection>
        <span>BnB-Flosvia ⓒ 2021</span>
        <a href="https://github.com/BnB-Flosvia" target="_blank" rel="noreferrer">
          <GithubOutlined style={{ color: `${whiteColor}`, fontSize: "24px" }} />
        </a>
      </InfoSection>
    </Container>
  )
}
