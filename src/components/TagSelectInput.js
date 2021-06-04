import React from "react"
import styled from "styled-components"
import { Select, Tag } from "antd"
import { body2Normal } from "styles/textTheme"
import { primaryColor, primaryTextColor } from "styles/colors"
import { ArrowDropDown } from "@material-ui/icons"

const Container = styled.div`
  .ant-select-selector {
    border: 1px solid ${primaryTextColor} !important;
    border-radius: 4px !important;
    padding: 4px 10px;
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
  padding-right: 12px;
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
  onChange,
  width,
}) {
  function handleChange(newValue) {
    onChange(newValue)
  }

  return (
    <Container>
      <Select
        mode="multiple"
        showArrow
        tagRender={tagRender}
        defaultValue={value}
        style={{ width }}
        options={options}
        size="large"
        suffixIcon={
          <IconContainer>
            <ArrowDropDown style={{ color: `${primaryTextColor}` }} />
          </IconContainer>
        }
        placeholder={placeholder}
        onChange={handleChange}
        notFoundContent={notFoundContent || <div>검색 결과가 존재하지 않습니다.</div>}
      />
    </Container>
  )
}
