import React from "react"
import styled, { css } from "styled-components"
import { primaryTextColor } from "styles/colors"
import { body1Bold, body3Normal, label3Normal } from "styles/textTheme"

const ItemContainer = styled.div`
  display: flex;
  padding: 20px;
  border: 1px solid ${primaryTextColor};
  max-width: 450px;
`

const imageUrl = (props) =>
  css`
    content: url(${props.imgUrl});
  `

const ImageContainer = styled.div`
  width: 100%;
  &:after {
    ${imageUrl}
    display: block;
    padding-bottom: 100%;
    background: lightblue;
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
    & > span {
      font-weight: 700;
    }
  }
`

export default function TrackOfBestListItem({
  title,
  artist,
  summaryContent,
  nickname,
  // tags = [],
}) {
  // TODO: check user type => set correct icon
  // This is default user icon
  const icon = "🦄"
  return (
    <ItemContainer>
      <ImageContainer imgUrl="https://i1.sndcdn.com/avatars-zEdpVq2f7k6eILLR-zzNFQQ-t240x240.jpg" />
      <ContentWrapper>
        <div className="title">{title}</div>
        <div className="artist">{artist}</div>
        <div className="summaryContent">
          {icon}: {summaryContent}
        </div>
        <div className="writerSection">
          <span>{nickname}</span>님의 추천곡
        </div>
      </ContentWrapper>
    </ItemContainer>
  )
}
