import { useObserver } from "mobx-react"
import useStores from "utils/hooks/useStores"

function useTrackOfBestDetailPageData() {
  const { trackOfBestDetail } = useStores()
  return useObserver(() => ({
    isLoading: trackOfBestDetail.isLoading,
    isFetchError: trackOfBestDetail.isFetchError,
    isFetchSuccess: trackOfBestDetail.isFetchSuccess,
    isDeleteError: trackOfBestDetail.isDeleteError,
    isDeleteSuccess: trackOfBestDetail.isDeleteSuccess,
    initialize: trackOfBestDetail.initialize,
    trackOfBestDetail: trackOfBestDetail.trackOfBestDetail,
    fetchRequest: trackOfBestDetail.fetchRequest,
    deleteRequest: trackOfBestDetail.deleteRequest,
  }))
}

export default useTrackOfBestDetailPageData
