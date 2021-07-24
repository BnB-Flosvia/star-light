import React from "react"
import styled from "styled-components"
import * as AppTextThemes from "src/styles/textTheme"

export default {
  title: "TextTheme",
}

const Text = styled.div`
  padding: 10px;
  ${(props) => props.theme}
`

export function TextThemes() {
  const textThemeList = Object.entries(AppTextThemes)
  return (
    <>
      {textThemeList.map((item) => (
        <div style={{ marginBottom: "20px" }}>
          <div>{item[0]}</div>
          <Text theme={item[1]}>안녕하세요 예제 텍스트입니다.</Text>
        </div>
      ))}
    </>
  )
}
