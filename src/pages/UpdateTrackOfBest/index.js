import React, { useEffect } from "react"
import styled from "styled-components"
import { lightBackgroundColor, primaryColor, secondaryTextColor } from "styles/colors"
import { PageLoading } from "components/Spin"
import { withRouter } from "react-router-dom"
import { message } from "antd"
import useUpdateTrackOfBestPageData from "utils/hooks/updateTrackOfBest/useUpdateTrackOfBestPageData"
import queryString from "query-string"
import ContentContainer from "pages/CreateTrackOfBest/ContentContainer"
import { body1Normal, body3Normal, title2Normal } from "styles/textTheme"
import PageBottomBar from "components/PageBottomBar"

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
  flex-flow: column;
  width: 100%;
  justify-content: center;
  align-items: center;
  padding: 30px 16px 16px;
  .title {
    ${title2Normal}
    padding-bottom: 10px;
  }
  .subtitle {
    ${body1Normal}
    color: ${secondaryTextColor};
  }
  .modeText {
    display: flex;
    width: 100%;
    justify-content: flex-end;
    padding-top: 2px;
    ${body3Normal}
    color: ${primaryColor};
  }
`

function UpdateTrackOfBestPage({ location, history }) {
  const {
    isLoading,
    isFetchError,
    // isFetchSuccess,
    isUpdateError,
    isUpdateSuccess,
    form,
    onFormFieldChange,
    onSubmit,
    initialize,
    fetchRequest,
    tagList,
    setFormFieldError,
    trackOfBestDetail,
    imageFile,
    setImageFile,
    enableSubmitButton,
  } = useUpdateTrackOfBestPageData()

  const query = queryString.parse(location.search)
  const id = query?.id

  useEffect(() => {
    fetchRequest(id)
    return () => {
      initialize()
    }
  }, [initialize, fetchRequest, id])

  useEffect(() => {
    if (isUpdateError) {
      message.error("요청이 실패하였습니다.")
    }
  }, [isUpdateError])

  useEffect(() => {
    if (isUpdateSuccess) {
      history.push("/trackOfBest")
      message.success("포스트가 성공적으로 수정되었습니다.")
    }
  }, [isUpdateSuccess, history])

  const headerSection = (
    <HeaderSection>
      <span className="title">
        {form.fields.songName.value || trackOfBestDetail?.songName || ""}
      </span>
      <span className="subtitle">
        {form.fields.artist.value || trackOfBestDetail?.artist || ""}
      </span>
      <span className="modeText">정보 변경 모드</span>
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
            mode="update"
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
        defaultValue={trackOfBestDetail}
        onChange={onFormFieldChange}
        form={form}
        tagOptions={tagList}
        setError={setFormFieldError}
        imageFile={imageFile}
        setImageFile={setImageFile}
        mode="update"
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
        onSubmitClick={() => onSubmit(id)}
        submitText="수정하기"
        enableSubmitButton={enableSubmitButton}
      />
    </RowContainer>
  )
}

export default withRouter(UpdateTrackOfBestPage)
