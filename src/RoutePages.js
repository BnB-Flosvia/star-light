import React from "react"
import { Route } from "react-router-dom"

export default function RoutePages() {
  return (
    <>
      <Route path="/" exact>
        <div>home</div>
      </Route>
    </>
  )
}
