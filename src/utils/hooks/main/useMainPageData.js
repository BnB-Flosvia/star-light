import { useObserver } from "mobx-react"
import useStores from "utils/hooks/useStores"

function useMainPageData() {
  const { main } = useStores()
  return useObserver(() => ({
    isLoading: main.isLoading,
    isFetchError: main.isFetchError,
    isFetchSuccess: main.isFetchSuccess,
    initialize: main.initialize,
    fetchRequest: main.fetchRequest,
  }))
}

export default useMainPageData
