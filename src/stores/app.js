import { getLocalToken } from "authProvider"
import { makeObservable, observable, action } from "mobx"

export default class AppStore {
  @observable initialized = false

  // MobX version is after 6, need makeObservalbe call
  constructor() {
    makeObservable(this)
    this.checkLocalToken()
  }

  @action checkLocalToken = async () => {
    try {
      const token = await getLocalToken()
      if (token != null) {
        this.initialized = true
      }
    } catch (error) {
      this.initialized = false
    }
  }
}
