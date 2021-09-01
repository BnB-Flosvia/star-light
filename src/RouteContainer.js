/* eslint-disable react/jsx-props-no-spreading */
import React from "react"
import styled, { createGlobalStyle } from "styled-components"
import { Redirect, Route } from "react-router-dom"
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
      <Container>
        <ScrollContainer>
          {fullSize ? (
            childComponent
          ) : (
            <>
              <Header />
              <ContentContainer>{childComponent}</ContentContainer>
              {!hiddenFooter && <Footer />}
            </>
          )}
        </ScrollContainer>
      </Container>
    </Route>
  )
}
