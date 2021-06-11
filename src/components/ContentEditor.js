import "codemirror/lib/codemirror.css"
import "@toast-ui/editor/dist/toastui-editor.css"

import React, { useRef, useEffect } from "react"
import styled from "styled-components"
import { Editor } from "@toast-ui/react-editor"
import { body2Normal } from "styles/textTheme"

const Container = styled.div`
  .tui-editor-defaultUI {
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;

    .te-md-container {
      border-bottom-left-radius: 4px;
      border-bottom-right-radius: 4px;
    }
  }

  .CodeMirror-lines {
    ${body2Normal}
    pre.CodeMirror-placeholder {
      padding-left: 20px;
      ${body2Normal}
    }

    .CodeMirror-line {
      padding: 0 20px;
    }
  }
`

export default function ContentEditor({ onChange, value }) {
  const editorRef = useRef()
  const handleContentClick = () => {
    if (onChange != null) {
      onChange(editorRef.current.getInstance().getMarkdown())
    }
  }

  useEffect(() => {
    editorRef.current.getInstance().setMarkdown(value)
  }, [value])

  return (
    <Container>
      <Editor
        initialValue={value}
        placeholder="내용을 입력해주세요."
        previewStyle="tab"
        height="200px"
        initialEditType="markdown"
        onBlur={() => handleContentClick()}
        ref={editorRef}
        hideModeSwitch
      />
    </Container>
  )
}
