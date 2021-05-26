/* eslint-disable react/jsx-props-no-spreading */
import "react-perfect-scrollbar/dist/css/styles.css"
import "antd/dist/antd.css"

import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "mobx-react"
import GlobalFontStyle from "styles/fonts/globalStyle"
import store from "stores"
import App from "./App"
import "./configureMock"

ReactDOM.render(
  <>
    <GlobalFontStyle />
    <Provider {...store}>
      <App />
    </Provider>
  </>,
  document.getElementById("root")
)
