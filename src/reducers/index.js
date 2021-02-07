import { combineReducers } from "redux"
import { connectRouter } from "connected-react-router"
import { fromPairs } from "lodash-es"
import slices from "slices"
import app from "reducers/app"

const createRootReducer = (history) =>
  combineReducers({
    app,
    router: connectRouter(history),
    ...fromPairs(Object.entries(slices).map(([name, slice]) => [name, slice.reducer])),
  })

export default createRootReducer
