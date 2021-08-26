import React from "react"
import TagSelectInput from "components/TagSelectInput"

export default function TagSectionContainer({ tagOptions, onChange, defaultValue }) {
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
    </div>
  )
}
