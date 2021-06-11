import { makeObservable, observable, action, computed, autorun } from "mobx"
import httpClient from "utils/network/httpClient"
import { isEmpty } from "lodash-es"

const defaultLimit = 10

export default class TrackOfBestStore {
  @observable status = ""

  @observable trackOfBestList = []

  @observable tagList = []

  @observable selectedTagList = []

  @observable selectedOrderType = null

  @observable offset = 0

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
    this.offset = 0
  }

  @action setOrderType = (id) => {
    this.selectedOrderType = id
  }

  @action updateSelectedTagList = (newList) => {
    this.selectedTagList = [...newList]
  }

  @action setOffset = (newOffset) => {
    this.offset = newOffset
  }

  @action fetchRequest = async (offset) => {
    try {
      this.status = "LOADING"
      const filter = {
        tags: !isEmpty(this.selectedTagList) ? this.selectedTagList.join(",") : undefined,
        sort: this.selectedOrderType,
        limit: defaultLimit,
        offset: offset != null ? offset : this.offset,
      }

      // fetch trackOfBest list
      const { data: trackOfBestListData } = await httpClient.get("/post/", filter)
      // fetch tag list
      const { data: tagListData } = await httpClient.get("/post/tag/")

      this.trackOfBestList = [...this.trackOfBestList, ...trackOfBestListData]
      this.tagList = tagListData
      this.status = "SUCCESS"
    } catch (error) {
      this.status = "ERROR"
    }
  }
}

const store = new TrackOfBestStore()
autorun(() => store.isError)
autorun(() => store.isSuccess)
autorun(() => store.isLoading)
