import { useObserver } from "mobx-react"
import useStores from "utils/hooks/useStores"

function useSignUpContentData() {
  const { signUp } = useStores()
  return useObserver(() => ({
    isLoading: signUp.isLoading,
    setEmail: signUp.setEmail,
    setPassword: signUp.setPassword,
    setPasswordConfirm: signUp.setPasswordConfirm,
    setNickname: signUp.setNickname,
    signUpRequest: signUp.signUpRequest,
    pwdFormatErrorText: signUp.pwdFormatErrorText,
    pwdConfirmErrorText: signUp.pwdConfirmErrorText,
    emailFormatErrorText: signUp.emailFormatErrorText,
    nicknameErrorText: signUp.nicknameErrorText,
  }))
}

export default useSignUpContentData
