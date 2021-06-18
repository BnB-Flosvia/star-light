import React, { useEffect } from "react"
import { withRouter } from "react-router-dom"
import styled from "styled-components"
import {
  lightBackgroundColor,
  secondaryTextColor,
  borderColor,
  primaryColor,
} from "styles/colors"
import useTrackOfBestDetailPageData from "utils/hooks/trackOfBestDetail/useTrackOfBestDetailPageData"
import { PageLoading } from "components/Spin"
import { body1Normal, title2Normal, body2Normal, title1Normal } from "styles/textTheme"
import YouTube from "react-youtube"
import youtubeUrlParser from "utils/youtubeUrlParser"
import MarkdownPreview from "@uiw/react-markdown-preview"

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
  flex-flow: column;
  width: 720px;
  align-items: center;
  padding-bottom: 40px;
`

const HeaderSection = styled.div`
  display: flex;
  flex-flow: column;
  width: 100%;
  padding: 36px 24px 0;
  margin-bottom: 40px;
  border-bottom: 1px solid ${borderColor};
  .title {
    display: flex;
    width: 100%;
    justify-content: center;
    ${title2Normal}
  }
  .subtitle {
    display: flex;
    width: 100%;
    justify-content: center;
    ${body1Normal}
    color: ${secondaryTextColor};
    margin-top: 12px;
  }
  .nickname {
    display: flex;
    width: 100%;
    justify-content: flex-end;
    ${body2Normal}
    padding: 10px 0 12px;
    .boldText {
      font-weight: bold;
    }
  }
`

const SimplePointText = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  padding: 44px 0px 46px;
  ${title1Normal}
`

const ChoseReasonContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 0 100px 60px;
  .wmde-markdown {
    ${body1Normal}
    line-height: 24px;
    text-align: center;
  }
`

const TagSectionContainer = styled.div`
  display: flex;
  width: 500px;
  justify-content: flex-start;
  & > div {
    margin-right: 16px;
    ${body2Normal}
    &:hover {
      color: ${primaryColor};
    }
  }
`

function onReady(event) {
  // access to player in all event handlers via event.target
  event.target.pauseVideo()
}

function TrackOfBestDetailPage({ match, history }) {
  const { id } = match.params
  const { isLoading, isError, isSuccess, initialize, trackOfBestDetail, fetchRequest } =
    useTrackOfBestDetailPageData()

  useEffect(() => {
    fetchRequest(id)
    return () => {
      initialize()
    }
  }, [initialize, fetchRequest, id])

  const goTagFilterPage = (tag) => {
    history.push(`/trackOfBest?tag=${tag}`)
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
  } = trackOfBestDetail || {}
  const { id: videoId } = youtubeUrlParser(youtubeUrl)
  const defaultContent = (
    <ContentContainer>
      <HeaderSection>
        <div className="title">{songName}</div>
        <div className="subtitle">{artist}</div>
        {username && (
          <div className="nickname">
            <span className="boldText">{username}</span>님 추천곡
          </div>
        )}
      </HeaderSection>
      <YouTube
        videoId={videoId}
        opts={{
          height: "300",
          width: "500",
          playerVars: {
            autoplay: 1,
          },
        }}
        onReady={onReady}
      />
      <SimplePointText>{`"${simplePoint}"`}</SimplePointText>
      <ChoseReasonContainer>
        <MarkdownPreview source={choseReason.replaceAll("\n", "<br>")} />
      </ChoseReasonContainer>
      <TagSectionContainer>
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
  } else if (isError) {
    // TODO: Add error page
    content = <div>에러가 발생했습니다!</div>
  } else if (isSuccess) {
    content = defaultContent
  }
  return <RowContainer>{content}</RowContainer>
}

export default withRouter(TrackOfBestDetailPage)
