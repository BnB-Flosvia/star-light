import React from "react"
import styled, { css } from "styled-components"
import {
  secondaryTextColor,
  backgroundColor1,
  highlightTextColor,
  lightBackgroundColor,
} from "styles/colors"
import { body1Bold, body3Normal, label3Normal } from "styles/textTheme"
import { withRouter } from "react-router-dom"

const ItemContainer = styled.div`
  display: flex;
  padding: 20px;
  border: 1px solid ${secondaryTextColor};
  background-color: ${lightBackgroundColor};
  &:hover {
    background-color: ${backgroundColor1};
  }
`

const backgroundImage = (props) =>
  css`
    background-image: url(${props.imgUrl});
    background-repeat: no-repeat;
    background-size: cover;
  `

const ImageContainer = styled.div`
  width: 100%;
  &:after {
    content: "";
    display: block;
    padding-bottom: 100%;
    ${(props) => (props.imgUrl ? backgroundImage : null)};
    background-color: #ddd;
  }
`

const ContentWrapper = styled.div`
  display: flex;
  flex-flow: column;
  width: 100%;
  padding: 6px 0px 6px 20px;
  .title {
    ${body1Bold}
    max-width: 160px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    padding-bottom: 8px;
  }
  .artist {
    ${body3Normal}
    padding-bottom: 16px;
  }
  .summaryContent {
    ${body3Normal}
    line-height: 16px;
  }
  .writerSection {
    display: flex;
    flex: 1;
    align-items: flex-end;
    ${label3Normal}
    color: ${highlightTextColor};
    & > span {
      white-space: nowrap;
    }
    .nickname {
      white-space: nowrap;
      font-weight: 700;
    }
  }
`

const LoadingItem = styled.div`
  display: flex;
  padding: 20px;
  border: 1px solid ${secondaryTextColor};
  background-color: ${lightBackgroundColor};
  .container {
    width: 100%;
    &:after {
      content: "";
      display: block;
      padding-bottom: 100%;
      background-color: #ddd;
    }
  }
`

function TrackOfBestListItem({
  isLoading,
  id,
  title,
  artist,
  summaryContent,
  nickname,
  imageUrl,
  history,
  // tags = [],
}) {
  // TODO: check user type => set correct icon
  // This is default user icon
  const icon = "🦄"

  if (isLoading) {
    return (
      <LoadingItem>
        <div className="container" />
        <div className="container" />
      </LoadingItem>
    )
  }

  return (
    <ItemContainer
      onClick={() => {
        history.push(`/trackOfBest/${id}`)
      }}
    >
      <ImageContainer imgUrl={imageUrl} />
      <ContentWrapper>
        <div className="title">{title}</div>
        <div className="artist">{artist}</div>
        <div className="summaryContent">
          {icon}: {summaryContent}
        </div>
        <div className="writerSection">
          <span className="nickname">{nickname}</span>
          <span>님의 추천곡 🎧</span>
        </div>
      </ContentWrapper>
    </ItemContainer>
  )
}

export default withRouter(TrackOfBestListItem)
