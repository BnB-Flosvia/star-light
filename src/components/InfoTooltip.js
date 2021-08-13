import React from "react"
import { InfoCircleOutlined } from "@ant-design/icons"
import { primaryColor } from "styles/colors"
import { Tooltip } from "antd"

export default function InfoTooltip({ tooltipText }) {
  return (
    <Tooltip
      placement="topLeft"
      arrowPointAtCenter
      title={tooltipText}
      overlayStyle={{ fontSize: "11px" }}
    >
      <InfoCircleOutlined style={{ color: `${primaryColor}`, fontSize: 16 }} />
    </Tooltip>
  )
}
