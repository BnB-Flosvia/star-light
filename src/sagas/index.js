import { all, call } from "redux-saga/effects"
import slices from "slices"
import { initializeApp } from "sagas/app"

export default function* rootSaga() {
  yield all([
    call(initializeApp),
    ...Object.values(slices)
      .map((slice) => slice.sagas)
      .reduce((result, saga) => result.concat(saga), [])
      .map((saga) => call(saga)),
  ])
}
