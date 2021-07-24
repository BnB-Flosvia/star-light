import { makeObservable, observable, action, computed, autorun } from "mobx"
import httpClient from "utils/network/httpClient"
import { isEmpty } from "lodash-es"

const defaultLimit = 12

export default class TrackOfBestStore {
  @observable status = ""

  @observable trackOfBestList = []

  @observable tagList = []

  @observable selectedTagList = []

  @observable searchedTagList = []

  @observable selectedOrderType = null

  @observable offset = 0

  @observable isLast = false

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

  @action fetchRequest = async (offset, tag = []) => {
    try {
      this.status = "LOADING"
      this.selectedTagList = [...this.selectedTagList, ...tag]
      const filter = {
        tag: !isEmpty(this.selectedTagList) ? this.selectedTagList.join(",") : undefined,
        sort: this.selectedOrderType,
        limit: defaultLimit,
        offset: offset != null ? offset : this.offset,
      }

      // fetch trackOfBest list
      const { data: trackOfBestListData } = await httpClient.get("/post/", filter)
      const trackOfBestListResult = trackOfBestListData?.results

      if (trackOfBestListResult.length < defaultLimit) {
        this.isLast = true
      }

      if (this.offset + 1 === offset) {
        this.trackOfBestList = [...this.trackOfBestList, ...trackOfBestListResult]
        this.offset = offset
      } else {
        this.trackOfBestList = trackOfBestListResult
      }

      this.searchedTagList = [...this.selectedTagList]

      // fetch tag list
      if (isEmpty(this.tagList)) {
        const { data: tagListData } = await httpClient.get("/post/tag/")
        this.tagList = tagListData
      }

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
