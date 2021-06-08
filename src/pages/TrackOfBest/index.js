import React, { useEffect } from "react"
import { withRouter } from "react-router-dom"
import styled from "styled-components"
import useTrackOfBestPageData from "utils/hooks/trackOfBest/useTrackOfBestPageData"
import { lightBackgroundColor, primaryTextColor } from "styles/colors"
import { PageLoading } from "components/Spin"
import TrackOfBestListItem from "components/TrackOfBestListItem"
import { title1Normal } from "styles/textTheme"
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
  padding: 40px 72px;
`

const GridContainer = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
`

const LineLargeButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  ${title1Normal}
  height: 60px;
  width: 300px;
  background: none;
  border: 1px solid ${primaryTextColor};
`

function TrackOfBestPage() {
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
    // setOffset,
    offset,
  } = useTrackOfBestPageData()

  useEffect(() => {
    fetchRequest()
    return () => {
      initialize()
    }
  }, [fetchRequest, initialize])

  useEffect(() => {
    if (selectedOrderType != null) {
      fetchRequest({ offset: 0 })
    }
  }, [selectedOrderType, fetchRequest])

  function defaultContent() {
    return (
      <>
        <HeaderSection
          tagOptions={tagList.map((item) => {
            return { value: item }
          })}
          onTagChange={(newList) => updateSelectedTagList(newList)}
          onSearch={() => {
            fetchRequest({ offset: 0 })
          }}
          orderType={selectedOrderType}
          onOrderChange={(id) => {
            setOrderType(id)
          }}
        />
        <GridContainer>
          {trackOfBestList.map((item) => {
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
        <LineLargeButton
          onClick={() => {
            fetchRequest({ offset: offset + 1 })
          }}
        >
          더보기
        </LineLargeButton>
      </>
    )
  }

  let content
  if (isLoading) {
    content = <PageLoading />
  } else if (isError) {
    // TODO: Add error page
    content = <div>에러가 발생했습니다!</div>
  } else if (isSuccess) {
    content = defaultContent()
  }

  return <RowContainer>{content}</RowContainer>
}

export default withRouter(TrackOfBestPage)
