import { makeObservable, observable, action } from "mobx"
import httpClient from "utils/network/httpClient"

export default class CounterStore {
  @observable number = 1

  // MobX version is after 6, need makeObservalbe call
  constructor() {
    makeObservable(this)
  }

  @action increase = async () => {
    this.number += 1
    const response = await httpClient.get("/todos/1")
    console.log(response.data)
  }

  @action decrease = () => {
    this.number -= 1
  }
}
