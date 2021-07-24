import React, { useEffect } from "react"
import { withRouter } from "react-router-dom"
import styled from "styled-components"
import { lightBackgroundColor, primaryColor } from "styles/colors"
import useTrackOfBestDetailPageData from "utils/hooks/trackOfBestDetail/useTrackOfBestDetailPageData"
import { PageLoading } from "components/Spin"
import { body1Normal, body2Normal, title1Normal, body3Normal } from "styles/textTheme"
import YouTube from "react-youtube"
import youtubeUrlParser from "utils/youtubeUrlParser"
import MarkdownPreview from "@uiw/react-markdown-preview"
import { useMediaQuery } from "react-responsive"
import { message } from "antd"
import HeaderSection from "pages/TrackOfBestDetail/HeaderSection"

const RowContainer = styled.div`
  flex: 1;
  display: flex;
  flex-flow: column;
  width: 100%;
  height: 100%;
  justify-content: flex-start;
  align-items: center;
  background: ${lightBackgroundColor};
`

const ContentContainer = styled.div`
  display: flex;
  height: 100%;
  flex-flow: column;
  width: ${(props) => (props.isSmallMode || props.isMediumMode ? "100%" : "720px")};
  padding: ${(props) =>
    props.isSmallMode ? "0 24px" : props.isMediumMode ? "0 40px" : null};
  align-items: center;
  padding-bottom: 40px;
`

const SimplePointText = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  padding: 2.25em 0;
  ${(props) =>
    props.isSmallMode ? body2Normal : props.isMediumMode ? body1Normal : title1Normal}
`

const ChoseReasonContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  padding: 0 2.5em 3.75em;
  .wmde-markdown {
    ${(props) =>
      props.isSmallMode ? body3Normal : props.isMediumMode ? body2Normal : body1Normal};
    line-height: 1.5em;
    text-align: center;
  }
`

const TagSectionContainer = styled.div`
  display: flex;
  padding: 0 2.5em;
  justify-content: flex-start;
  & > div {
    ${(props) =>
      props.isSmallMode ? body3Normal : props.isMediumMode ? body3Normal : body2Normal};
    &:hover {
      color: ${primaryColor};
    }
  }

  & > :not(:last-child) {
    margin-right: 1.25em;
  }
`

function onReady(event) {
  // access to player in all event handlers via event.target
  event.target.pauseVideo()
}

function TrackOfBestDetailPage({ match, history }) {
  const { id } = match.params
  const {
    isLoading,
    isFetchError,
    // isFetchSuccess,
    isDeleteError,
    isDeleteSuccess,
    initialize,
    trackOfBestDetail,
    fetchRequest,
    deleteRequest,
  } = useTrackOfBestDetailPageData()

  useEffect(() => {
    fetchRequest(id)
    return () => {
      initialize()
    }
  }, [initialize, fetchRequest, id])

  useEffect(() => {
    if (isDeleteSuccess) {
      history.goBack()
      message.success("성공적으로 삭제되었습니다.")
    }
  }, [isDeleteSuccess, history])

  useEffect(() => {
    if (isDeleteError) {
      message.error("요청이 실패하였습니다.")
    }
  }, [isDeleteError])

  const isSmallMode = useMediaQuery({
    query: "(max-width: 420px)",
  })
  const isMediumMode = useMediaQuery({
    query: "(min-width: 420px) and (max-width: 768px)",
  })

  const goTagFilterPage = (tag) => {
    history.push(`/trackOfBest?tag=${tag}`)
  }
  const goEditPage = () => {
    history.push(`/trackOfBest/edit?id=${id}`)
  }

  let youtubeVideoWidth
  let youtubeVideoHeight
  if (isSmallMode) {
    youtubeVideoWidth = 280
    youtubeVideoHeight = 200
  } else if (isMediumMode) {
    youtubeVideoWidth = 300
    youtubeVideoHeight = 200
  } else {
    youtubeVideoWidth = 500
    youtubeVideoHeight = 300
  }

  const {
    songName = "",
    artist = "",
    username = "",
    youtubeUrl = "",
    tag: tagList = [],
    // hitCount,
    simplePoint = "",
    choseReason = "",
    isMine = false,
  } = trackOfBestDetail || {}
  const { id: videoId } = youtubeUrlParser(youtubeUrl)

  const defaultContent = (
    <ContentContainer isSmallMode={isSmallMode} isMediumMode={isMediumMode}>
      <HeaderSection
        songName={songName}
        artist={artist}
        username={username}
        isMine={isMine}
        goEditPage={goEditPage}
        deleteRequest={() => deleteRequest(id)}
        isSmallMode={isSmallMode}
        isMediumMode={isMediumMode}
      />
      <YouTube
        videoId={videoId}
        opts={{
          height: youtubeVideoHeight,
          width: youtubeVideoWidth,
          playerVars: {
            autoplay: 1,
          },
        }}
        onReady={onReady}
      />
      <SimplePointText
        isSmallMode={isSmallMode}
        isMediumMode={isMediumMode}
      >{`"${simplePoint}"`}</SimplePointText>
      <ChoseReasonContainer isSmallMode={isSmallMode} isMediumMode={isMediumMode}>
        <MarkdownPreview source={choseReason || ""} />
      </ChoseReasonContainer>
      <TagSectionContainer isSmallMode={isSmallMode} isMediumMode={isMediumMode}>
        {tagList.map((tag) => {
          return (
            <div
              className="tagItem"
              onClick={() => {
                goTagFilterPage(tag)
              }}
            >
              #{tag}
            </div>
          )
        })}
      </TagSectionContainer>
    </ContentContainer>
  )

  let content
  if (isLoading) {
    content = <PageLoading content={defaultContent} />
  } else if (isFetchError) {
    // TODO: Add error page
    content = <div>에러가 발생했습니다!</div>
  } else {
    content = defaultContent
  }
  return <RowContainer>{content}</RowContainer>
}

export default withRouter(TrackOfBestDetailPage)
