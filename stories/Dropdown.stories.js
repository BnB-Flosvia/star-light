import React from "react"
import Dropdown from "src/components/Dropdown"
import DropdownContainer from "src/components/DropdownContainer"

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
  return (
    <Dropdown
      dropdownContainerBuilder={() => {
        return (
          <DropdownContainer
            menus={[
              { name: "마이페이지", onClick: () => {} },
              { name: "로그아웃", onClick: () => {} },
            ]}
          />
        )
      }}
    />
  )
}

export function UserSettingButtonDropdownExample() {
  return (
    <Dropdown
      type="userSetting"
      offset={[0, 10]}
      placement="bottom-end"
      dropdownContainerBuilder={() => {
        return (
          <DropdownContainer
            menus={[
              { name: "마이페이지", onClick: () => {} },
              { name: "로그아웃", onClick: () => {} },
            ]}
            nickname="test"
            icon="@"
            isSmallMode={false}
          />
        )
      }}
    />
  )
}
