import React from "react"
import styled from "styled-components"
import { ReactComponent as MediumLogo } from "assets/MediumLogo.svg"
import { ReactComponent as SmallLogo } from "assets/SmallLogo.svg"
import { body3Normal, body2Normal, label2Normal } from "styles/textTheme"
import { primaryColor, dividerColor } from "styles/colors"
import { OutlineInput, PasswordInput } from "components/Inputs"
import { FullWidthButton } from "components/Buttons"
import { useMediaQuery } from "react-responsive"

const Container = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;
  width: 400px;
  max-width: 400px;
  height: fit-content;
  padding: 24px 16px;
  background: ${dividerColor};
`

const TopLabelText = styled.span`
  ${(props) => (props.isSmall ? label2Normal : body3Normal)}
  text-align: center;
`

const LinkTextSection = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  ${(props) => (props.isSmall ? body3Normal : body2Normal)}
  & > span {
    padding-right: 16px;
    &:hover {
      color: ${primaryColor};
    }
  }
`

const SmallVerticalSpacingBox = styled.div`
  height: 16px;
`

const MediumVerticalSpacingBox = styled.div`
  height: 24px;
`

const LargeVerticalSpacingBox = styled.div`
  height: 32px;
`

export default function SignInContent() {
  const isSmallMode = useMediaQuery({
    query: "(max-width: 768px)",
  })

  return (
    <Container>
      {isSmallMode ? <SmallLogo /> : <MediumLogo />}
      <SmallVerticalSpacingBox />
      <TopLabelText isSmall={isSmallMode}>
        Star Light 서비스를 통해 나만 알고 있는 갓띵곡을 공유해보세요!
      </TopLabelText>
      <LargeVerticalSpacingBox />
      <OutlineInput
        placeholderText="이메일 입력"
        size={isSmallMode ? "small" : "medium"}
      />
      <SmallVerticalSpacingBox />
      <PasswordInput
        placeholderText="비밀번호 입력"
        size={isSmallMode ? "small" : "medium"}
      />
      <MediumVerticalSpacingBox />
      <LinkTextSection isSmall={isSmallMode}>
        <span>비밀번호를 잊으셨나요?</span>
        <span>회원가입하기</span>
      </LinkTextSection>
      <MediumVerticalSpacingBox />
      <FullWidthButton
        onClick={() => {
          alert("click~~")
          // TODO: 1. check validation, 2. occure error or send request
        }}
        size={isSmallMode ? "small" : "medium"}
      >
        로그인
      </FullWidthButton>
    </Container>
  )
}
