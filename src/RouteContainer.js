/* eslint-disable react/jsx-props-no-spreading */
import React from "react"
import styled, { createGlobalStyle } from "styled-components"
import { Redirect, Route } from "react-router-dom"

const GlobalStyle = createGlobalStyle`
  * {
    user-select: none;
  }

  input, p, span, td {
    user-select: text;
  }

  body {
    margin: 0;
  }
`

const Container = styled.div`
  overflow: hidden;
  width: 100vw;
  height: 100vh;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
`

const ContentContainer = styled.div`
  display: flex;
  flex-flow: row nowrap;
  overflow: hidden;
  width: 100%;
  flex: 1;
  position: relative;
`

export default function RouteContainer({
  path,
  fullSize,
  children,
  component,
  ...props
}) {
  const childComponent = children || component || <div />

  const isAllowed = true

  if (!isAllowed) {
    return (
      <Route path={path} {...props}>
        <Redirect to="/main" />
      </Route>
    )
  }

  return (
    <Route path={path} {...props}>
      <GlobalStyle />
      {/* <div id={POPUP_PORTAL_ELEMENT_ID} /> */}
      <Container>
        {fullSize ? (
          childComponent
        ) : (
          <>
            {/* TODO: Header, Menu bar */}
            <ContentContainer>{childComponent}</ContentContainer>
            {/* TODO: Footer */}
          </>
        )}
      </Container>
    </Route>
  )
}
