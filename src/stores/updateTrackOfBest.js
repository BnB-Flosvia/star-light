import { action, observable, toJS, makeObservable, computed, autorun } from "mobx"
import Validator from "validatorjs"
import httpClient from "utils/network/httpClient"

const defaultFormValue = {
  fields: {
    artist: {
      value: null,
      error: null,
      rule: "string",
    },
    songName: {
      value: null,
      error: null,
      rule: "string",
    },
    simplePoint: {
      value: null,
      error: null,
      rule: "string",
    },
    choseReason: {
      value: null,
      error: null,
      rule: "string",
    },
    youtubeUrl: {
      value: null,
      error: null,
      rule: "string",
    },
    tag: {
      value: null,
      error: null,
      rule: "array",
    },
    coverImageData: {
      value: null,
      error: null,
      rule: "string",
    },
  },
  meta: {
    isValid: true,
    error: null,
  },
}

class UpdateTrackOfBestStore {
  @observable
  status = ""

  @observable
  form = defaultFormValue

  @observable
  tagList = []

  @observable
  trackOfBestDetail = null

  // MobX version is after 6, need makeObservalbe call
  constructor() {
    makeObservable(this)
  }

  @computed
  get isLoading() {
    return this.status === "LOADING"
  }

  @computed
  get isFetchError() {
    return this.status === "FETCH_ERROR"
  }

  @computed
  get isFetchSuccess() {
    return this.status === "FETCH_SUCCESS"
  }

  @computed
  get isUpdateError() {
    return this.status === "UPDATE_ERROR"
  }

  @computed
  get isUpdateSuccess() {
    return this.status === "UPDATE_SUCCESS"
  }

  @action initialize = () => {
    this.status = ""
    this.form = defaultFormValue
    this.trackOfBestDetail = null
  }

  getFlattenedValues = (valueKey = "value") => {
    const data = {}
    const form = toJS(this.form).fields

    Object.keys(form).forEach((key) => {
      data[key] = form[key][valueKey]
    })
    return data
  }

  @action
  onFormFieldChange = (field, value) => {
    const newForm = { ...this.form }
    newForm.fields[field].value = value
    this.form = newForm
  }

  @action
  setFormFieldError = (field, error) => {
    const newForm = { ...this.form }
    newForm.fields[field].error = error
    this.form = newForm
  }

  @action
  fetchRequest = async (id) => {
    try {
      this.status = "LOADING"

      // fetch trackOfBest detail data
      const { data } = await httpClient.get(`/post/${id}/`)
      this.trackOfBestDetail = data

      // fetch tag list
      const { data: tagListData } = await httpClient.get("/post/tag/")
      this.tagList = tagListData

      this.status = "FETCH_SUCCESS"
    } catch (error) {
      this.status = "FETCH_ERROR"
    }
  }

  @action
  onSubmit = async (id) => {
    try {
      const fields = Object.keys(toJS(this.form).fields)
      const validation = new Validator(
        this.getFlattenedValues("value"),
        this.getFlattenedValues("rule")
      )

      this.form.meta.isValid = validation.passes()
      fields.forEach((field) => {
        if (validation.errors.first(field).includes("required")) {
          this.form.fields[field].error = "필수로 입력해야하는 필드입니다."
        } else {
          this.form.fields[field].error = ""
        }
      })

      // Check all form fields validation result
      if (!this.form.meta.isValid) {
        const newForm = { ...this.form }
        newForm.meta.error = "모든 내용을 올바르게 입력했는지 확인해주세요."
        this.form = newForm
        return
      }

      this.status = "LOADING"
      const {
        artist,
        songName,
        youtubeUrl,
        coverImageData,
        tag,
        choseReason,
        simplePoint,
      } = this.form.fields
      const isBase64Image = coverImageData.value.includes("data:image/jpeg;base64")
      await httpClient.putWithToken(`/post/${id}`, {
        artist: artist.value,
        songName: songName.value,
        youtubeUrl: youtubeUrl.value,
        tag: tag?.value ?? [],
        choseReason: choseReason.value,
        coverImageData: isBase64Image ? coverImageData.value : undefined,
        simplePoint: simplePoint.value,
      })
      this.status = "UPDATE_SUCCESS"
    } catch (error) {
      this.status = "UPDATE_ERROR"
      console.log(error)
      // TODO: check duplication?
    }
  }
}

export default UpdateTrackOfBestStore

const store = new UpdateTrackOfBestStore()
autorun(() => store.isFetchError)
autorun(() => store.isFetchSuccess)
autorun(() => store.isUpdateError)
autorun(() => store.isUpdateSuccess)
autorun(() => store.isLoading)
