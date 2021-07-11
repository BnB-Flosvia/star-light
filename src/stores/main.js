import { makeObservable, observable, action, computed, autorun } from "mobx"
import httpClient from "utils/network/httpClient"

const defaultOffset = 0
const defaultLimit = 4

export default class MainStore {
  @observable status = ""

  @observable trackOfBestList = []

  @observable trackOfBestTotalCount = 0

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

  @action initialize = () => {
    this.status = ""
    this.trackOfBestList = []
  }

  @action fetchRequest = async () => {
    try {
      this.status = "LOADING"
      const filter = {
        limit: defaultLimit,
        offset: defaultOffset,
      }
      const { data = {} } = await httpClient.get("/post/", filter)
      this.trackOfBestList = data?.results
      this.trackOfBestTotalCount = data?.count
      this.status = "FETCH_SUCCESS"
    } catch (error) {
      this.status = "FETCH_ERROR"
      console.log(error)
    }
  }
}

const store = new MainStore()
autorun(() => store.isFetchError)
autorun(() => store.isFetchSuccess)
autorun(() => store.isLoading)
