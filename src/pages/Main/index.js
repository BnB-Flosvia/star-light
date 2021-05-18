import React from "react"
import { observer, inject } from "mobx-react"
import { Link } from "react-router-dom"

// Sample page
function CounterPage({ number, increase, decrease }) {
  return (
    <div>
      <h1>{number}</h1>
      <button
        type="button"
        onClick={() => {
          increase()
        }}
      >
        +1
      </button>
      <button type="button" onClick={decrease}>
        -1
      </button>
      <Link to="/signin">로그인</Link>
    </div>
  )
}

export default inject(({ counter }) => ({
  number: counter.number,
  increase: counter.increase,
  decrease: counter.decrease,
}))(observer(CounterPage))
