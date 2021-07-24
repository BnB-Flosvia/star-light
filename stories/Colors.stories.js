import React from "react"
import * as AppColors from "src/styles/colors"

export default {
  title: "AppColors",
}

function ColorContainer({ name = "", color = "#fff" }) {
  return (
    <div style={{ margin: "20px" }}>
      <div
        style={{
          width: "40px",
          height: "40px",
          borderRadius: "20px",
          background: color,
        }}
      />
      <span>{name}: </span>
      <span>{color}</span>
    </div>
  )
}

export function Colors() {
  const colorList = Object.entries(AppColors)

  return (
    <>
      <div>
        {colorList.map((item) => (
          <ColorContainer name={item[0]} color={item[1]} />
        ))}
      </div>
    </>
  )
}
