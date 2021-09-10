import React, { useState } from "react"
import TagSearchInput from "src/components/TagSearchInput"

export default {
  title: "TagSearchInput",
}

export function TagSearchInputExample() {
  const [selectedTags, setSelectedTags] = useState([])
  const tagList = ["사과", "바나나", "수박", "키위", "용과", "사이다", "멜론", "포도"]
  return (
    <div>
      <div style={{ fontSize: 18, padding: 20 }}>
        {selectedTags.map((tag) => {
          return <span>{tag}</span>
        })}
      </div>
      <TagSearchInput
        tagList={tagList}
        selectedTagList={selectedTags}
        onSelectTag={(value) => {
          setSelectedTags(value)
        }}
      />
    </div>
  )
}

export function SmallTagSearchInputExample() {
  const [selectedTags, setSelectedTags] = useState([])
  const tagList = ["사과", "바나나", "수박", "키위", "용과", "사이다", "멜론", "포도"]
  return (
    <div>
      <div style={{ fontSize: 18, padding: 20 }}>
        {selectedTags.map((tag) => {
          return <span>{tag}</span>
        })}
      </div>
      <TagSearchInput
        isSmall
        tagList={tagList}
        selectedTagList={selectedTags}
        onSelectTag={(value) => {
          setSelectedTags(value)
        }}
      />
    </div>
  )
}
