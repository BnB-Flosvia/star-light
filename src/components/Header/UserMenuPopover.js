import React from "react"
import { logout } from "utils/authProvider"
import useAppData from "utils/hooks/useAppData"
import { UserSettingButton } from "components/Buttons"
import Popover from "components/Popover"
import PopoverCard from "components/Popover/PopoverCard"

export default function UserMenuPopover({ history, isSmallView }) {
  const userMenu = [
    {
      name: "마이페이지",
      onClick: () => {
        history.push("/mypage")
      },
    },
    {
      name: "로그아웃",
      onClick: () => {
        logout()
        history.push("/main")
      },
    },
  ]
  // TODO: check user type => set correct icon
  // This is default user icon
  const icon = "🦄"
  const { nickname } = useAppData()

  return (
    <Popover
      className="userMenu"
      buildCustomButton={({ onClick }) => {
        return <UserSettingButton onClick={onClick} />
      }}
      offset={[-18, 10]}
      dropdownContainerBuilder={() => {
        return (
          <PopoverCard
            icon={icon}
            nickname={nickname}
            menus={userMenu}
            isSmallView={isSmallView}
          />
        )
      }}
    />
  )
}
