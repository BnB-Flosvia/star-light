/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useCallback } from "react"
import styled from "styled-components"
import { usePopper } from "react-popper"
// import { UserSettingButton } from "components/Buttons"
import { DropdownIconButton } from "components/IconButtons"
import {
  backgroundColor2,
  selectedBackgroundColor,
  primaryTextColor,
} from "styles/colors"
import { label1Normal } from "styles/textTheme"

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
`

const DropdownItem = styled.div`
  display: flex;
  width: 80px;
  height: 20px;
  box-sizing: border-box;
  align-items: center;
  justify-content: center;
  text-align: center;
  background-color: ${backgroundColor2};
  ${label1Normal}
  &:hover {
    background-color: ${selectedBackgroundColor};
  }
`

export default function Dropdown({
  /* buttonType, */ menus,
  placement = "bottom",
  // offset,
}) {
  const [isOpen, setIsOpen] = useState(false)

  const [referenceRef, setReferenceRef] = useState(null)
  const [popperRef, setPopperRef] = useState(null)

  const { styles, attributes } = usePopper(referenceRef, popperRef, {
    placement,
    modifiers: [
      {
        name: "offset",
        enabled: true,
        options: {
          offset: [-40, 10],
        },
      },
    ],
  })

  const onButtonClick = useCallback(() => {
    setIsOpen((_isOpen) => !_isOpen)
  }, [])
  /*
  const DropdownButton = () => {
    if (buttonType === "userSetting") {
      return <UserSettingButton onClick={() => onButtonClick()} ref={setReferenceRef} />
    }
    return (
      <DropdownIconButton
        isOpen={isOpen}
        onClick={() => onButtonClick()}
        ref={setReferenceRef}
      />
    )
  }
  */

  console.log(styles.popper)
  console.log(attributes.popper)

  return (
    <div>
      <DropdownIconButton
        isOpen={isOpen}
        onClick={() => onButtonClick()}
        ref={setReferenceRef}
      />
      {isOpen && (
        <div ref={setPopperRef} style={styles.popper} {...attributes.popper}>
          <DropdownContainer>
            {menus.map((menu) => (
              <DropdownItem>{menu}</DropdownItem>
            ))}
          </DropdownContainer>
        </div>
      )}
    </div>
  )
}
