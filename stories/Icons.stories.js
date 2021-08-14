import React from "react"
import { secondaryColor } from "src/styles/colors"
import {
  CaretDownOutlined,
  CaretUpOutlined,
  GithubOutlined,
  SearchOutlined,
  UserOutlined,
} from "@ant-design/icons"

export default {
  title: "Icons",
}

export function MaterialIcons() {
  return (
    <>
      <div
        style={{
          display: "flex",
          marginBottom: "10px",
        }}
      >
        <CaretDownOutlined />
        <CaretUpOutlined />
      </div>
      <div
        style={{
          marginBottom: "10px",
        }}
      >
        <SearchOutlined />
        <SearchOutlined style={{ color: `${secondaryColor}` }} />
      </div>
      <div
        style={{
          marginBottom: "10px",
          background: "black",
          width: "fit-content",
        }}
      >
        <UserOutlined style={{ color: "#fff" }} />
      </div>
      <div
        style={{
          marginBottom: "10px",
          background: "black",
          width: "fit-content",
        }}
      >
        <GithubOutlined style={{ color: "#fff" }} />
      </div>
    </>
  )
}
