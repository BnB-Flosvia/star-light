import React from "react"
import styled from "styled-components"
import { secondaryTextColor, backgroundColor1, interactionColor } from "styles/colors"
import { body3Normal, body2Bold, body3Bold } from "styles/textTheme"
import TagSelectInput from "components/TagSelectInput"
import { isEmpty } from "lodash-es"

const PopularTagContainer = styled.div`
  display: flex;
  flex-flow: column;
  width: 200px;
  min-height: 200px;
  border: 1px dashed ${secondaryTextColor};
  background: ${backgroundColor1};
  padding: 18px 16px 8px 0px;
  margin-left: 40px;
  .title {
    padding: 0px 16px 16px;
    ${body2Bold}
  }
  .tagContainer {
    display: flex;
    width: 100%;
    height: 100%;
    & > div {
      margin-left: 16px;
      margin-bottom: 10px;
    }
    flex-wrap: wrap;
  }
  .emptyView {
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
    ${body3Normal}
    color: ${secondaryTextColor};
  }
`

const TagItem = styled.div`
  display: flex;
  padding: 6px 12px;
  ${body3Bold}
  background: ${interactionColor};
`

export default function TagSectionContainer({
  tagOptions,
  popularTagOptions,
  onChange,
  defaultValue,
}) {
  return (
    <div style={{ display: "flex", width: "100%", paddingBottom: "20px" }}>
      <TagSelectInput
        options={tagOptions.map((item) => {
          return { value: item }
        })}
        placeholder="태그를 선택해주세요"
        notFoundContent={<div>존재하지 않는 태그명입니다.</div>}
        width={300}
        onChange={onChange}
        value={defaultValue}
        mode="tags"
      />
      <PopularTagContainer>
        <div className="title">🔥 인기태그 🔥</div>
        <div className="tagContainer">
          {isEmpty(popularTagOptions) ? (
            <div className="emptyView">인기 태그가 없습니다.</div>
          ) : (
            popularTagOptions.map((item) => {
              return <TagItem>{item}</TagItem>
            })
          )}
        </div>
      </PopularTagContainer>
    </div>
  )
}
