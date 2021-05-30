import React from "react"
import styled, { css } from "styled-components"
import {
  interactionColor,
  secondaryTextColor,
  backgroundColor1,
  highlightTextColor,
  lightBackgroundColor,
} from "styles/colors"
import { body1Bold, body3Normal, label3Normal } from "styles/textTheme"

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
  `

const ImageContainer = styled.div`
  width: 100%;
  &:after {
    content: "";
    display: block;
    padding-bottom: 100%;
    ${(props) => (props.imgUrl ? backgroundImage : null)};
    background-color: ${interactionColor};
  }
`

const ContentWrapper = styled.div`
  display: flex;
  flex-flow: column;
  width: 100%;
  padding: 6px 0px 6px 20px;
  .title {
    ${body1Bold}
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

export default function TrackOfBestListItem({
  title,
  artist,
  summaryContent,
  nickname,
  imageUrl,
  // tags = [],
}) {
  // TODO: check user type => set correct icon
  // This is default user icon
  const icon = "🦄"

  return (
    <ItemContainer>
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
