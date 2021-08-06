import React from "react"
import styled, { css } from "styled-components"
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
import { Link } from "react-router-dom"
import range from "utils/range"

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
    display: flex;
    width: 100%;
    justify-content: flex-start;
    align-items: center;
    ${(props) =>
      props.isSmall ? body3Normal : props.isMedium ? body2Normal : title1Normal}
    padding: 1em 16px;
    border-bottom: 1px solid ${borderColor};
    border-top: 1px solid ${borderColor};
  }
`

const LinkText = styled(Link)`
  display: flex;
  height: 100%;
  align-items: center;
  padding-left: 2em;
  text-decoration: underline;
  ${(props) =>
    props.isSmall ? label2Normal : props.isMedium ? body3Normal : body2Normal}
`

const GridContainer = styled.div`
  display: grid;
  padding: ${(props) =>
    props.isSmall ? "0 20px 24px" : props.isMedium ? "0 36px 30px" : "0 54px 36px"};
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

function TrackOfBestSection() {
  const { isLoading, trackOfBestList, totalCount = 0 } = useTrackOfBestData()

  const isSmallMode = useMediaQuery({
    query: "(max-width: 420px)",
  })
  const isMediumMode = useMediaQuery({
    query: "(min-width: 420px) and (max-width: 768px)",
  })

  return (
    <Container>
      <HeaderSection isSmall={isSmallMode} isMedium={isMediumMode}>
        <div className="sectionTitle">나만 아는 갓띵곡🎵</div>
        <div className="sectionSubtitle">
          혼자 듣기 아까운 숨겨진 명곡을 사람들과 공유해보세요!
        </div>
        <div className="subtitle">
          <span>✨현재 {totalCount}개의 띵곡이 등록되었어요!</span>
          <LinkText isSmall={isSmallMode} isMedium={isMediumMode} to="/trackOfBest">
            전체 보러가기
          </LinkText>
        </div>
      </HeaderSection>
      <GridContainer isSmall={isSmallMode} isMedium={isMediumMode}>
        {isLoading
          ? range(1, 5).map((_) => {
              return <TrackOfBestListItem isLoading />
            })
          : trackOfBestList.map((item) => {
              const {
                id,
                songName,
                artist,
                simplePoint,
                username,
                coverImage,
                youtubeUrl,
              } = item
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
            })}
      </GridContainer>
    </Container>
  )
}

export default TrackOfBestSection
