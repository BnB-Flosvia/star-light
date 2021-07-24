import { useObserver } from "mobx-react"
import useStores from "utils/hooks/useStores"

function useSignInPageData() {
  const { signIn } = useStores()
  return useObserver(() => ({
    isApiCallSuccess: signIn.isApiCallSuccess,
    initialize: signIn.initialize,
  }))
}

export default useSignInPageData
