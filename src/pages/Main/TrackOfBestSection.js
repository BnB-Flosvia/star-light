import React from "react"
import styled from "styled-components"
import TrackOfBestListItem from "components/TrackOfBestListItem"
import {
  label2Normal,
  title1Normal,
  title2Normal,
  title3Normal,
  body3Normal,
  body1Normal,
  body2Normal,
} from "styles/textTheme"
import { borderColor } from "styles/colors"
import useTrackOfBestData from "utils/hooks/main/useTrackOfBestData"
import { useMediaQuery } from "react-responsive"

const Container = styled.div`
  display: flex;
  flex-flow: column;
  height: fit-content;
  width: 100%;
`

const HeaderSection = styled.div`
  ${(props) =>
    props.isSmall ? title1Normal : props.isMedium ? title2Normal : title3Normal}
  margin: 1em;
  .sectionTitle {
    padding: 0 16px;
  }
  .sectionSubtitle {
    ${(props) =>
      props.isSmall ? label2Normal : props.isMedium ? body3Normal : body1Normal}
    padding: 1em 16px 2em;
  }
  .subtitle {
    ${(props) =>
      props.isSmall ? body3Normal : props.isMedium ? body2Normal : title1Normal}
    padding: 1em 16px;
    border-bottom: 1px solid ${borderColor};
    border-top: 1px solid ${borderColor};
  }
`

const GridContainer = styled.div`
  display: grid;
  padding: ${(props) =>
    props.isSmall ? "0 20px 24px" : props.isMedium ? "0 48px 30px" : "0 54px 36px"};
  width: 100%;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
`

export default function TrackOfBestSection() {
  const { trackOfBestList } = useTrackOfBestData()

  const isSmallMode = useMediaQuery({
    query: "(max-width: 360px)",
  })
  const isMediumMode = useMediaQuery({
    query: "(min-width: 360px) and (max-width: 768px)",
  })

  return (
    <Container>
      <HeaderSection isSmall={isSmallMode} isMedium={isMediumMode}>
        <div className="sectionTitle">나만 아는 갓띵곡🎵</div>
        <div className="sectionSubtitle">
          혼자 듣기 아까운 숨겨진 명곡을 사람들과 공유해보세요!
        </div>
        <div className="subtitle">✨현재 20개의 띵곡이 등록되었어요!</div>
      </HeaderSection>
      <GridContainer isSmall={isSmallMode} isMedium={isMediumMode}>
        {trackOfBestList.map((item) => {
          const { songName, artist, simplePoint, username, tag } = item
          return (
            <TrackOfBestListItem
              title={songName}
              artist={artist}
              summaryContent={simplePoint}
              nickname={username}
              tags={tag}
            />
          )
        })}
      </GridContainer>
    </Container>
  )
}
