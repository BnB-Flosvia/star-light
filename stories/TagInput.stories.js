import React from "react"
import TagSelectInput from "src/components/TagSelectInput"

export default {
  title: "TagInput",
}

export function TagSelectInputExample() {
  return (
    <TagSelectInput
      options={[{ value: "사과" }, { value: "바나나" }, { value: "오렌지" }]}
      placeholder="태그"
      notFoundContent={<div>존재하지 않는 태그명입니다.</div>}
    />
  )
}
