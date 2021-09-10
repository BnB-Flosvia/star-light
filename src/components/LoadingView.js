import React from "react"
import styled from "styled-components"
import { lightBackgroundColor } from "styles/colors"

const Container = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  justify-content: center;
  align-items: center;
  background: ${lightBackgroundColor};
`

export default function LoadingView() {
  return (
    <Container>
      <h3>Loading...</h3>
    </Container>
  )
}
