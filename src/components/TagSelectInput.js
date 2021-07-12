import React from "react"
import styled from "styled-components"
import { Select, Tag } from "antd"
import { body2Normal, body3Normal } from "styles/textTheme"
import {
  borderColor,
  interactionColor,
  primaryColor,
  primaryTextColor,
  secondaryTextColor,
} from "styles/colors"
import { ArrowDropDown } from "@material-ui/icons"

const Container = styled.div`
  .ant-select-selector {
    border: 1px solid ${primaryTextColor} !important;
    border-radius: 4px !important;
    padding: 4px 10px;
  }

  .ant-tag {
    margin-right: 5px;
    ${(props) => (props.isSmall ? body3Normal : body2Normal)};
    color: #fff;
    padding: 6px;
  }

  .ant-select-selection-search {
    ${(props) => (props.isSmall ? body3Normal : body2Normal)};
    margin: 0;
  }

  .ant-select-selection-placeholder {
    ${(props) => (props.isSmall ? body3Normal : body2Normal)};
    color: ${secondaryTextColor};
  }
`

const IconContainer = styled.div`
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;
  padding-right: 12px;
`

const DropdownContainer = styled.div`
  display: flex;
  width: 100%;
  ${body2Normal}
  .ant-select-dropdown {
    border: 1px solid ${primaryTextColor};
    border-radius: 4px;
  }
  .ant-select-item {
    width: ${(props) => (props.width ? `${props.width}px` : "250px")};
    padding: 10px 14px;
  }
  .ant-select-item-option-selected {
    background: ${interactionColor};
  }
  .rc-virtual-list-holder-inner {
    & > .ant-select-item:not(:last-child) {
      border-bottom: 1px solid ${borderColor};
    }
  }
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
  isSmall,
  mode = "multiple",
}) {
  function handleChange(newValue) {
    onChange(newValue)
  }

  return (
    <Container isSmall={isSmall}>
      <Select
        mode={mode}
        showArrow
        tagRender={tagRender}
        defaultValue={value}
        style={{ width }}
        options={options}
        size={isSmall ? null : "large"}
        suffixIcon={
          <IconContainer>
            <ArrowDropDown style={{ color: `${primaryTextColor}` }} />
          </IconContainer>
        }
        dropdownMatchSelectWidth={false}
        placeholder={placeholder}
        onChange={handleChange}
        notFoundContent={notFoundContent || <div>검색 결과가 존재하지 않습니다.</div>}
        dropdownRender={(menu) => (
          <DropdownContainer className="dropdown" width={width} isSmall={isSmall}>
            {menu}
          </DropdownContainer>
        )}
      />
    </Container>
  )
}
