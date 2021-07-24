/* eslint-disable react/jsx-props-no-spreading */
import "react-perfect-scrollbar/dist/css/styles.css"
import "antd/dist/antd.css"

import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "mobx-react"
import RootStore from "stores"
import App from "./App"
import "./configureMock"

const rootStore = new RootStore()

ReactDOM.render(
  <>
    <Provider {...rootStore}>
      <App />
    </Provider>
  </>,
  document.getElementById("root")
)
