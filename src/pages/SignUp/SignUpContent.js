import React, { useCallback } from "react"
import styled from "styled-components"
import { ReactComponent as MediumLogo } from "assets/MediumLogo.svg"
import { ReactComponent as SmallLogo } from "assets/SmallLogo.svg"
import { body3Normal, label2Normal } from "styles/textTheme"
import { dividerColor } from "styles/colors"
import { OutlineInput, PasswordInput } from "components/Inputs"
import { FullWidthButton } from "components/Buttons"
import { useMediaQuery } from "react-responsive"
import { CircleLineSpin } from "components/Spin"
import useSignUpContentData from "utils/hooks/signUp/useSignUpContentData"
import { Link } from "react-router-dom"

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

const InputSpacingBox = styled.div`
  height: ${(props) => (props.isSmall ? "16px" : "24px")};
`

export default function SignUpContent() {
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
      />
      <InputSpacingBox isSmall={emailFormatErrorText != null} />
      <PasswordInput
        labelText="비밀번호"
        errorText={pwdFormatErrorText}
        placeholderText="비밀번호 입력"
        size={isSmallMode ? "small" : "medium"}
        onChange={onPwdChange}
      />
      <InputSpacingBox isSmall />
      <PasswordInput
        labelText="비밀번호 확인"
        errorText={pwdConfirmErrorText}
        placeholderText="비밀번호 재입력"
        size={isSmallMode ? "small" : "medium"}
        onChange={onPwdConfirmChange}
      />
      <InputSpacingBox isSmall={pwdConfirmErrorText != null} />
      <OutlineInput
        labelText="닉네임"
        errorText={nicknameErrorText}
        placeholderText="닉네임 입력"
        size={isSmallMode ? "small" : "medium"}
        onChange={onNicknameChange}
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
