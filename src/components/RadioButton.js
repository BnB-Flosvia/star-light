import React from "react"
import styled from "styled-components"
import { body2Normal, body3Normal } from "styles/textTheme"
import { whiteColor, primaryColor, primaryTextColor } from "styles/colors"

const Container = styled.div`
  display: flex;
  ${(props) => (props.isSmall ? body3Normal : body2Normal)}
  box-sizing: border-box;
  & > :not(:last-child) {
    border-right: none;
  }
`

const Button = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 20px;
  box-sizing: border-box;
  border: ${(props) => (props.isSelected ? "none" : `1px solid ${primaryTextColor}`)};
  color: ${(props) => (props.isSelected ? whiteColor : primaryTextColor)};
  font-weight: ${(props) => (props.isSelected ? "700" : "400")};
  background: ${(props) => (props.isSelected ? primaryColor : "none")};
`

export default function RadioButton({ items, selectedId, onChange, isSmall }) {
  return (
    <Container isSmall={isSmall}>
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
