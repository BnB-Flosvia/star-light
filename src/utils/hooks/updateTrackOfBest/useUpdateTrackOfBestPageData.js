import { useObserver } from "mobx-react"
import useStores from "utils/hooks/useStores"

function useUpdateTrackOfBestPageData() {
  const { updateTrackOfBest } = useStores()
  return useObserver(() => ({
    isLoading: updateTrackOfBest.isLoading,
    isFetchError: updateTrackOfBest.isFetchError,
    isFetchSuccess: updateTrackOfBest.isFetchSuccess,
    isUpdateError: updateTrackOfBest.isUpdateError,
    isUpdateSuccess: updateTrackOfBest.isUpdateSuccess,
    form: updateTrackOfBest.form,
    onFormFieldChange: updateTrackOfBest.onFormFieldChange,
    setFormFieldError: updateTrackOfBest.setFormFieldError,
    onSubmit: updateTrackOfBest.onSubmit,
    initialize: updateTrackOfBest.initialize,
    fetchRequest: updateTrackOfBest.fetchRequest,
    tagList: updateTrackOfBest.tagList,
    trackOfBestDetail: updateTrackOfBest.trackOfBestDetail,
    imageFile: updateTrackOfBest.imageFile,
    setImageFile: updateTrackOfBest.setImageFile,
    enableSubmitButton: updateTrackOfBest.enableSubmitButton,
  }))
}

export default useUpdateTrackOfBestPageData
