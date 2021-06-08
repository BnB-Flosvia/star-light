import React, { useEffect } from "react"
import styled from "styled-components"
import {
  backgroundColor1,
  errorColor,
  lightBackgroundColor,
  primaryTextColor,
  primaryColor,
} from "styles/colors"
import useCreateTrackOfBestPageData from "utils/hooks/createTrackOfBest/useCreateTrackOfBestPageData"
import { PageLoading } from "components/Spin"
import { body2Normal } from "styles/textTheme"
import { withRouter } from "react-router-dom"
import ContentContainer from "./ContentContainer"

const RowContainer = styled.div`
  flex: 1;
  display: flex;
  flex-flow: column;
  width: 100%;
  height: 100%;
  justify-content: flex-start;
  align-items: flex-start;
  background: ${lightBackgroundColor};
`

const BottomBar = styled.div`
  display: flex;
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
`

const LineSmallButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 12px 30px;
  border: ${(props) =>
    props.color ? `1px solid ${props.color}` : `1px solid ${primaryTextColor}`};
  ${body2Normal}
  color: ${(props) => (props.color ? props.color : primaryTextColor)};
`

function CreateTrackOfBestPage({ history }) {
  const { isLoading, isError, isSuccess, form, onFormFieldChange, onSubmit, initialize } =
    useCreateTrackOfBestPageData()

  useEffect(() => {
    return () => {
      initialize()
    }
  }, [initialize])

  let content
  if (isLoading) {
    content = <PageLoading />
  } else if (isError) {
    // TODO: Add error page
    content = <div>에러가 발생했습니다!</div>
  } else if (isSuccess) {
    content = <ContentContainer onChange={onFormFieldChange} form={form} />
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
