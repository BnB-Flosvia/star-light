import React from "react"
import styled from "styled-components"

const ToggleButtonBackground = styled.label`
  top: 0;
  right: 1.29%;
  box-sizing: border-box;
  width: 50px;
  height: 30px;
  border-radius: 15px;
  background: #e0e0e0;
  &::after {
    content: "";
    display: block;
    border-radius: 50%;
    width: 24px;
    height: 24px;
    margin: 3px;
    background: #fff;
    box-shadow: 0px 3px 8px rgba(0, 0, 0, 0.15), 0px 3px 1px rgba(0, 0, 0, 0.06);
    transition: 0.2s;
  }
`

const ToggleButtonForeground = styled.input`
  display: none;
  z-index: 1;
  box-sizing: border-box;
  border-radius: 15px;
  width: 50px;
  height: 30px;
  margin: 0;
  &:checked + ${ToggleButtonBackground} {
    background: #e73b63;
    &::after {
      box-sizing: border-box;
      content: "";
      display: block;
      border-radius: 50%;
      width: 24px;
      height: 24px;
      margin-left: 23px;
      transition: 0.2s;
    }
  }
`

const ToggleButtonContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`

function ToggleButton({ id = "toggle", value, readOnly, onChange: changeListener }) {
  return (
    <ToggleButtonContainer>
      <ToggleButtonForeground
        id={id}
        type="checkbox"
        checked={value}
        onClick={(event) => {
          event.stopPropagation()
        }}
        onChange={() => changeListener(!value)}
        readOnly={readOnly}
      />
      <ToggleButtonBackground htmlFor={id} />
    </ToggleButtonContainer>
  )
}

export { ToggleButton, ToggleButtonBackground, ToggleButtonForeground }
