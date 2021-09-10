import { SearchOutlined, CheckOutlined } from "@ant-design/icons"
import React, { useState } from "react"
import styled from "styled-components"
import {
  secondaryColor,
  primaryColor,
  secondaryTextColor,
  disableColor,
  interactionColor,
} from "styles/colors"
import { body2Normal, body3Normal } from "styles/textTheme"
import PerfectScrollbar from "react-perfect-scrollbar"
import { useClickOutside } from "utils/hooks/useClickOutside"

const InputWrapper = styled.div`
  display: flex;
  width: ${(props) => (props.isSmall ? "280px" : "320px")};
  box-sizing: border-box;
  padding: 8px;
  padding-left: 0;
  padding-right: 20px;
  margin: 0;
  align-items: center;
  border: 2px solid ${(props) => (props.isFocus ? secondaryColor : primaryColor)};
  border-radius: 50px;
`

const Input = styled.input`
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  box-sizing: border-box;
  padding: 0;
  margin: 0;
  margin-left: 8px;
  border: none;
  background: none;
  ${(props) => (props.isSmall ? body3Normal : body2Normal)}
  &:focus {
    outline: none;
  }
  ::placeholder {
    color: ${secondaryTextColor};
  }
`

const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4px;
  margin-left: 12px;
`

const DropdownContainer = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  width: 100%;
  border: 1px solid ${disableColor};
  border-radius: 8px;
  top: ${(props) => `${props.top}px` ?? 0};
  padding: 8px;
  max-height: 160px;
  overflow: hidden;
  & > div > :not(:last-child) {
    margin-bottom: 6px;
  }
`

const TagItem = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 10px;
  border-radius: 6px;
  background: ${(props) => (props.isSelected ? interactionColor : null)};
  ${(props) => (props.isSmall ? body3Normal : body2Normal)}
  font-weight: 600;
  &:hover {
    background: ${interactionColor};
  }
`

const EmptyItemContainer = styled.div`
  display: flex;
  width: 100%;
  padding: 10px;
  align-items: center;
  ${(props) => (props.isSmall ? body3Normal : body2Normal)}
  color: ${secondaryTextColor};
  font-weight: 600;
`

export default function TagSearchInput({
  tagList = [],
  selectedTagList = [],
  onSelectTag,
  isSmall,
}) {
  const [isFocus, setIsFocus] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [searchedTagList, setSearchedTagList] = useState([...tagList])
  const [clickOutsideRef] = useClickOutside(() => {
    setIsDropdownOpen(false)
  })

  let iconSize
  let dropdownCardTop
  if (isSmall) {
    iconSize = 18
    // inputHeight = 46
    // inputHeight + 10
    dropdownCardTop = 56
  } else {
    iconSize = 22
    // inputHeight = 50
    // inputHeight + 10
    dropdownCardTop = 60
  }

  return (
    <div ref={clickOutsideRef} style={{ position: "relative" }}>
      <InputWrapper isFocus={isFocus} isSmall={isSmall}>
        <IconWrapper>
          <SearchOutlined style={{ fontSize: iconSize, color: primaryColor }} />
        </IconWrapper>
        <Input
          placeholder="검색하고 싶은 태그명을 입력해주세요"
          onFocus={(_event) => {
            setIsFocus(true)
            setIsDropdownOpen(true)
          }}
          onChange={(event) => {
            const data = event.target.value
            const selectedList = tagList.filter((tag) => tag.includes(data))
            setSearchedTagList(selectedList)
          }}
          onBlur={(_event) => {
            setIsFocus(false)
          }}
          isSmall={isSmall}
        />
      </InputWrapper>
      {isDropdownOpen && (
        <DropdownContainer top={dropdownCardTop}>
          <PerfectScrollbar>
            {searchedTagList.length === 0 ? (
              <EmptyItemContainer isSmall={isSmall}>
                검색 결과가 존재하지 않습니다.
              </EmptyItemContainer>
            ) : (
              searchedTagList.map((selectedTag) => {
                const isSelected = selectedTagList.includes(selectedTag)
                return (
                  <TagItem
                    isSelected={isSelected}
                    onClick={() => {
                      if (!selectedTagList.includes(selectedTag)) {
                        onSelectTag([...selectedTagList, selectedTag])
                      } else {
                        onSelectTag(
                          selectedTagList.filter((item) => item !== selectedTag)
                        )
                      }
                    }}
                    isSmall={isSmall}
                  >
                    {selectedTag}
                    {isSelected && <CheckOutlined style={{ color: primaryColor }} />}
                  </TagItem>
                )
              })
            )}
          </PerfectScrollbar>
        </DropdownContainer>
      )}
    </div>
  )
}
