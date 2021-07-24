/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useCallback } from "react"
import styled from "styled-components"
import { usePopper } from "react-popper"
import { UserSettingButton } from "components/Buttons"
import { DropdownIconButton } from "components/IconButtons"
import {
  backgroundColor2,
  selectedBackgroundColor,
  primaryTextColor,
} from "styles/colors"
import { body2Normal, body3Normal } from "styles/textTheme"
import { useClickOutside } from "utils/hooks/useClickOutside"
import { useMediaQuery } from "react-responsive"

const Container = styled.div`
  position: relative;
  width: fit-content;
  z-index: 1;
`

const DropdownContainer = styled.div`
  display: "flex";
  flex-direction: column;
  background-color: ${backgroundColor2};
  border-radius: 4px;
  box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.25);
  border: 1px solid ${primaryTextColor};
  & > :first-child {
    border-radius: 4px 4px 0 0;
  }
  & > :last-child {
    border-radius: 0 0 4px 4px;
  }
  & > :not(:last-child) {
    border-bottom: 1px solid ${primaryTextColor};
  }
  z-index: 1;
`

const DropdownItem = styled.div`
  display: flex;
  white-space: nowrap;
  padding: 12px 16px;
  box-sizing: border-box;
  align-items: center;
  justify-content: center;
  text-align: center;
  background-color: ${backgroundColor2};
  ${(props) => (props.isSmall ? body3Normal : body2Normal)};
  &:hover {
    background-color: ${selectedBackgroundColor};
  }
`

function DropdownButton({ buttonType, ...props }) {
  if (buttonType === "userSetting") {
    return <UserSettingButton {...props} />
  }
  return <DropdownIconButton {...props} />
}

export default function Dropdown({
  className,
  buildCustomButton,
  buttonType,
  menus,
  placement = "bottom-end",
  offset = [0, 0],
}) {
  const isSmallMode = useMediaQuery({
    query: "(max-width: 768px)",
  })

  const [isOpen, setIsOpen] = useState(false)
  const [referenceRef, setReferenceRef] = useState(null)
  const [popperRef, setPopperRef] = useState(null)

  const [clickOutsideRef] = useClickOutside(() => {
    setIsOpen(false)
  })

  const { styles, attributes } = usePopper(referenceRef, popperRef, {
    placement,
    modifiers: [
      {
        name: "offset",
        enabled: true,
        options: {
          offset,
        },
      },
    ],
  })

  const onButtonClick = useCallback(() => {
    setIsOpen((_isOpen) => !_isOpen)
  }, [])

  return (
    <Container ref={clickOutsideRef} className={className}>
      <div ref={setReferenceRef}>
        {buildCustomButton != null ? (
          buildCustomButton({ isOpen, onClick: () => onButtonClick() })
        ) : (
          <DropdownButton
            buttonType={buttonType}
            isOpen={isOpen}
            onClick={() => onButtonClick()}
          />
        )}
      </div>
      {isOpen && (
        <div ref={setPopperRef} style={styles.popper} {...attributes.popper}>
          <DropdownContainer>
            {menus.map((menu) => {
              const { onClick, name } = menu
              return (
                <DropdownItem isSmall={isSmallMode} onClick={() => onClick()}>
                  {name}
                </DropdownItem>
              )
            })}
          </DropdownContainer>
        </div>
      )}
    </Container>
  )
}
