import React, { useState } from "react"
import styled from "styled-components"
import { title1Bold } from "src/styles/textTheme"
import {
  DropdownIconButton,
  GitHubIconButton,
  SearchIconButton,
  VisibilityIconButton,
} from "src/components/IconButtons"

export default {
  title: "IconButtons",
}

const Section = styled.div`
  width: 30vw;
  height: fit-content;
  background: ${(props) => (props.color ? props.color : "none")};
  padding: 20px;
`

const SectionTitle = styled.div`
  ${title1Bold}
  margin: 10px 0;
`

// 24*24
export function SmallIconButtons() {
  const [isOpened, setIsOpened] = useState(false)
  return (
    <>
      <SectionTitle>Small size(24*24) black icon button</SectionTitle>
      <Section color="#ededed">
        <DropdownIconButton
          isOpen={isOpened}
          onClick={() => setIsOpened((_isOpened) => !_isOpened)}
        />
      </Section>
      <SectionTitle>Small size(24*24) white icon button</SectionTitle>
      <Section color="#000">
        <GitHubIconButton
          onClick={() => {
            alert("You click github button!")
          }}
        />
      </Section>
    </>
  )
}

// 36*36
export function MediumIconButtons() {
  const [isVisible, setIsVisible] = useState(false)
  return (
    <>
      <SectionTitle>Medium size(36*36) icon buttons</SectionTitle>
      <SearchIconButton
        onClick={() => {
          alert("Click search button!")
        }}
      />
      <VisibilityIconButton
        isVisible={isVisible}
        onClick={() => {
          setIsVisible((_isVisible) => !_isVisible)
        }}
      />
    </>
  )
}
