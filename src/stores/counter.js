import { makeObservable, observable, action } from "mobx"

export default class CounterStore {
  @observable number = 1

  // MobX version is after 6, need makeObservalbe call
  constructor() {
    makeObservable(this)
  }

  @action increase = () => {
    this.number += 1
  }

  @action decrease = () => {
    this.number -= 1
  }
}
