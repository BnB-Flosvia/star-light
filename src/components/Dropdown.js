/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useCallback } from "react"
import styled from "styled-components"
import { usePopper } from "react-popper"
import { UserSettingButton } from "components/Buttons"
import { DropdownIconButton } from "components/IconButtons"
import { useClickOutside } from "utils/hooks/useClickOutside"

const Container = styled.div`
  position: relative;
  width: fit-content;
  z-index: 1;
`

function DropdownButton({ type, ...props }) {
  if (type === "userSetting") {
    return <UserSettingButton {...props} />
  }
  return <DropdownIconButton {...props} />
}

export default function Dropdown({
  className,
  buildCustomButton,
  type,
  placement = "bottom-end",
  offset = [0, 0],
  dropdownContainerBuilder,
}) {
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
          <DropdownButton type={type} isOpen={isOpen} onClick={() => onButtonClick()} />
        )}
      </div>
      {isOpen && (
        <div ref={setPopperRef} style={styles.popper} {...attributes.popper}>
          {dropdownContainerBuilder()}
        </div>
      )}
    </Container>
  )
}
