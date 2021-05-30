import React from "react"
import styled from "styled-components"
import { Select, Tag } from "antd"
import { body2Normal } from "styles/textTheme"
import { secondaryTextColor, primaryColor } from "styles/colors"
import { ArrowDropDown } from "@material-ui/icons"

const Container = styled.div`
  .ant-select-selector {
    border: 1px solid ${secondaryTextColor} !important;
    border-radius: 4px !important;
    padding: 6px 10px;
  }

  .ant-tag {
    margin-right: 5px;
    ${body2Normal}
    color: #fff;
    padding: 6px;
  }

  .ant-select-selection-search {
    ${body2Normal}
    margin: 0;
  }
`

const IconContainer = styled.div`
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;
  padding-right: 3px;
`

function tagRender(props) {
  const { label, closable, onClose } = props
  const onPreventMouseDown = (event) => {
    event.preventDefault()
    event.stopPropagation()
  }
  return (
    <Tag
      color={primaryColor}
      onMouseDown={onPreventMouseDown}
      closable={closable}
      onClose={onClose}
    >
      {label}
    </Tag>
  )
}

export default function TagSelectInput({
  options,
  placeholder = "",
  value = [],
  notFoundContent,
}) {
  function handleChange(newValue) {
    console.log(typeof newValue)
    console.log(newValue)
  }

  return (
    <Container>
      <Select
        mode="multiple"
        showArrow
        tagRender={tagRender}
        defaultValue={value}
        style={{ width: 400 }}
        options={options}
        size="large"
        suffixIcon={
          <IconContainer>
            <ArrowDropDown style={{ color: `${secondaryTextColor}` }} />
          </IconContainer>
        }
        placeholder={placeholder}
        onChange={handleChange}
        notFoundContent={notFoundContent || <div>검색 결과가 존재하지 않습니다.</div>}
      />
    </Container>
  )
}
