import { useObserver } from "mobx-react"
import useStores from "utils/hooks/useStores"

function useTrackOfBestData() {
  const { main } = useStores()
  return useObserver(() => ({
    trackOfBestList: main.trackOfBestList,
  }))
}

export default useTrackOfBestData
