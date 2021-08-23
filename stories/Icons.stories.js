import React from "react"
import styled from "styled-components"
import {
  CaretDownOutlined,
  CaretUpOutlined,
  GithubOutlined,
  SearchOutlined,
  UserOutlined,
  InfoCircleOutlined,
  LoadingOutlined,
  MenuOutlined,
} from "@ant-design/icons"

export default {
  title: "Icons",
  decorators: [
    (storyFn) => (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#000",
        }}
      >
        {storyFn()}
      </div>
    ),
  ],
}

const Section = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding: 20px;
  background: ${(props) => (props.color ? props.color : "none")};
  & > span {
    margin-bottom: 20px;
  }
`

export function AntDesignIcons() {
  return (
    <Section>
      <CaretDownOutlined style={{ color: "#fff" }} />
      <CaretUpOutlined style={{ color: "#fff" }} />
      <SearchOutlined style={{ color: "#fff", fontSize: "20px" }} />
      <UserOutlined style={{ color: "#fff", fontSize: "20px" }} />
      <GithubOutlined style={{ color: "#fff", fontSize: "24px" }} />
      <InfoCircleOutlined style={{ color: "#fff", fontSize: "16px" }} />
      <LoadingOutlined style={{ color: "#fff", fontSize: "16px" }} />
      <LoadingOutlined style={{ color: "#fff", fontSize: "18px" }} />
      <MenuOutlined style={{ color: "#fff", fontSize: "30px" }} />
    </Section>
  )
}
