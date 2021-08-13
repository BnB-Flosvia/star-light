import { useObserver } from "mobx-react"
import useStores from "utils/hooks/useStores"

function useAppData() {
  const { app } = useStores()
  return useObserver(() => ({
    initialized: app.initialized,
    checkLocalTokenIsValid: app.checkLocalTokenIsValid,
    nickname: app.nickname,
  }))
}

export default useAppData
