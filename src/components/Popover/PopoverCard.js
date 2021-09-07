import React from "react"
import styled from "styled-components"
import { dividerColor, secondaryTextColor, selectedBackgroundColor } from "styles/colors"
import { body2Normal, body3Normal } from "styles/textTheme"
import { CaretUpOutlined } from "@ant-design/icons"

const Container = styled.div`
  display: flex;
  z-index: 1;
  width: ${(props) => (props.isUserMenu ? "150px" : "fit-content")};
  flex-direction: column;
  background-color: ${(props) =>
    props.backgroundColor ? props.backgroundColor : dividerColor};
  border: 0.5px solid
    ${(props) => (props.borderColor ? props.borderColor : secondaryTextColor)};
  border-radius: 4px;
  box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.25);
  ${(props) => (props.isSmall ? body3Normal : body2Normal)}
  & > :first-child {
    border-radius: 4px 4px 0 0;
  }
  & > :last-child {
    border-radius: 0 0 4px 4px;
  }
`

const UserInfoSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 0.5px solid ${secondaryTextColor};
  .nicknameBox {
    padding: 16px 0;
    .nickname {
      padding-left: 2px;
      font-weight: bold;
    }
  }
`

const DropdownItem = styled.div`
  display: flex;
  white-space: nowrap;
  padding: 12px 16px;
  box-sizing: border-box;
  align-items: center;
  justify-content: center;
  text-align: center;
  background-color: ${(props) =>
    props.backgroundColor ? props.backgroundColor : dividerColor};
  &:hover {
    background-color: ${selectedBackgroundColor};
  }
`

// 버튼을 클릭했을 때 나타나는 Card
export default function PopoverCard({
  menus,
  backgroundColor = dividerColor,
  borderColor = secondaryTextColor,
  placement = "right",
  isSmallView,
  icon,
  nickname,
}) {
  const isUserMenu = nickname != null

  let arrowPlacementStyle = {}
  switch (placement) {
    case "right":
      arrowPlacementStyle = { right: 10 }
      break
    case "left":
      arrowPlacementStyle = { left: 10 }
      break
    default:
      break
  }

  return (
    <div className="dropdown-container" style={{ position: "relative" }}>
      <Container
        isUserMenu={isUserMenu}
        isSmall={isSmallView}
        backgroundColor={backgroundColor}
        borderColor={borderColor}
      >
        {isUserMenu && (
          <UserInfoSection>
            <span className="nicknameBox">
              {icon}
              <span className="nickname">{nickname}</span>님
            </span>
          </UserInfoSection>
        )}
        {menus.map((menu) => {
          const { onClick, name } = menu
          return (
            <DropdownItem onClick={() => onClick()} backgroundColor={backgroundColor}>
              {name}
            </DropdownItem>
          )
        })}
      </Container>
      <CaretUpOutlined
        style={{
          position: "absolute",
          top: 0,
          marginTop: -12,
          fontSize: 20,
          color: backgroundColor,
          ...arrowPlacementStyle,
        }}
      />
    </div>
  )
}
