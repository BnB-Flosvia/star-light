import React, { useCallback } from "react"
import styled from "styled-components"
import { OutlineInput, PasswordInput } from "components/Inputs"
import { FullWidthButton } from "components/Buttons"
import { useMediaQuery } from "react-responsive"
import { CircleLineSpin } from "components/Spin"
import useSignUpContentData from "utils/hooks/signUp/useSignUpContentData"
import { Link } from "react-router-dom"
import { whiteColor } from "styles/colors"
import LogoText from "components/LogoText"

const Container = styled.div`
  display: flex;
  position: relative;
  z-index: 1;
  flex-flow: column;
  align-items: center;
  width: 400px;
  max-width: 400px;
  height: fit-content;
  padding: 28px 40px;
  box-sizing: border-box;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  & > button {
    margin-top: 24px;
  }
  a {
    padding-bottom: 12px;
  }
`

const InputSpacingBox = styled.div`
  height: ${(props) => (props.isSmall ? "16px" : "24px")};
`

export default function SignUpContent() {
  const isSmallMode = useMediaQuery({
    query: "(max-width: 768px)",
  })

  return (
    <Container>
      <Link to="/main">
        <LogoText isSmall={isSmallMode} />
      </Link>
      <InputContentSection isSmallMode={isSmallMode} />
    </Container>
  )
}

const InputContentSection = ({ isSmallMode }) => {
  const {
    isLoading,
    signUpRequest,
    setPassword,
    setPasswordConfirm,
    setNickname,
    setEmail,
    nicknameErrorText,
    pwdConfirmErrorText,
    pwdFormatErrorText,
    emailFormatErrorText,
  } = useSignUpContentData()
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
  const onPwdConfirmChange = useCallback(
    (newPwd) => {
      setPasswordConfirm(newPwd)
    },
    [setPasswordConfirm]
  )
  const onNicknameChange = useCallback(
    (newNickname) => {
      setNickname(newNickname)
    },
    [setNickname]
  )

  const signUp = useCallback(() => {
    signUpRequest()
  }, [signUpRequest])

  return (
    <>
      <OutlineInput
        labelText="이메일"
        errorText={emailFormatErrorText}
        placeholderText="이메일 입력"
        size={isSmallMode ? "small" : "medium"}
        onChange={onEmailChange}
        color={whiteColor}
      />
      <InputSpacingBox isSmall={emailFormatErrorText != null} />
      <PasswordInput
        labelText="비밀번호"
        errorText={pwdFormatErrorText}
        placeholderText="비밀번호 입력"
        size={isSmallMode ? "small" : "medium"}
        onChange={onPwdChange}
        color={whiteColor}
      />
      <InputSpacingBox isSmall />
      <PasswordInput
        labelText="비밀번호 확인"
        errorText={pwdConfirmErrorText}
        placeholderText="비밀번호 재입력"
        size={isSmallMode ? "small" : "medium"}
        onChange={onPwdConfirmChange}
        color={whiteColor}
      />
      <InputSpacingBox isSmall={pwdConfirmErrorText != null} />
      <OutlineInput
        labelText="닉네임"
        errorText={nicknameErrorText}
        placeholderText="닉네임 입력"
        size={isSmallMode ? "small" : "medium"}
        onChange={onNicknameChange}
        maxLength={6}
        color={whiteColor}
      />
      <FullWidthButton onClick={() => signUp()} size={isSmallMode ? "small" : "medium"}>
        {isLoading ? (
          <CircleLineSpin size={isSmallMode ? "small" : "medium"} />
        ) : (
          <span>가입하기</span>
        )}
      </FullWidthButton>
    </>
  )
}
