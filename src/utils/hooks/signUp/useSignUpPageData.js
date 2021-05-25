import { useObserver } from "mobx-react"
import useStores from "utils/hooks/useStores"

function useSignUpPageData() {
  const { signUp } = useStores()
  return useObserver(() => ({
    isApiCallSuccess: signUp.isApiCallSuccess,
    isApiCallError: signUp.isApiCallError,
    initialize: signUp.initialize,
  }))
}

export default useSignUpPageData
