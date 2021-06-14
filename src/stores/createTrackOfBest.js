import { action, observable, toJS, makeObservable, computed, autorun } from "mobx"
import Validator from "validatorjs"
import httpClient from "utils/network/httpClient"

const defaultFormValue = {
  fields: {
    artist: {
      value: "",
      error: null,
      rule: "required",
    },
    songName: {
      value: "",
      error: null,
      rule: "required",
    },
    simplePoint: {
      value: "",
      error: null,
      rule: "required",
    },
    choseReason: {
      value: "",
      error: null,
      rule: "required",
    },
    youtubeUrl: {
      value: "",
      error: null,
      rule: "required",
    },
    tag: {
      value: "",
      error: null,
    },
    coverImageData: {
      value: "",
      error: null,
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
  get isSuccess() {
    return this.status === "SUCCESS"
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
    this.form.fields[field].value = value
  }

  @action
  fetchRequest = async () => {
    try {
      this.status = "LOADING"
      // fetch tag list
      const { data } = await httpClient.get("/post/tag/")
      this.tagList = data
      this.status = "SUCCESS"
    } catch (error) {
      this.status = "ERROR"
    }
  }

  @action
  onSubmit = async () => {
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
      this.form.meta.error = "모든 내용을 올바르게 입력했는지 확인해주세요."
    }

    try {
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
      await httpClient.postWithToken("/post/", {
        artist,
        songName,
        youtubeUrl,
        tag,
        choseReason,
        coverImageData,
        simplePoint,
      })
      this.status = "SUCCESS"
    } catch (error) {
      this.status = "ERROR"
      // TODO: check duplication?
    }
  }
}

export default CreateTrackOfBestStore

const store = new CreateTrackOfBestStore()
autorun(() => store.isError)
autorun(() => store.isSuccess)
autorun(() => store.isLoading)
