import { getLocalToken } from "utils/authProvider"
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

  @action checkLocalTokenIsValid = async () => {
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
      await this.checkLocalTokenIsValid()
      const { data } = await httpClient.getWithToken("/user/me/")
      const { username } = data || {}
      this.nickname = username
      this.initialized = true
    } catch (error) {
      this.initialized = false
    }
  }
}
