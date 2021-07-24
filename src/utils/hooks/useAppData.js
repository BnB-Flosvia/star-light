import { useObserver } from "mobx-react"
import useStores from "utils/hooks/useStores"

function useAppData() {
  const { app } = useStores()
  return useObserver(() => ({
    initialized: app.initialized,
    checkLocalToken: app.checkLocalToken,
    nickname: app.nickname,
  }))
}

export default useAppData
