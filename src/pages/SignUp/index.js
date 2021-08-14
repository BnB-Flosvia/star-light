import React, { useEffect } from "react"
import styled from "styled-components"
import SignUpContent from "pages/SignUp/SignUpContent"
import { withRouter } from "react-router-dom"
import useSignUpPageData from "utils/hooks/signUp/useSignUpPageData"
import { message } from "antd"
import Particles from "react-particles-js"

const PageContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  background: radial-gradient(ellipse at bottom, #386cad 0%, #161d4b 90%);
  #tsparticles {
    position: absolute;
    width: 100%;
    height: 100%;
  }
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
      <Particles
        params={{
          particles: {
            number: {
              value: 60,
              density: {
                enable: true,
                value_area: 1500,
              },
            },
            line_linked: {
              enable: true,
              opacity: 0.2,
            },
            move: {
              direction: "right",
              speed: 0.05,
            },
            size: {
              value: 2,
            },
            opacity: {
              anim: {
                enable: true,
                speed: 1,
                opacity_min: 0.05,
              },
            },
          },
          retina_detect: true,
        }}
      />
      <SignUpContent />
    </PageContainer>
  )
}

export default withRouter(SignUpPage)
