import React from "react"
import { Spin } from "antd"
import { LoadingOutlined } from "@ant-design/icons"

export const CircleLineSpin = ({ size, spinning = false }) => {
  let fontSize = 16
  if (size === "small") {
    fontSize = 14
  }
  const antIcon = <LoadingOutlined style={{ fontSize }} spin />

  return <Spin indicator={antIcon} spinning={spinning} />
}
