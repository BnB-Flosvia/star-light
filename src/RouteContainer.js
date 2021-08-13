/* eslint-disable react/jsx-props-no-spreading */
import React from "react"
import styled, { createGlobalStyle } from "styled-components"
import { PORTAL_ELEMENT_ID } from "components/Portal"
import { Redirect, Route } from "react-router-dom"
import NavigationBar from "components/NavigationBar"
import PerfectScrollbar from "react-perfect-scrollbar"
import Header from "components/Header"
import Footer from "components/Footer"
import { checkLocalToken } from "utils/authProvider"
import { message } from "antd"

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
  min-width: 360px;
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
  hiddenFooter,
  ...props
}) {
  const childComponent = children || component || <div />

  const isAllowed = !requiredLogin || checkLocalToken()

  const onScroll = (_event) => {
    // const scrollTop = event?.currentTarget?.scrollTop
    // TODO: set navigation bar position to fix
    // if (scrollTop) console.log(scrollTop)
  }

  if (!isAllowed) {
    message.error("해당 기능은 로그인 후 이용하실 수 있습니다.")

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
              {!hiddenFooter && <Footer />}
            </>
          )}
        </ScrollContainer>
      </Container>
    </Route>
  )
}
