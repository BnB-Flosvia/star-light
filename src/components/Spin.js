import React from "react"
import { Spin } from "antd"
import { LoadingOutlined } from "@ant-design/icons"

export const CircleLineSpin = ({ size }) => {
  let fontSize = 18
  if (size === "small") {
    fontSize = 16
  }
  const antIcon = <LoadingOutlined style={{ fontSize }} spin />

  return <Spin indicator={antIcon} spinning />
}
