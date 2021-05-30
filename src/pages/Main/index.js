import React, { useEffect } from "react"
import styled from "styled-components"
import TrackOfBestSection from "pages/Main/TrackOfBestSection"
import useMainPageData from "utils/hooks/main/useMainPageData"
import { Spin } from "antd"
import { lightBackgroundColor } from "styles/colors"

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

const SpinWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`

export default function MainPage() {
  const { isLoading, isFetchError, isFetchSuccess, initialize, fetchRequest } =
    useMainPageData()

  useEffect(() => {
    fetchRequest()
    return () => {
      initialize()
    }
  }, [fetchRequest, initialize])

  let content
  if (isLoading) {
    content = (
      <SpinWrapper>
        <Spin tip="로딩중..." />
      </SpinWrapper>
    )
  } else if (isFetchError) {
    // TODO: Add error page
    content = <div>에러가 발생했습니다!</div>
  } else if (isFetchSuccess) {
    content = (
      <>
        <TrackOfBestSection />
      </>
    )
  }

  return <RowContainer>{content}</RowContainer>
}
