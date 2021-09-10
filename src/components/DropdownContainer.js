import { CaretUpOutlined } from "@ant-design/icons"
import React from "react"
import styled from "styled-components"
import { dividerColor, secondaryTextColor, selectedBackgroundColor } from "styles/colors"
import { body2Normal, body3Normal } from "styles/textTheme"

const Container = styled.div`
  display: flex;
  width: ${(props) => (props.isUserMenu ? "150px" : "fit-content")};
  flex-direction: column;
  background-color: ${(props) =>
    props.backgroundColor ? props.backgroundColor : dividerColor};
  border-radius: 4px;
  box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.25);
  border: 0.5px solid
    ${(props) => (props.borderColor ? props.borderColor : secondaryTextColor)};
  & > :first-child {
    border-radius: 4px 4px 0 0;
  }
  & > :last-child {
    border-radius: 0 0 4px 4px;
  }
  z-index: 1;
  ${(props) => (props.isSmall ? body3Normal : body2Normal)}
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

export default function DropdownContainer({
  icon,
  nickname,
  menus,
  isSmall,
  backgroundColor = dividerColor,
  borderColor = secondaryTextColor,
  position = "right",
}) {
  const isUserMenu = nickname != null

  let arrowPositionStyle = {}
  switch (position) {
    case "right":
      arrowPositionStyle = { right: 10 }
      break
    case "left":
      arrowPositionStyle = { left: 10 }
      break
    default:
      break
  }

  return (
    <div className="dropdown-container" style={{ position: "relative" }}>
      <Container
        isUserMenu={isUserMenu}
        isSmall={isSmall}
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
          ...arrowPositionStyle,
        }}
      />
    </div>
  )
}
