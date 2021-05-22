import React from "react"
import { FullWidthButton, SmallButton, UserSettingButton } from "src/components/Buttons"

export default {
  title: "Buttons",
  decorators: [
    (storyFn) => (
      <div
        style={{
          width: "400px",
          padding: "20px",
          background: "#ededed",
        }}
      >
        {storyFn()}
      </div>
    ),
  ],
}

export function FullWidthMediumButton() {
  return (
    <FullWidthButton
      onClick={() => {
        alert("full width medium button click!")
      }}
    >
      로그인
    </FullWidthButton>
  )
}

export function FullWidthSmallButton() {
  return (
    <FullWidthButton
      onClick={() => {
        alert("full width small button click!")
      }}
      size="small"
    >
      로그인
    </FullWidthButton>
  )
}

export function DarkColorSmallButton() {
  return (
    <SmallButton
      onClick={() => {
        alert("dark small button click!")
      }}
    >
      링크 발송
    </SmallButton>
  )
}

export function CircularButton() {
  return (
    <UserSettingButton
      onClick={() => {
        alert("user setting button click!")
      }}
    >
      circular button
    </UserSettingButton>
  )
}
