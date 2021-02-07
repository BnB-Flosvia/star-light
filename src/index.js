import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"

import configureStore, { history } from "./configureStore"
import App from "./App"

const store = configureStore()

ReactDOM.render(
  <Provider store={store}>
    <App history={history} />
  </Provider>,
  document.getElementById("root")
)
