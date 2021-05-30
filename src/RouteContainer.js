/* eslint-disable react/jsx-props-no-spreading */
import React from "react"
import styled, { createGlobalStyle } from "styled-components"
import { PORTAL_ELEMENT_ID } from "components/Portal"
import { Redirect, Route } from "react-router-dom"
import NavigationBar from "components/NavigationBar"
import PerfectScrollbar from "react-perfect-scrollbar"
import Header from "components/Header"
import Footer from "components/Footer"
import { checkLocalToken } from "authProvider"

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
  min-width: 340px;
`

const ContentContainer = styled.div`
  display: flex;
  flex-flow: column;
  width: 100%;
  flex: 1;
`

const ScrollContainer = styled(PerfectScrollbar)`
  display: flex;
  flex-flow: column;
  flex: 1;
`

export default function RouteContainer({
  path,
  fullSize,
  children,
  component,
  requiredLogin,
  ...props
}) {
  const childComponent = children || component || <div />

  const isAllowed = !requiredLogin || checkLocalToken()

  const onScroll = (event) => {
    const scrollTop = event?.currentTarget?.scrollTop

    // TODO: set navigation bar position to fix
    if (scrollTop) console.log(scrollTop)
  }

  if (!isAllowed) {
    return (
      <Route path={path} {...props}>
        <Redirect to="/signin" />
      </Route>
    )
  }

  return (
    <Route path={path} {...props}>
      <GlobalStyle />
      <div id={PORTAL_ELEMENT_ID} />
      <Container>
        <ScrollContainer onScroll={onScroll}>
          {fullSize ? (
            childComponent
          ) : (
            <>
              <Header />
              <NavigationBar isFixed={false} />
              <ContentContainer>{childComponent}</ContentContainer>
              <Footer />
            </>
          )}
        </ScrollContainer>
      </Container>
    </Route>
  )
}
