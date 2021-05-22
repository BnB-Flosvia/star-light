import { makeObservable, observable, action } from "mobx"
import httpClient from "utils/network/httpClient"

export default class MainStore {
  @observable status = ""

  // MobX version is after 6, need makeObservalbe call
  constructor() {
    makeObservable(this)
  }

  @action fetchRequest = async () => {
    try {
      this.status = "LOADING"
      const response = await httpClient.get("/users")
      console.log(response.data)
    } catch (error) {
      this.status = "ERROR"
      console.log("error!")
    }
  }
}
