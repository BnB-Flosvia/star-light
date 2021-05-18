import CounterStore from "./counter"
import SignInStore from "./signIn"

export default {
  counter: new CounterStore(),
  signIn: new SignInStore(),
}
