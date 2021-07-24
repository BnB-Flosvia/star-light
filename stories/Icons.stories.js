import React from "react"
import { secondaryColor } from "src/styles/colors"
import {
  PersonOutline,
  ArrowDropDown,
  ArrowDropUp,
  Search,
  Visibility,
  VisibilityOff,
  GitHub,
} from "@material-ui/icons"

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
        <ArrowDropDown />
        <ArrowDropUp />
      </div>
      <div
        style={{
          marginBottom: "10px",
        }}
      >
        <Search />
        <Search style={{ color: `${secondaryColor}` }} />
      </div>
      <div
        style={{
          marginBottom: "10px",
        }}
      >
        <Visibility />
        <VisibilityOff />
        <Visibility style={{ color: `${secondaryColor}` }} />
        <VisibilityOff style={{ color: `${secondaryColor}` }} />
      </div>
      <div
        style={{
          marginBottom: "10px",
          background: "black",
          width: "fit-content",
        }}
      >
        <PersonOutline style={{ color: "#fff" }} />
      </div>
      <div
        style={{
          marginBottom: "10px",
          background: "black",
          width: "fit-content",
        }}
      >
        <GitHub style={{ color: "#fff" }} />
      </div>
    </>
  )
}
