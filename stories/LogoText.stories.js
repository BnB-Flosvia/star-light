import React from "react"
import LogoText from "src/components/LogoText"

export default {
  title: "LogoText",
  decorators: [
    (storyFn) => (
      <div
        style={{
          width: "100%",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
          padding: "20px",
          background: "#000",
        }}
      >
        {storyFn()}
      </div>
    ),
  ],
}

export function LogoTextExample() {
  return <LogoText />
}
