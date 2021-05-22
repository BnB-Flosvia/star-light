import { useObserver } from "mobx-react"
import useStores from "utils/hooks/useStores"

function useMainPageData() {
  const { main } = useStores()
  return useObserver(() => ({
    fetchRequest: main.fetchRequest,
  }))
}

export default useMainPageData
