/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useCallback } from "react"
import styled from "styled-components"
import { usePopper } from "react-popper"
import { useClickOutside } from "utils/hooks/useClickOutside"
import { DropdownIconButton } from "components/IconButtons"

const Container = styled.div`
  position: relative;
  width: fit-content;
  z-index: 1;
`

// 간단한 팝업 메뉴를 표시할 때 사용됨
export default function Popover({
  className,
  buildCustomButton,
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
    setIsOpen((value) => !value)
  }, [])

  return (
    <Container ref={clickOutsideRef} className={className}>
      <div ref={setReferenceRef}>
        {buildCustomButton != null ? (
          buildCustomButton({ isOpen, onClick: () => onButtonClick() })
        ) : (
          <DropdownIconButton isOpen={isOpen} onClick={() => onButtonClick()} />
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
