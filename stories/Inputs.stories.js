import React from "react"
import { OutlineInput, PasswordInput, SearchInput } from "src/components/Inputs"

export default {
  title: "Inputs",
  decorators: [
    (storyFn) => (
      <div
        style={{
          padding: "20px",
          background: "#ededed",
          minWidth: "320px",
        }}
      >
        {storyFn()}
      </div>
    ),
  ],
}

export function OutlineMediumInput() {
  return <OutlineInput placeholderText="이메일 입력" />
}

export function LabelOutlineMediumInput() {
  return <OutlineInput labelText="이메일" placeholderText="이메일 입력" />
}

export function SearchMediumInput() {
  return (
    <SearchInput
      placeholderText="검색어 입력"
      onSearch={() => {
        alert("검색!")
      }}
    />
  )
}

export function PasswordMediumInput() {
  return <PasswordInput labelText="비밀번호" placeholderText="비밀번호 입력" />
}
