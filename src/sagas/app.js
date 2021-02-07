import { put, select } from "redux-saga/effects"
import { replace } from "connected-react-router"
import { APP_INITIALIZED } from "actions/types"
import { signIn } from "slices/loginSlice"

export function* initializeApp() {
  try {
    const initialized = yield select((state) => state.app.initialized)
    yield put(signIn)

    if (!initialized) {
      yield put({ type: APP_INITIALIZED })
      const currentPath = yield select((state) => state.router.location.pathname)
      yield put(replace(currentPath))
    } else {
      yield put({ type: APP_INITIALIZED })
    }
  } catch (error) {
    yield put({ type: APP_INITIALIZED })
  }
}

export default {
  initializeApp,
}
