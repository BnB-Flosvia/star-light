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
  return (
    <>
      <OutlineInput placeholderText="이메일 입력" />
      <OutlineInput placeholderText="이메일 입력" errorText="에러메시지입니다." />
      <div style={{ marginTop: "20px" }}>
        <OutlineInput placeholderText="이메일 입력" size="small" />
        <OutlineInput
          placeholderText="이메일 입력"
          size="small"
          errorText="에러메시지입니다."
        />
      </div>
    </>
  )
}

export function LabelOutlineMediumInput() {
  return (
    <>
      <div
        style={{
          marginBottom: "20px",
        }}
      >
        <OutlineInput labelText="이메일" placeholderText="이메일 입력" />
      </div>
      <div
        style={{
          marginBottom: "20px",
        }}
      >
        <OutlineInput
          labelText="이메일"
          placeholderText="이메일 입력"
          errorText="에러메시지입니다."
        />
      </div>
      <div
        style={{
          marginBottom: "20px",
        }}
      >
        <OutlineInput labelText="이메일" placeholderText="이메일 입력" size="small" />
      </div>
      <div
        style={{
          marginBottom: "20px",
        }}
      >
        <OutlineInput
          labelText="이메일"
          placeholderText="이메일 입력"
          errorText="에러메시지입니다."
          size="small"
        />
      </div>
    </>
  )
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
  return (
    <>
      <PasswordInput labelText="비밀번호" placeholderText="비밀번호 입력" />
      <PasswordInput
        labelText="비밀번호"
        placeholderText="비밀번호 입력"
        errorText="에러메시지입니다."
      />
      <PasswordInput labelText="비밀번호" placeholderText="비밀번호 입력" size="small" />
      <PasswordInput
        labelText="비밀번호"
        placeholderText="비밀번호 입력"
        errorText="에러메시지입니다."
        size="small"
      />
    </>
  )
}
