import React from "react"
import { Info } from "@material-ui/icons"
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
      <Info style={{ color: `${primaryColor}`, fontSize: 16 }} />
    </Tooltip>
  )
}
