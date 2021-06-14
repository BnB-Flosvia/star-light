import RadioButton from "components/RadioButton"
import React, { useState, useEffect } from "react"
import styled, { css } from "styled-components"
import { darkPrimaryColor, darkPrimaryColor2 } from "styles/colors"
import { body3Normal } from "styles/textTheme"
import youtubeUrlParser from "utils/youtubeUrlParser"

const Container = styled.div`
  display: flex;
  justify-content: flex-start;
  .imageContainer {
    margin-right: 40px;
  }
`

const backgroundImage = (props) =>
  css`
    background-image: url(${props.imgUrl});
    background-repeat: no-repeat;
    background-size: cover;
  `

const ImageContainer = styled.div`
  width: ${(props) => (props.size ? props.size : "240px")};
  height: ${(props) => (props.size ? props.size : "240px")};
  ${(props) => (props.imgUrl ? backgroundImage : null)};
  background-color: #ddd;
`

const ButtonGroupWrapper = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: flex-start;
  align-items: flex-start;
  & > :first-child {
    margin-bottom: 24px;
  }
  .infoText {
    ${body3Normal}
    color: ${darkPrimaryColor2};
    padding-bottom: 8px;
  }
  min-height: 240px;
`

const UploadLabel = styled.label`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 120px;
  height: 40px;
  border-radius: 4px;
  border: 1px solid ${darkPrimaryColor};
`

const FileInput = styled.input`
  display: none;
`

export default function CoverImageContainer({ value: image, onChange, youtubeUrl }) {
  const modeOptions = [
    { id: "default", name: "기본" },
    { id: "custom", name: "커스텀" },
  ]
  const sizeOptions = [
    { id: "240px", name: "240px" },
    { id: "180px", name: "180px" },
    { id: "120px", name: "120px" },
  ]
  const [mode, setMode] = useState(modeOptions[0]?.id)
  const [imageSize, setImageSize] = useState(sizeOptions[0]?.id)
  const [url, setUrl] = useState(null)

  const setCoverImage = (event) => {
    const newImage = (event?.target?.files || [])[0]

    if (newImage != null && onChange != null) {
      onChange(newImage)
    }
  }

  useEffect(() => {
    if (mode === "default") {
      // Get default image (youtube thumbnail)
      if (youtubeUrl != null) {
        const { id, thumbnailUrl } = youtubeUrlParser(youtubeUrl)
        if (id != null) {
          setUrl(thumbnailUrl)
        }
      }
    } else if (image instanceof File) {
      const reader = new FileReader()

      reader.onload = () => {
        setUrl(reader.result)
      }

      reader.readAsDataURL(image)
    } else if (image != null) {
      // Get image from s3
      setUrl(`${image?.path}/${image?.name}`)
    } else {
      setUrl(null)
    }
  }, [image, mode, youtubeUrl, setUrl])

  return (
    <Container>
      <ImageContainer className="imageContainer" imgUrl={url} size={imageSize} />
      <ButtonGroupWrapper>
        <RadioButton
          items={modeOptions}
          selectedId={mode}
          onChange={(id) => {
            setMode(id)
          }}
        />
        <RadioButton
          items={sizeOptions}
          selectedId={imageSize}
          onChange={(id) => {
            setImageSize(id)
          }}
        />
        <div style={{ display: "flex", flex: 1, alignItems: "flex-end" }}>
          {mode === "default" ? (
            <div className="infoText">기본 이미지는 유튜브 영상 썸네일로 설정됩니다.</div>
          ) : (
            <>
              <UploadLabel htmlFor="upload-cover">이미지 가져오기</UploadLabel>
              <FileInput
                accept=".jpg, .jpeg, .png"
                type="file"
                id="upload-cover"
                name="upload-cover"
                onChange={setCoverImage}
              />
            </>
          )}
        </div>
      </ButtonGroupWrapper>
    </Container>
  )
}
