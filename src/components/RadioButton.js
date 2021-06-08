import React from "react"
import styled from "styled-components"
import { body2Normal } from "styles/textTheme"
import { primaryColor, primaryTextColor } from "styles/colors"

const Container = styled.div`
  display: flex;
  ${body2Normal}
  box-sizing: border-box;
  & > :not(:last-child) {
    border-right: none;
  }
`

const Button = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80px;
  height: 38px;
  box-sizing: border-box;
  border: ${(props) => (props.isSelected ? "none" : `1px solid ${primaryTextColor}`)};
  color: ${(props) => (props.isSelected ? "#fff" : primaryTextColor)};
  font-weight: ${(props) => (props.isSelected ? "700" : "400")};
  background: ${(props) => (props.isSelected ? primaryColor : "none")};
`

export default function RadioButton({ items, selectedId, onChange }) {
  return (
    <Container>
      {items.map((item) => {
        const { id, name } = item
        return (
          <Button
            isSelected={id === selectedId}
            onClick={() => {
              onChange(id)
            }}
          >
            {name}
          </Button>
        )
      })}
    </Container>
  )
}
