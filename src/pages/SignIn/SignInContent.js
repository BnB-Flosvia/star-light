import React, { useCallback } from "react"
import styled from "styled-components"
import { ReactComponent as MediumLogo } from "assets/MediumLogo.svg"
import { ReactComponent as SmallLogo } from "assets/SmallLogo.svg"
import {
  body3Normal,
  body2Normal,
  label2Normal,
  body2Bold,
  body3Bold,
} from "styles/textTheme"
import { primaryColor, dividerColor, errorColor } from "styles/colors"
import { OutlineInput, PasswordInput } from "components/Inputs"
import { FullWidthButton } from "components/Buttons"
import { useMediaQuery } from "react-responsive"
import { Link } from "react-router-dom"
import useSignInData from "utils/hooks/signIn/useSignInContentData"
import { CircleLineSpin } from "components/Spin"

const Container = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;
  width: 400px;
  max-width: 400px;
  height: fit-content;
  padding: 24px 16px;
  background: ${dividerColor};
  & > button {
    margin-top: 24px;
  }
`

const TopLabelText = styled.span`
  ${(props) => (props.isSmall ? label2Normal : body3Normal)}
  text-align: center;
  padding: 16px 0 32px 0;
`

const LinkTextSection = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  padding-top: 24px;
`

const InputSpacingBox = styled.div`
  height: ${(props) => (props.isSmall ? "10px" : "16px")};
`

const LinkText = styled(Link)`
  text-decoration: none;
  padding-right: 16px;
  ${(props) => (props.isSmall ? body3Normal : body2Normal)}
  &:hover {
    color: ${primaryColor};
    cursor: pointer;
  }
`

const SignInErrorText = styled.div`
  ${(props) => (props.isSmall ? body3Bold : body2Bold)}
  color: ${errorColor};
  padding-top: 24px;
  text-align: center;
`

export default function SignInContent() {
  const isSmallMode = useMediaQuery({
    query: "(max-width: 768px)",
  })

  return (
    <Container>
      <Link to="/main">{isSmallMode ? <SmallLogo /> : <MediumLogo />}</Link>
      <TopLabelText isSmall={isSmallMode}>
        Star Light 서비스를 통해 나만 알고 있는 갓띵곡을 공유해보세요!
      </TopLabelText>
      <InputContentSection isSmallMode={isSmallMode} />
      <LinkTextSection isSmall={isSmallMode}>
        <LinkText to="/forgotpassword">비밀번호를 잊으셨나요?</LinkText>
        <LinkText to="/signup">회원가입하기</LinkText>
      </LinkTextSection>
    </Container>
  )
}

const InputContentSection = ({ isSmallMode }) => {
  const {
    isLoading,
    signInRequest,
    setPassword,
    setEmail,
    signInErrorText,
    pwdFormatErrorText,
    emailFormatErrorText,
  } = useSignInData()
  const onEmailChange = useCallback(
    (newEmail) => {
      setEmail(newEmail)
    },
    [setEmail]
  )

  const onPwdChange = useCallback(
    (newPwd) => {
      setPassword(newPwd)
    },
    [setPassword]
  )

  const signIn = useCallback(() => {
    signInRequest()
  }, [signInRequest])

  return (
    <>
      <OutlineInput
        errorText={emailFormatErrorText}
        placeholderText="이메일 입력"
        size={isSmallMode ? "small" : "medium"}
        onChange={onEmailChange}
      />
      <InputSpacingBox isSmall={emailFormatErrorText != null} />
      <PasswordInput
        errorText={pwdFormatErrorText}
        placeholderText="비밀번호 입력"
        size={isSmallMode ? "small" : "medium"}
        onChange={onPwdChange}
      />
      {signInErrorText != null && (
        <SignInErrorText isSmall={isSmallMode}>{signInErrorText}</SignInErrorText>
      )}
      <FullWidthButton onClick={() => signIn()} size={isSmallMode ? "small" : "medium"}>
        {isLoading ? (
          <CircleLineSpin size={isSmallMode ? "small" : "medium"} />
        ) : (
          <span>로그인</span>
        )}
      </FullWidthButton>
    </>
  )
}
