import React, { useEffect } from "react"
import styled from "styled-components"
import SignUpContent from "pages/SignUp/SignUpContent"
import { withRouter } from "react-router-dom"
import useSignUpPageData from "utils/hooks/signUp/useSignUpPageData"
import { message } from "antd"

const PageContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  background: radial-gradient(ellipse at bottom, #386cad 0%, #161d4b 90%);
`

function SignUpPage({ history }) {
  const { initialize, isApiCallSuccess, isApiCallError } = useSignUpPageData()
  useEffect(() => {
    return () => {
      initialize()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (isApiCallSuccess) {
      history.push("/main")
      message.success("회원가입이 완료되었습니다.")
    }
  }, [isApiCallSuccess, history])

  useEffect(() => {
    if (isApiCallError) {
      message.error("요청에 실패하였습니다.")
    }
  }, [isApiCallError])

  return (
    <PageContainer>
      <SignUpContent />
    </PageContainer>
  )
}

export default withRouter(SignUpPage)
