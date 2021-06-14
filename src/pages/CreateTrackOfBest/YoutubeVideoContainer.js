import React from "react"
import styled from "styled-components"
import YouTube from "react-youtube"
import { secondaryTextColor } from "styles/colors"
import { SearchInput } from "components/Inputs"
import { body2Normal } from "styles/textTheme"
import youtubeUrlParser from "utils/youtubeUrlParser"

const YoutubeContentContainer = styled.div`
  display: flex;
  flex-flow: column;
  width: 100%;
  .urlInput {
    margin-bottom: 24px;
  }
`

const SampleContainer = styled.div`
  display: flex;
  width: 500px;
  height: 300px;
  border: 1px dashed ${secondaryTextColor};
  justify-items: center;
  align-items: center;
  ${body2Normal}
  color: ${secondaryTextColor};
  text-align: center;
  & > div {
    width: 100%;
  }
`

function onReady(event) {
  // access to player in all event handlers via event.target
  event.target.pauseVideo()
}

export default function YoutubeVideoContent({ onChange, value: url, error, setError }) {
  let youtubePlayer
  if (url != null) {
    const { id } = youtubeUrlParser(url)

    if (id != null) {
      youtubePlayer = (
        <YouTube
          videoId={id}
          opts={{
            height: "300",
            width: "500",
            playerVars: {
              autoplay: 1,
            },
          }}
          onReady={onReady}
          /*
          onError={() => {
            onChange(null)
            setPlayerError("유튜브 플레이어가 동작하지 않습니다.")
          }}
          */
        />
      )
    } else {
      setError("유효하지 않은 url 입니다.")
      youtubePlayer = (
        <SampleContainer>
          <div>유튜브 url을 입력하면 유튜브 플레이어가 표시됩니다.</div>
        </SampleContainer>
      )
    }
  } else {
    youtubePlayer = (
      <SampleContainer>
        <div>유튜브 url을 입력하면 유튜브 플레이어가 표시됩니다.</div>
      </SampleContainer>
    )
  }

  return (
    <YoutubeContentContainer>
      <SearchInput
        placeholderText="유튜브 url 입력"
        onSearch={(value) => {
          onChange(value)
        }}
        className="urlInput"
        errorText={error}
      />
      {youtubePlayer}
    </YoutubeContentContainer>
  )
}
