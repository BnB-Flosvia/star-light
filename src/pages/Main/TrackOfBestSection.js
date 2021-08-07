import React from "react"
import styled from "styled-components"
import {
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
import TrackOfBestGridList from "components/TrackOfBestGridList"

const Container = styled.div`
  display: flex;
  flex-flow: column;
  height: fit-content;
  width: 100%;
  padding: ${(props) =>
    props.isSmall ? "24px 20px" : props.isMedium ? "36px 30px" : "54px 36px"};
`

const HeaderSection = styled.div`
  ${(props) => (props.isSmall ? title2Normal : title3Normal)}
  margin-bottom: 1em;
  .sectionTitle {
    padding: 0 16px;
  }
  .sectionSubtitle {
    ${(props) => (props.isSmall ? body3Normal : body1Normal)}
    padding: 1em 16px 2em;
  }
  .subtitle {
    display: flex;
    width: 100%;
    justify-content: flex-start;
    align-items: center;
    ${(props) => (props.isSmall ? body2Normal : title1Normal)}
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
  ${(props) => (props.isSmall ? body3Normal : body2Normal)}
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
    <Container isSmall={isSmallMode} isMedium={isMediumMode}>
      <HeaderSection isSmall={isMediumMode || isSmallMode}>
        <div className="sectionTitle">나만 아는 갓띵곡🎵</div>
        <div className="sectionSubtitle">
          나만 알고있는 숨겨진 명곡을 사람들과 공유해보세요!
        </div>
        <div className="subtitle">
          <span>✨현재 {totalCount}개의 띵곡이 등록되었어요!</span>
          <LinkText isSmall={isMediumMode || isSmallMode} to="/trackOfBest">
            {isSmallMode ? "➡️" : "전체 보러가기"}
          </LinkText>
        </div>
      </HeaderSection>
      <TrackOfBestGridList
        isSmall={isSmallMode}
        isIntialLoading={isLoading}
        list={trackOfBestList}
      />
    </Container>
  )
}

export default TrackOfBestSection
