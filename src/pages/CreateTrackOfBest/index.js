import React, { useEffect } from "react"
import styled from "styled-components"
import {
  backgroundColor1,
  errorColor,
  lightBackgroundColor,
  primaryColor,
} from "styles/colors"
import useCreateTrackOfBestPageData from "utils/hooks/createTrackOfBest/useCreateTrackOfBestPageData"
import { PageLoading } from "components/Spin"
import { withRouter } from "react-router-dom"
import { LineSmallButton } from "components/Buttons"
import ContentContainer from "./ContentContainer"

const RowContainer = styled.div`
  flex: 1;
  display: flex;
  flex-flow: column;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  background: ${lightBackgroundColor};
  padding-bottom: 80px;
`

const BottomBar = styled.div`
  display: flex;
  width: 100%;
  position: fixed;
  bottom: 0;
  flex: 0 0 80px;
  height: 80px;
  background: ${backgroundColor1};
  align-items: center;
  justify-content: center;
`

const ButtonGroupWrapper = styled.div`
  display: flex;
  width: 720px;
  align-items: center;
  justify-content: flex-end;
  padding: 0 40px;
  & > button:first-child {
    margin-right: 24px;
  }
`

function CreateTrackOfBestPage({ history }) {
  const {
    isLoading,
    isError,
    isSuccess,
    form,
    onFormFieldChange,
    onSubmit,
    initialize,
    fetchRequest,
    tagList,
  } = useCreateTrackOfBestPageData()

  useEffect(() => {
    fetchRequest()
    return () => {
      initialize()
    }
  }, [initialize, fetchRequest])

  let content
  if (isLoading) {
    content = (
      <PageLoading
        content={<ContentContainer onChange={onFormFieldChange} form={form} />}
      />
    )
  } else if (isError) {
    // TODO: Add error page
    content = <div>에러가 발생했습니다!</div>
  } else if (isSuccess) {
    content = (
      <ContentContainer onChange={onFormFieldChange} form={form} tagOptions={tagList} />
    )
  }

  return (
    <RowContainer>
      {content}
      <BottomBar>
        <ButtonGroupWrapper>
          <LineSmallButton
            onClick={() => {
              history.pop()
            }}
            color={errorColor}
          >
            나가기
          </LineSmallButton>
          <LineSmallButton onClick={() => onSubmit()} color={primaryColor}>
            등록하기
          </LineSmallButton>
        </ButtonGroupWrapper>
      </BottomBar>
    </RowContainer>
  )
}

export default withRouter(CreateTrackOfBestPage)
