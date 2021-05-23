import React, { useEffect } from "react"
import styled from "styled-components"
import SignUpContent from "pages/SignUp/SignUpContent"
import { withRouter } from "react-router-dom"
import useSignUpPageData from "utils/hooks/signUp/useSignUpPageData"

const PageContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`

function SignUpPage({ history }) {
  const { initialize, isApiCallSuccess } = useSignUpPageData()
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
      <SignUpContent />
    </PageContainer>
  )
}

export default withRouter(SignUpPage)
