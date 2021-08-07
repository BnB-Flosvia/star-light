import React, { useEffect } from "react"
import { withRouter } from "react-router-dom"
import styled from "styled-components"
import useTrackOfBestPageData from "utils/hooks/trackOfBest/useTrackOfBestPageData"
import { backgroundColor1, lightBackgroundColor, primaryTextColor } from "styles/colors"
import { PageLoading } from "components/Spin"
import { body1Normal } from "styles/textTheme"
import queryString from "query-string"
import { useMediaQuery } from "react-responsive"
import TrackOfBestGridList from "components/TrackOfBestGridList"
import HeaderSection from "./HeaderSection"

const RowContainer = styled.div`
  flex: 1;
  display: flex;
  flex-flow: column;
  width: 100%;
  height: 100%;
  justify-content: flex-start;
  align-items: flex-start;
  padding: ${(props) =>
    props.isSmall ? "24px 20px" : props.isMedium ? "40px 36px" : "52px 72px"};
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

const LineLargeButtonWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  padding-top: 40px;
  & > button {
    display: flex;
    align-items: center;
    justify-content: center;
    ${body1Normal}
    height: 50px;
    width: 300px;
    background: none;
    border: 1px solid ${primaryTextColor};
    &:hover {
      background: ${backgroundColor1};
    }
  }
`

function TrackOfBestPage({ location }) {
  const initialOffset = 0
  const {
    isInitialized,
    isLoading,
    isError,
    initialize,
    trackOfBestList,
    tagList,
    searchedTagList,
    selectedOrderType,
    fetchRequest,
    updateSelectedTagList,
    setOrderType,
    offset,
    isLast,
  } = useTrackOfBestPageData()

  const isSmallMode = useMediaQuery({
    query: "(max-width: 420px)",
  })
  const isMediumMode = useMediaQuery({
    query: "(min-width: 420px) and (max-width: 768px)",
  })

  const query = queryString.parse(location.search)

  useEffect(() => {
    if (query?.tag != null) {
      fetchRequest(null, [query.tag])
    } else {
      fetchRequest()
    }
    return () => {
      initialize()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchRequest, initialize])

  useEffect(() => {
    if (selectedOrderType != null) {
      fetchRequest(initialOffset)
    }
  }, [selectedOrderType, fetchRequest])

  function defaultContent() {
    return (
      <>
        <HeaderSection
          isLoading={isLoading && isInitialized}
          tagOptions={tagList.map((item) => {
            return { value: item }
          })}
          onTagChange={(newList) => updateSelectedTagList(newList)}
          onSearch={() => {
            fetchRequest(initialOffset)
          }}
          orderType={selectedOrderType}
          onOrderChange={(id) => {
            setOrderType(id)
          }}
          searchedTagList={searchedTagList}
        />
        <TrackOfBestGridList
          isSmall={isSmallMode}
          isIntialLoading={isLoading && !isInitialized}
          list={trackOfBestList}
        />
        {!isLast && (
          <LineLargeButtonWrapper>
            <button
              type="button"
              onClick={() => {
                fetchRequest(offset + 1)
              }}
            >
              더보기
            </button>
          </LineLargeButtonWrapper>
        )}
      </>
    )
  }

  let content
  if (isLoading && !isInitialized) {
    content = <PageLoading content={defaultContent()} />
  } else if (isError) {
    // TODO: Add error page
    content = <div>에러가 발생했습니다!</div>
  } else {
    content = defaultContent()
  }

  return (
    <RowContainer isSmall={isSmallMode} isMedium={isMediumMode}>
      {content}
    </RowContainer>
  )
}

export default withRouter(TrackOfBestPage)
