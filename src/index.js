/* eslint-disable react/jsx-props-no-spreading */
import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "mobx-react"
import store from "stores"
import App from "./App"

ReactDOM.render(
  <Provider {...store}>
    <App />
  </Provider>,
  document.getElementById("root")
)
