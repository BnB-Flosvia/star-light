import { makeObservable, observable, action, computed, autorun } from "mobx"
import httpClient from "utils/network/httpClient"
import { isEmpty } from "lodash-es"

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
  get isFetchError() {
    return this.status === "FETCH_ERROR"
  }

  @computed
  get isFetchSuccess() {
    return this.status === "FETCH_SUCCESS"
  }

  @computed
  get isDeleteError() {
    return this.status === "DELETE_ERROR"
  }

  @computed
  get isDeleteSuccess() {
    return this.status === "DELETE_SUCCESS"
  }

  @action initialize = () => {
    this.status = ""
    this.trackOfBestDetail = null
  }

  @action fetchRequest = async (id) => {
    try {
      this.status = "LOADING"

      // fetch trackOfBest detail data
      const accessToken = localStorage.getItem("accessToken")
      if (accessToken == null || isEmpty(accessToken)) {
        const { data } = await httpClient.get(`/post/${id}/`)
        this.trackOfBestDetail = data
      } else {
        const { data } = await httpClient.getWithToken(`/post/${id}/`)
        this.trackOfBestDetail = data
      }

      this.status = "FETCH_SUCCESS"
    } catch (error) {
      this.status = "FETCH_ERROR"
    }
  }

  @action deleteRequest = async (id) => {
    try {
      this.status = "LOADING"

      // fetch trackOfBest detail data
      await httpClient.deleteWithToken(`/post/${id}/`)

      this.status = "DELETE_SUCCESS"
    } catch (error) {
      this.status = "DELETE_ERROR"
    }
  }
}

const store = new TrackOfBestDetailStore()
autorun(() => store.isFetchError)
autorun(() => store.isFetchSuccess)
autorun(() => store.isDeleteError)
autorun(() => store.isDeleteSuccess)
autorun(() => store.isLoading)
