import { makeObservable, observable, action, computed, autorun } from "mobx"
import httpClient from "utils/network/httpClient"

export default class TrackOfBestDetailStore {
  @observable status = ""

  @observable trackOfBestDetail = null

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
    this.trackOfBestDetail = null
  }

  @action fetchRequest = async (id) => {
    try {
      this.status = "LOADING"

      // fetch trackOfBest detail data
      const { data } = await httpClient.get(`/post/${id}/`)

      this.trackOfBestDetail = data
      this.status = "SUCCESS"
    } catch (error) {
      this.status = "ERROR"
    }
  }
}

const store = new TrackOfBestDetailStore()
autorun(() => store.isError)
autorun(() => store.isSuccess)
autorun(() => store.isLoading)
