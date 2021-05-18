import { useObserver } from "mobx-react"
import useStores from "utils/hooks/useStores"

function useSignInContentData() {
  const { signIn } = useStores()
  return useObserver(() => ({
    setEmail: signIn.setEmail,
    setPassword: signIn.setPassword,
    signInRequest: signIn.signInRequest,
    signInErrorText: signIn.signInErrorText,
    pwdFormatErrorText: signIn.pwdFormatErrorText,
    emailFormatErrorText: signIn.emailFormatErrorText,
  }))
}

export default useSignInContentData
