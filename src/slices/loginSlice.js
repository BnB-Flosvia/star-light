import { delay, put } from "redux-saga/effects"
import { createModule } from "saga-slice"
import { CLEAR_API_CALL_STATUS } from "actions/types"

export function* signIn({ _email, _password }) {
  yield delay(1000)

  return true
}

const loginSlice = createModule({
  name: "login",
  initialState: {
    isFetching: false,
    isBlocked: false,
    isLoggedIn: false,
    loginFail: false,
    userData: {},
  },
  reducers: {
    login: (state) => {
      state.isFetching = true
    },
    loginSuccess: (state, payload) => {
      state.isFetching = false
      state.isLoggedIn = true
      state.isBlocked = false
      state.loginFail = false
      state.userData = payload
    },
    loginFail: (state) => {
      state.isFetching = false
      state.isLoggedIn = false
      state.isBlocked = false
      state.loginFail = true
    },
  },
  sagas: (actions) => ({
    *[actions.fetch]({ payload }) {
      try {
        const { email, password } = payload

        yield delay(1000)

        yield signIn({ email, password })

        yield put(actions.loginSuccess())
      } catch (error) {
        yield put(actions.loginFail())
      } finally {
        yield put({ type: CLEAR_API_CALL_STATUS })
      }
    },
  }),
})

// Export actions for convenience when importing from other modules
export const { actions } = loginSlice

export default loginSlice
