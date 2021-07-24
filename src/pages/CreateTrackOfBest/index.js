import React, { useEffect } from "react"
import styled from "styled-components"
import { lightBackgroundColor } from "styles/colors"
import useCreateTrackOfBestPageData from "utils/hooks/createTrackOfBest/useCreateTrackOfBestPageData"
import { PageLoading } from "components/Spin"
import { withRouter } from "react-router-dom"
import { message } from "antd"
import PageBottomBar from "components/PageBottomBar"
import { title2Normal } from "styles/textTheme"
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

const HeaderSection = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  padding: 32px 0;
  ${title2Normal}
`

function CreateTrackOfBestPage({ history }) {
  const {
    isLoading,
    isFetchError,
    isCreateError,
    isCreateSuccess,
    form,
    onFormFieldChange,
    onSubmit,
    initialize,
    fetchRequest,
    tagList,
    setFormFieldError,
    imageFile,
    setImageFile,
  } = useCreateTrackOfBestPageData()

  useEffect(() => {
    fetchRequest()
    return () => {
      initialize()
    }
  }, [initialize, fetchRequest])

  useEffect(() => {
    if (isCreateError) {
      message.error("요청이 실패하였습니다.")
    }
  }, [isCreateError])

  useEffect(() => {
    if (isCreateSuccess) {
      history.push("/trackOfBest")
      message.success("포스트가 성공적으로 등록되었습니다.")
    }
  }, [isCreateSuccess, history])

  const headerSection = (
    <HeaderSection>
      <span>나만 아는 갓띵곡 생성</span>
    </HeaderSection>
  )

  let content
  if (isLoading) {
    content = (
      <PageLoading
        content={
          <ContentContainer
            headerSection={headerSection}
            onChange={onFormFieldChange}
            form={form}
            mode="create"
          />
        }
      />
    )
  } else if (isFetchError) {
    // TODO: Add error page
    content = <div>에러가 발생했습니다!</div>
  } else {
    content = (
      <ContentContainer
        headerSection={headerSection}
        onChange={onFormFieldChange}
        form={form}
        tagOptions={tagList}
        setError={setFormFieldError}
        imageFile={imageFile}
        setImageFile={setImageFile}
        mode="create"
      />
    )
  }

  return (
    <RowContainer>
      {content}
      <PageBottomBar
        onCancelClick={() => {
          history.goBack()
        }}
        cancelText="나가기"
        onSubmitClick={() => onSubmit()}
        submitText="등록하기"
        enableSubmitButton
      />
    </RowContainer>
  )
}

export default withRouter(CreateTrackOfBestPage)
