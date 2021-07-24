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
      <OutlineInput placeholderText="이메일 입력" onChange={() => {}} />
      <OutlineInput
        placeholderText="이메일 입력"
        errorText="에러메시지입니다."
        onChange={() => {}}
      />
      <div style={{ marginTop: "20px" }}>
        <OutlineInput placeholderText="이메일 입력" size="small" onChange={() => {}} />
        <OutlineInput
          placeholderText="이메일 입력"
          size="small"
          errorText="에러메시지입니다."
          onChange={() => {}}
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
        <OutlineInput
          labelText="이메일"
          placeholderText="이메일 입력"
          onChange={() => {}}
        />
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
          onChange={() => {}}
        />
      </div>
      <div
        style={{
          marginBottom: "20px",
        }}
      >
        <OutlineInput
          labelText="이메일"
          placeholderText="이메일 입력"
          size="small"
          onChange={() => {}}
        />
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
          onChange={() => {}}
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
      <PasswordInput
        labelText="비밀번호"
        placeholderText="비밀번호 입력"
        onChange={() => {}}
      />
      <PasswordInput
        labelText="비밀번호"
        placeholderText="비밀번호 입력"
        errorText="에러메시지입니다."
        onChange={() => {}}
      />
      <PasswordInput
        labelText="비밀번호"
        placeholderText="비밀번호 입력"
        size="small"
        onChange={() => {}}
      />
      <PasswordInput
        labelText="비밀번호"
        placeholderText="비밀번호 입력"
        errorText="에러메시지입니다."
        size="small"
        onChange={() => {}}
      />
    </>
  )
}
