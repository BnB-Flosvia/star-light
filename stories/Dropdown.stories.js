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

export function ArrowButtonDropdownExample() {
  return <Dropdown menus={["마이페이지", "로그아웃"]} />
}

export function UserSettingButtonDropdownExample() {
  return (
    <Dropdown
      buttonType="userSetting"
      menus={["마이페이지", "로그아웃"]}
      offset={[0, 10]}
      placement="bottom"
    />
  )
}
