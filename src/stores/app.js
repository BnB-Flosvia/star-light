import { getLocalToken } from "authProvider"
import { makeObservable, observable, action } from "mobx"
import httpClient from "utils/network/httpClient"

export default class AppStore {
  @observable initialized = false

  @observable nickname = null

  // MobX version is after 6, need makeObservalbe call
  constructor() {
    makeObservable(this)
    this.fetchRequest()
  }

  @action checkLocalToken = async () => {
    try {
      await getLocalToken()
    } catch (error) {
      this.initialized = false
    }
  }

  @action setNickname = (nickname) => {
    this.nickname = nickname
  }

  @action fetchRequest = async () => {
    try {
      await this.checkLocalToken()
      const { data } = await httpClient.getWithToken("/user/me/")
      const { nickname } = data || {}
      this.nickname = nickname
      this.initialized = true
    } catch (error) {
      this.initialized = false
    }
  }
}
