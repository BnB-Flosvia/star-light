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
import {
  body1Normal,
  title2Normal,
  body2Normal,
  title1Normal,
  body3Normal,
  label2Normal,
} from "styles/textTheme"
import YouTube from "react-youtube"
import youtubeUrlParser from "utils/youtubeUrlParser"
import MarkdownPreview from "@uiw/react-markdown-preview"
import { MoreVertIconButton } from "components/IconButtons"
import Dropdown from "components/Dropdown"
import { useMediaQuery } from "react-responsive"

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

const HeaderSection = styled.div`
  display: flex;
  flex-flow: column;
  width: 100%;
  margin-bottom: 40px;
  border-bottom: 1px solid ${borderColor};
  .title {
    display: flex;
    width: 100%;
    justify-content: center;
    padding-top: 1.5em;
    ${(props) =>
      props.isSmallMode ? body1Normal : props.isMediumMode ? title1Normal : title2Normal}
  }
  .subtitle {
    display: flex;
    width: 100%;
    justify-content: center;
    ${(props) =>
      props.isSmallMode ? body3Normal : props.isMediumMode ? body2Normal : body1Normal};
    color: ${secondaryTextColor};
    padding-top: 0.75em;
  }
  .nicknameAndMore {
    display: flex;
    width: 100%;
    justify-content: flex-end;
    align-items: center;
    ${(props) =>
      props.isSmallMode ? label2Normal : props.isMediumMode ? body3Normal : body2Normal}
    padding: 0.5em 1.5em 0.75em;
    margin: ${(props) => (!props.isMine ? "2px 0" : null)};
    .nickname {
      .boldText {
        font-weight: bold;
      }
    }
    .moreButtonDropdown {
      margin-left: 10px;
    }
  }
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
    margin-right: 1.25em;
    ${(props) =>
      props.isSmallMode ? body3Normal : props.isMediumMode ? body3Normal : body2Normal};
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

  const isSmallMode = useMediaQuery({
    query: "(max-width: 420px)",
  })
  const isMediumMode = useMediaQuery({
    query: "(min-width: 420px) and (max-width: 768px)",
  })

  const goTagFilterPage = (tag) => {
    history.push(`/trackOfBest?tag=${tag}`)
  }

  const moreButtonMenu = [
    {
      name: "수정하기",
      onClick: () => {
        history.push("/trackOfBest/edit")
      },
    },
    {
      name: "삭제하기",
      onClick: () => {},
    },
  ]

  const onMoreButtonClick = ({ onClick }) => {
    return <MoreVertIconButton className="moreIcon" onClick={onClick} />
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
        isSmallMode={isSmallMode}
        isMediumMode={isMediumMode}
        isMine={isMine}
      >
        <div className="title">{songName}</div>
        <div className="subtitle">{artist}</div>
        {username && (
          <div className="nicknameAndMore">
            <span className="nickname">
              <span className="boldText">{username}</span>님 추천곡
            </span>
            {!isSmallMode && !isMediumMode && isMine && (
              <Dropdown
                className="moreButtonDropdown"
                buildCustomButton={onMoreButtonClick}
                menus={moreButtonMenu}
                placement="bottom-start"
                offset={[0, 10]}
              />
            )}
          </div>
        )}
      </HeaderSection>
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
        <MarkdownPreview source={choseReason.replaceAll("\n", "<br>")} />
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
  } else if (isError) {
    // TODO: Add error page
    content = <div>에러가 발생했습니다!</div>
  } else if (isSuccess) {
    content = defaultContent
  }
  return <RowContainer>{content}</RowContainer>
}

export default withRouter(TrackOfBestDetailPage)
