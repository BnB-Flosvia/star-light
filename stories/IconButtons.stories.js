import React, { useState } from "react"
import styled from "styled-components"
import {
  DropdownIconButton,
  SearchIconButton,
  MoreVertIconButton,
  MenuIconButton,
} from "src/components/IconButtons"

export default {
  title: "IconButtons",
}

const Section = styled.div`
  display: flex;
  flex-direction: column;
  width: 30vw;
  height: fit-content;
  background: ${(props) => (props.color ? props.color : "none")};
  padding: 20px;
  & > button {
    margin-bottom: 20px;
  }
`

export function IconButtons() {
  const [isOpened, setIsOpened] = useState(false)
  return (
    <Section color="#ededed">
      <DropdownIconButton
        isOpen={isOpened}
        onClick={() => setIsOpened((_isOpened) => !_isOpened)}
      />
      <SearchIconButton
        onClick={() => {
          alert("Click search icon button!")
        }}
      />
      <MoreVertIconButton
        onClick={() => {
          alert("Click more vert icon button")
        }}
      />
      <MenuIconButton
        onClick={() => {
          alert("Click menu icon button")
        }}
      />
    </Section>
  )
}
