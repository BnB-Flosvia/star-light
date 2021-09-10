import React, { useEffect } from "react"
import styled from "styled-components"
import { lightBackgroundColor } from "styles/colors"
import useMainPageData from "utils/hooks/main/useMainPageData"
import { PageLoading } from "components/Spin"
import TrackOfBestSection from "./TrackOfBestSection"

const RowContainer = styled.div`
  flex: 1;
  display: flex;
  flex-flow: column;
  width: 100%;
  height: 100%;
  justify-content: flex-start;
  align-items: flex-start;
  background: ${lightBackgroundColor};
  .ant-spin-blur {
    width: 100%;
    height: 100%;
  }
  .ant-spin-nested-loading {
    width: 100%;
    height: 100%;
  }
  .ant-spin-spinning {
    width: 100%;
    height: 100%;
    top: 50% !important;
    left: 50% !important;
    transform: translate(-50%, -50%);
  }
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
    content = <PageLoading content={<TrackOfBestSection />} />
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
