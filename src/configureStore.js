import { createStore, applyMiddleware, compose } from "redux"
import { createBrowserHistory } from "history"
import createSagaMiddleware from "redux-saga"
import { composeWithDevTools } from "redux-devtools-extension"
import { routerMiddleware } from "connected-react-router"

import rootSaga from "sagas"
import createRootReducer from "reducers"

export const history = createBrowserHistory()
const sagaMiddleware = createSagaMiddleware()

export default function configureStore(...additionalEnhancer) {
  let enhancer

  switch (process.env.REACT_APP_ENVIRONMENT) {
    case "test":
    case "staging":
    case "development":
      enhancer = composeWithDevTools(
        applyMiddleware(routerMiddleware(history), sagaMiddleware),
        ...additionalEnhancer
      )
      break
    case "production":
    default:
      enhancer = compose(
        applyMiddleware(routerMiddleware(history), sagaMiddleware),
        ...additionalEnhancer
      )
      break
  }

  const store = createStore(createRootReducer(history), enhancer)

  sagaMiddleware.run(rootSaga)

  return store
}
