import React from "react"
import styled, { css } from "styled-components"
import range from "utils/range"
import TrackOfBestListItem from "components/TrackOfBestListItem"

const GridContainer = styled.div`
  display: grid;
  width: 100%;
  ${(props) =>
    props.isSmall
      ? css`
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        `
      : css`
          grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
        `};
`

export default function TrackOfBestGridList({ isSmall, isIntialLoading, list }) {
  const getTrackOfBestListItem = () => {
    if (isIntialLoading) {
      return range(1, 5).map((_) => {
        return <TrackOfBestListItem isLoading />
      })
    }

    return list.map((item) => {
      const { id, songName, artist, simplePoint, username, coverImage, youtubeUrl } = item
      return (
        <TrackOfBestListItem
          id={id}
          title={songName}
          artist={artist}
          summaryContent={simplePoint}
          nickname={username}
          coverImage={coverImage}
          youtubeUrl={youtubeUrl}
        />
      )
    })
  }

  return <GridContainer isSmall={isSmall}>{getTrackOfBestListItem()}</GridContainer>
}
