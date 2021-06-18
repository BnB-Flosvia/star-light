import React, { useEffect } from "react"
import { toJS } from "mobx"
import { withRouter } from "react-router-dom"
import styled from "styled-components"
import useTrackOfBestPageData from "utils/hooks/trackOfBest/useTrackOfBestPageData"
import { backgroundColor1, lightBackgroundColor, primaryTextColor } from "styles/colors"
import { PageLoading } from "components/Spin"
import TrackOfBestListItem from "components/TrackOfBestListItem"
import { body1Normal } from "styles/textTheme"
import range from "utils/range"
import { isEmpty } from "lodash-es"
import queryString from "query-string"
import HeaderSection from "./HeaderSection"

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

const GridContainer = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
`

const LineLargeButtonWrapper = styled.div`
  padding-top: 40px;
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
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
    isLoading,
    isError,
    isSuccess,
    initialize,
    trackOfBestList,
    tagList,
    // selectedTagList,
    selectedOrderType,
    fetchRequest,
    updateSelectedTagList,
    setOrderType,
    offset,
    isLast,
  } = useTrackOfBestPageData()

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
      <div style={{ padding: "40px 72px", width: "100%", height: "100%", flex: 1 }}>
        <HeaderSection
          tagOptions={toJS(tagList).map((item) => {
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
        />
        <GridContainer>
          {isLoading && isEmpty(trackOfBestList)
            ? range(1, 5).map((_) => {
                return <TrackOfBestListItem isLoading />
              })
            : toJS(trackOfBestList).map((item) => {
                const { id, songName, artist, simplePoint, username, coverImage } = item
                return (
                  <TrackOfBestListItem
                    id={id}
                    title={songName}
                    artist={artist}
                    summaryContent={simplePoint}
                    nickname={username}
                    imageUrl={coverImage}
                  />
                )
              })}
        </GridContainer>
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
      </div>
    )
  }

  let content
  if (isLoading) {
    content = <PageLoading content={defaultContent()} />
  } else if (isError) {
    // TODO: Add error page
    content = <div>에러가 발생했습니다!</div>
  } else if (isSuccess) {
    content = defaultContent()
  }

  return <RowContainer>{content}</RowContainer>
}

export default withRouter(TrackOfBestPage)
