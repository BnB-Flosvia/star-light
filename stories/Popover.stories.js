import React from "react"
import { disableColor } from "src/styles/colors"
import { UserSettingButton } from "src/components/Buttons"
import { MoreVertIconButton } from "src/components/IconButtons"
import Popover from "src/components/Popover"
import PopoverCard from "src/components/Popover/PopoverCard"

export default {
  title: "Popover",
  decorators: [
    (storyFn) => (
      <div
        style={{
          display: "flex",
          position: "relative",
          width: "100%",
          height: "100%",
          alignItems: "center",
          justifyContent: "center",
          padding: "20px",
          background: "#ededed",
        }}
      >
        {storyFn()}
      </div>
    ),
  ],
}

const menus = [
  {
    name: "menu1",
    onClick: () => {
      alert("menu1!")
    },
  },
  {
    name: "menu2",
    onClick: () => {
      alert("menu2!")
    },
  },
]

export function PopoverExample() {
  return (
    <Popover
      menus={menus}
      dropdownContainerBuilder={() => {
        return <PopoverCard menus={menus} />
      }}
    />
  )
}

export function PopoverSmallViewExample() {
  return (
    <Popover
      menus={menus}
      dropdownContainerBuilder={() => {
        return <PopoverCard menus={menus} isSmallView />
      }}
    />
  )
}

export function MoreVertPopoverExample() {
  const moreButtonMenu = [
    {
      name: "수정하기",
      onClick: () => {
        alert("수정하기!")
      },
    },
    {
      name: "삭제하기",
      onClick: () => {
        alert("삭제하기!")
      },
    },
  ]

  return (
    <Popover
      buildCustomButton={({ onClick }) => {
        return <MoreVertIconButton className="moreIcon" onClick={onClick} />
      }}
      dropdownContainerBuilder={() => {
        return (
          <PopoverCard
            menus={moreButtonMenu}
            placement="left"
            backgroundColor={disableColor}
            borderColor={disableColor}
          />
        )
      }}
    />
  )
}

export function UserMenuPopoverExample() {
  const userMenu = [
    {
      name: "마이페이지",
      onClick: () => {
        alert("마이페이지!")
      },
    },
    {
      name: "로그아웃",
      onClick: () => {
        alert("로그아웃!")
      },
    },
  ]

  return (
    <Popover
      className="userMenu"
      buildCustomButton={({ onClick }) => {
        return <UserSettingButton onClick={onClick} />
      }}
      offset={[0, 0]}
      dropdownContainerBuilder={() => {
        return <PopoverCard icon="🦄" nickname="대충닉네임" menus={userMenu} />
      }}
    />
  )
}
