import React from "react"
import Header from "src/components/Header"

export default {
  title: "Header",
  decorators: [
    (storyFn) => (
      <div
        style={{
          width: "100%",
          padding: "20px",
        }}
      >
        {storyFn()}
      </div>
    ),
  ],
}

export function HeaderExample() {
  return <Header />
}
