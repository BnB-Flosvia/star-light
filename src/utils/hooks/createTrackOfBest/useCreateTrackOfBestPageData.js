import { useObserver } from "mobx-react"
import useStores from "utils/hooks/useStores"

function useCreateTrackOfBestPageData() {
  const { createTrackOfBest } = useStores()
  return useObserver(() => ({
    isLoading: createTrackOfBest.isLoading,
    isFetchError: createTrackOfBest.isFetchError,
    isFetchSuccess: createTrackOfBest.isFetchSuccess,
    isCreateError: createTrackOfBest.isCreateError,
    isCreateSuccess: createTrackOfBest.isCreateSuccess,
    form: createTrackOfBest.form,
    onFormFieldChange: createTrackOfBest.onFormFieldChange,
    setFormFieldError: createTrackOfBest.setFormFieldError,
    onSubmit: createTrackOfBest.onSubmit,
    initialize: createTrackOfBest.initialize,
    fetchRequest: createTrackOfBest.fetchRequest,
    tagList: createTrackOfBest.tagList,
    imageFile: createTrackOfBest.imageFile,
    setImageFile: createTrackOfBest.setImageFile,
  }))
}

export default useCreateTrackOfBestPageData
