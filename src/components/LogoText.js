import React from "react"
import styled, { keyframes } from "styled-components"
import { Link } from "react-router-dom"
import { logoTextColor } from "styles/colors"
import { logoText } from "styles/textTheme"

const LogoLink = styled(Link)`
  display: flex;
  align-items: center;
  width: fit-content;
`

const LogoContainer = styled.h1`
  margin: 0;
  padding: 0;
  ${logoText};
  font-size: ${(props) => (props.isSmall ? "24px" : "40px")};
  line-height: ${(props) => (props.isSmall ? "40px" : "56px")};
  color: transparent;
  & > span:nth-child(5n + 1) {
    animation-delay: 0.5s;
  }
  & > span:nth-child(5n + 2) {
    animation-delay: 1.25s;
  }
  & > span:nth-child(5n + 3) {
    animation-delay: 2s;
  }
  & > span:nth-child(5n + 4) {
    animation-delay: 2.25s;
  }
  & > span:nth-child(5n + 5) {
    animation-delay: 2.75s;
  }
`

const animate = keyframes`
  0% {
    color: white;
    filter: blur(1px);
    text-shadow: 0 0 10px ${logoTextColor},
                 0 0 20px ${logoTextColor},
                 0 0 40px ${logoTextColor},
                 0 0 80px ${logoTextColor},
                 0 0 120px ${logoTextColor},
                 0 0 200px ${logoTextColor},
                 0 0 300px ${logoTextColor},
                 0 0 400px ${logoTextColor};
  }
  100% {
    color: white;
    text-shadow: 0 0 10px ${logoTextColor},
                 0 0 20px ${logoTextColor},
                 0 0 40px ${logoTextColor},
                 0 0 80px ${logoTextColor},
                 0 0 120px ${logoTextColor},
                 0 0 200px ${logoTextColor},
                 0 0 300px ${logoTextColor},
                 0 0 400px ${logoTextColor};
  }
`

const LogoWordItem = styled.span`
  display: table-cell;
  animation-name: ${animate};
  animation-duration: 1s;
  animation-timing-function: ease;
  animation-iteration-count: 1;
  animation-direction: alternate;
  animation-fill-mode: forwards;
`

export default function LogoText({ isSmall }) {
  return (
    <LogoLink to="/main">
      <LogoContainer isSmall={isSmall}>
        <LogoWordItem>S</LogoWordItem>
        <LogoWordItem>t</LogoWordItem>
        <LogoWordItem>a</LogoWordItem>
        <LogoWordItem>r</LogoWordItem>
        <LogoWordItem>_</LogoWordItem>
        <LogoWordItem>l</LogoWordItem>
        <LogoWordItem>i</LogoWordItem>
        <LogoWordItem>g</LogoWordItem>
        <LogoWordItem>h</LogoWordItem>
        <LogoWordItem>t</LogoWordItem>
      </LogoContainer>
    </LogoLink>
  )
}
