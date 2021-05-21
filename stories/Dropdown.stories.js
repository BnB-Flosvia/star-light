import React from "react"
import Dropdown from "src/components/Dropdown"

export default {
  title: "Dropdown",
  decorators: [
    (storyFn) => (
      <div
        style={{
          width: "400px",
          padding: "20px",
          background: "#ededed",
        }}
      >
        {storyFn()}
      </div>
    ),
  ],
}

export function DropdownExample() {
  return <Dropdown menus={["마이페이지", "로그아웃"]} />
}
