import React from "react"
import styled, { keyframes } from "styled-components"
import { logoTextColor, whiteColor } from "styles/colors"
import { logoText } from "styles/textTheme"

const LogoContainer = styled.h1`
  margin: 0;
  padding: 0;
  color: transparent;
  ${logoText};
`

const animate = keyframes`
  0% {
    color: ${whiteColor};
    filter: blur(1px);
    text-shadow: 0 0 10px ${logoTextColor},
                 0 0 20px ${logoTextColor},
                 0 0 40px ${logoTextColor},
                 0 0 80px ${logoTextColor},
                 0 0 120px ${logoTextColor},
                 0 0 200px ${logoTextColor},
                 0 0 300px ${logoTextColor},
                 0 0 400px ${logoTextColor};
  },
  100% {
    color: ${whiteColor};
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
`

const LogoWordItem = styled.span`
  display: table-cell;
  animation: ${animate} 1s linear infinite;
`

export default function LogoText() {
  return (
    <LogoContainer>
      <LogoWordItem>S</LogoWordItem>
      <LogoWordItem>t</LogoWordItem>
      <LogoWordItem>a</LogoWordItem>
      <LogoWordItem>r</LogoWordItem>
      <LogoWordItem>_</LogoWordItem>
      <LogoWordItem>L</LogoWordItem>
      <LogoWordItem>i</LogoWordItem>
      <LogoWordItem>g</LogoWordItem>
      <LogoWordItem>h</LogoWordItem>
      <LogoWordItem>t</LogoWordItem>
    </LogoContainer>
  )
}
