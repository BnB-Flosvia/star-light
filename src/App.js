import React from "react"
import { ConnectedRouter } from "connected-react-router"
import RoutePages from "./RoutePages"

function App({ history }) {
  return (
    <ConnectedRouter history={history}>
      <RoutePages />
    </ConnectedRouter>
  )
}

export default App
