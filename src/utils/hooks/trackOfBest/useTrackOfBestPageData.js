import { useObserver } from "mobx-react"
import useStores from "utils/hooks/useStores"

function useTrackOfBestPageData() {
  const { trackOfBest } = useStores()
  return useObserver(() => ({
    isInitialized: trackOfBest.isInitialized,
    isLoading: trackOfBest.isLoading,
    isError: trackOfBest.isError,
    isSuccess: trackOfBest.isSuccess,
    initialize: trackOfBest.initialize,
    trackOfBestList: trackOfBest.trackOfBestList,
    tagList: trackOfBest.tagList,
    selectedTagList: trackOfBest.selectedTagList,
    searchedTagList: trackOfBest.searchedTagList,
    selectedOrderType: trackOfBest.selectedOrderType,
    fetchRequest: trackOfBest.fetchRequest,
    updateSelectedTagList: trackOfBest.updateSelectedTagList,
    setOrderType: trackOfBest.setOrderType,
    setOffset: trackOfBest.setOffset,
    offset: trackOfBest.offset,
    isLast: trackOfBest.isLast,
  }))
}

export default useTrackOfBestPageData
