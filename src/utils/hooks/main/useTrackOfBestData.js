import { useObserver } from "mobx-react"
import useStores from "utils/hooks/useStores"

function useTrackOfBestData() {
  const { main } = useStores()
  return useObserver(() => ({
    isLoading: main.isLoading,
    trackOfBestList: main.trackOfBestList,
    totalCount: main.trackOfBestTotalCount,
  }))
}

export default useTrackOfBestData
