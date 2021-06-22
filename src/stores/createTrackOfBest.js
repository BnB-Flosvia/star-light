import { action, observable, toJS, makeObservable, computed, autorun } from "mobx"
import Validator from "validatorjs"
import httpClient from "utils/network/httpClient"

const defaultFormValue = {
  fields: {
    artist: {
      value: null,
      error: null,
      rule: "required",
    },
    songName: {
      value: null,
      error: null,
      rule: "required",
    },
    simplePoint: {
      value: null,
      error: null,
      rule: "required",
    },
    choseReason: {
      value: null,
      error: null,
      rule: "required",
    },
    youtubeUrl: {
      value: null,
      error: null,
      rule: "required",
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

class CreateTrackOfBestStore {
  @observable
  status = ""

  @observable
  form = defaultFormValue

  @observable
  tagList = []

  // MobX version is after 6, need makeObservalbe call
  constructor() {
    makeObservable(this)
  }

  @computed
  get isLoading() {
    return this.status === "LOADING"
  }

  @computed
  get isError() {
    return this.status === "ERROR"
  }

  @computed
  get isFetchSuccess() {
    return this.status === "FETCH_SUCCESS"
  }

  @computed
  get isCreateSuccess() {
    return this.status === "CREATE_SUCCESS"
  }

  @action initialize = () => {
    this.status = ""
    this.form = defaultFormValue
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
  fetchRequest = async () => {
    try {
      this.status = "LOADING"
      // fetch tag list
      const { data } = await httpClient.get("/post/tag/")
      this.tagList = data
      this.status = "FETCH_SUCCESS"
    } catch (error) {
      this.status = "ERROR"
    }
  }

  @action
  onSubmit = async () => {
    try {
      const fields = Object.keys(toJS(this.form).fields)
      const validation = new Validator(
        this.getFlattenedValues("value"),
        this.getFlattenedValues("rule")
      )

      this.form.meta.isValid = validation.passes()
      fields.forEach((field) => {
        this.form.fields[field].error = validation.errors.first(field)
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
      await httpClient.postWithToken("/post/", {
        artist: artist.value,
        songName: songName.value,
        youtubeUrl: youtubeUrl.value,
        tag: tag.value,
        choseReason: choseReason.value,
        coverImageData: isBase64Image ? coverImageData.value : null,
        simplePoint: simplePoint.value,
      })
      this.status = "CREATE_SUCCESS"
    } catch (error) {
      this.status = "ERROR"
      console.log(error)
      // TODO: check duplication?
    }
  }
}

export default CreateTrackOfBestStore

const store = new CreateTrackOfBestStore()
autorun(() => store.isError)
autorun(() => store.isFetchSuccess)
autorun(() => store.isCreateSuccess)
autorun(() => store.isLoading)
