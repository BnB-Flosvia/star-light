import React from "react"
import Footer from "src/components/Footer"

export default {
  title: "Footer",
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

export function FooterExample() {
  return <Footer />
}
