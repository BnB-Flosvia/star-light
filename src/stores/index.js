import AppStore from "./app"
import MainStore from "./main"
import SignInStore from "./signIn"
import SignUpStore from "./signup"

export default {
  app: new AppStore(),
  main: new MainStore(),
  signIn: new SignInStore(),
  signUp: new SignUpStore(),
}
