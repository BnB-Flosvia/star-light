import React from "react"
import { Route } from "react-router-dom"
import CounterPage from "pages/Counter"

export default function RoutePages() {
  return (
    <>
      <Route path="/" exact>
        <CounterPage />
      </Route>
    </>
  )
}
