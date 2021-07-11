import React from "react"
import styled from "styled-components"
import { Spin } from "antd"
import { LoadingOutlined } from "@ant-design/icons"

const SpinWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`

export function CircleLineSpin({ size }) {
  let fontSize = 18
  if (size === "small") {
    fontSize = 16
  }
  const antIcon = <LoadingOutlined style={{ fontSize }} spin />

  return <Spin indicator={antIcon} spinning />
}

export function PageLoading({ content }) {
  return (
    <SpinWrapper>
      <Spin tip="로딩중...">{content}</Spin>
    </SpinWrapper>
  )
}
