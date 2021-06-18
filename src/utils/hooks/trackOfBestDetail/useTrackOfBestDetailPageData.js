import { useObserver } from "mobx-react"
import useStores from "utils/hooks/useStores"

function useTrackOfBestDetailPageData() {
  const { trackOfBestDetail } = useStores()
  return useObserver(() => ({
    isLoading: trackOfBestDetail.isLoading,
    isError: trackOfBestDetail.isError,
    isSuccess: trackOfBestDetail.isSuccess,
    initialize: trackOfBestDetail.initialize,
    trackOfBestDetail: trackOfBestDetail.trackOfBestDetail,
    fetchRequest: trackOfBestDetail.fetchRequest,
  }))
}

export default useTrackOfBestDetailPageData
