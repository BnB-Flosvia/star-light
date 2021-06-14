import { makeObservable, observable, action, computed, autorun } from "mobx"
import httpClient from "utils/network/httpClient"
import { isEmpty } from "lodash-es"

export default class TrackOfBestStore {
  @observable status = ""

  @observable trackOfBestList = []

  @observable tagList = []

  @observable selectedTagList = []

  @observable selectedOrderType = null

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
    this.trackOfBestList = []
    this.tagList = []
    this.selectedTagList = []
    this.selectedOrderType = null
  }

  @action fetchRequest = async () => {
    try {
      this.status = "LOADING"
      const { data: trackOfBestListData } = await httpClient.get("/post/")
      const { data: tagListData } = await httpClient.get("/post/tag/")
      this.trackOfBestList = trackOfBestListData
      this.tagList = tagListData
      this.status = "SUCCESS"
    } catch (error) {
      this.status = "ERROR"
    }
  }

  @action setOrderType = (id) => {
    this.selectedOrderType = id
  }

  @action updateSelectedTagList = (newList) => {
    this.selectedTagList = [...newList]
  }

  @action fetchFilteredListRequest = async () => {
    try {
      this.status = "LOADING"
      const filter = {
        tags: !isEmpty(this.selectedTagList) ? this.selectedTagList.join(",") : undefined,
        order: this.selectedOrderType,
      }
      const { data: trackOfBestListData } = await httpClient.get("/post/", filter)
      this.trackOfBestList = trackOfBestListData
      this.status = "SUCCESS"
    } catch (error) {
      console.log(error)
      this.status = "ERROR"
    }
  }
}

const store = new TrackOfBestStore()
autorun(() => store.isError)
autorun(() => store.isSuccess)
autorun(() => store.isLoading)
