import React, { useEffect } from "react"
import styled from "styled-components"
import SignInContent from "pages/SignIn/SignInContent"
import { observer, inject } from "mobx-react"
import { withRouter } from "react-router-dom"

const PageContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`

function SignInPage({ isApiCallSuccess, initialize, history }) {
  useEffect(() => {
    return () => {
      initialize()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (isApiCallSuccess) {
      history.push("/main")
    }
  }, [isApiCallSuccess, history])

  return (
    <PageContainer>
      <SignInContent />
    </PageContainer>
  )
}

export default inject(({ signIn }) => ({
  isApiCallSuccess: signIn.isApiCallSuccess,
  initialize: signIn.initialize,
}))(observer(withRouter(SignInPage)))
