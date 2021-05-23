import MainStore from "./main"
import SignInStore from "./signIn"
import SignUpStore from "./signup"

export default {
  main: new MainStore(),
  signIn: new SignInStore(),
  signUp: new SignUpStore(),
}
