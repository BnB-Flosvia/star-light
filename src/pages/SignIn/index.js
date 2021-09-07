import React, { useEffect } from "react"
import { withRouter } from "react-router-dom"
import styled from "styled-components"
import useSignInPageData from "utils/hooks/signIn/useSignInPageData"
import Particles from "react-particles-js"
import SignInContent from "./SignInContent"

const PageContainer = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  background: linear-gradient(#03030b, #151a44, #335f9e);
  #tsparticles {
    position: absolute;
    width: 100%;
    height: 100%;
  }
`

function SignInPage({ history }) {
  const { initialize, isApiCallSuccess } = useSignInPageData()
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
      <Particles
        params={{
          particles: {
            number: {
              value: 250,
              density: {
                enable: false,
              },
            },
            size: {
              value: 3,
              random: true,
              anim: {
                speed: 4,
                size_min: 0.3,
              },
            },
            line_linked: {
              enable: false,
            },
            move: {
              random: true,
              speed: 1,
              direction: "top",
              out_mode: "out",
            },
          },
        }}
      />
      <SignInContent />
    </PageContainer>
  )
}

export default withRouter(SignInPage)
