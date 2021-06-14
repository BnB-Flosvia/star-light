import { useObserver } from "mobx-react"
import useStores from "utils/hooks/useStores"

function useTrackOfBestPageData() {
  const { trackOfBest } = useStores()
  return useObserver(() => ({
    isLoading: trackOfBest.isLoading,
    isError: trackOfBest.isError,
    isSuccess: trackOfBest.isSuccess,
    initialize: trackOfBest.initialize,
    trackOfBestList: trackOfBest.trackOfBestList,
    tagList: trackOfBest.tagList,
    selectedTagList: trackOfBest.selectedTagList,
    selectedOrderType: trackOfBest.selectedOrderType,
    fetchRequest: trackOfBest.fetchRequest,
    fetchFilteredListRequest: trackOfBest.fetchFilteredListRequest,
    updateSelectedTagList: trackOfBest.updateSelectedTagList,
    setOrderType: trackOfBest.setOrderType,
  }))
}

export default useTrackOfBestPageData
