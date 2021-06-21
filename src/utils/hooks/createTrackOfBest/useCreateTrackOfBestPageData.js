import { useObserver } from "mobx-react"
import useStores from "utils/hooks/useStores"

function useCreateTrackOfBestPageData() {
  const { createTrackOfBest } = useStores()
  return useObserver(() => ({
    isLoading: createTrackOfBest.isLoading,
    isError: createTrackOfBest.isError,
    isFetchSuccess: createTrackOfBest.isFetchSuccess,
    isCreateSuccess: createTrackOfBest.isCreateSuccess,
    form: createTrackOfBest.form,
    onFormFieldChange: createTrackOfBest.onFormFieldChange,
    setFormFieldError: createTrackOfBest.setFormFieldError,
    onSubmit: createTrackOfBest.onSubmit,
    initialize: createTrackOfBest.initialize,
    fetchRequest: createTrackOfBest.fetchRequest,
    tagList: createTrackOfBest.tagList,
  }))
}

export default useCreateTrackOfBestPageData
