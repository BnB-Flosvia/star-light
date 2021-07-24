import RadioButton from "components/RadioButton"
import React, { useState, useEffect, useCallback, useMemo } from "react"
import styled, { css } from "styled-components"
import {
  darkPrimaryColor,
  darkPrimaryColor2,
  interactionColor,
  primaryTextColor,
  secondaryTextColor,
} from "styles/colors"
import { body3Normal, body2Normal } from "styles/textTheme"
import youtubeUrlParser from "utils/youtubeUrlParser"
import getCroppedImg from "utils/imageCropper"
import Cropper from "react-easy-crop"
import { Switch } from "antd"
import { DarkSmallButton } from "components/Buttons"

const Container = styled.div`
  display: flex;
  flex-flow: column;
  width: 100%;
`

const CroppedImageContainer = styled.div`
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

const ImageWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  width: 240px;
  height: 240px;
  background: #ddd;
  .placeholder {
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
    ${body3Normal}
    color: ${secondaryTextColor};
    line-height: 16px;
    padding: 20px;
  }
`

const ImageContainer = styled.div`
  width: ${(props) => (props.size ? props.size : "240px")};
  height: ${(props) => (props.size ? props.size : "240px")};
  ${(props) => (props.imgUrl ? backgroundImage : null)};
  background-color: #ededed;
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
  .fileButtonWrapper {
    display: flex;
    flex: 1;
    align-items: flex-end;
    & > button {
      margin-right: 12px;
    }
  }
`

const UploadLabel = styled.label`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 120px;
  height: 40px;
  border-radius: 4px;
  ${body3Normal}
  color: #fff;
  background: ${darkPrimaryColor};
  &:hover {
    background: ${interactionColor};
    color: ${primaryTextColor};
    font-weight: 700;
  }
`

const FileInput = styled.input`
  display: none;
`

const CropperContainer = styled.div`
  position: relative;
  width: 100%;
  height: 300px;
  background: #ddd;
  margin-bottom: 30px;
  .placeholder {
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
    ${body2Normal}
    color: ${secondaryTextColor};
  }
`

const SwitchSection = styled.div`
  display: flex;
  align-items: center;
  & > span {
    ${body2Normal}
    padding-right: 10px;
  }
  padding-bottom: 14px;
`

export default function CoverImageContainer({
  defaultImage,
  value: imageBlob,
  onChange,
  youtubeUrl,
  imageFile,
  setImageFile,
  mode,
}) {
  const sizeOptions = [
    { id: "240px", name: "240px" },
    { id: "180px", name: "180px" },
    { id: "120px", name: "120px" },
  ]
  const [isCropMode, setIsCropMode] = useState(() => {
    if (mode === "update") {
      return false
    }
    return true
  })
  const [imageSize, setImageSize] = useState(sizeOptions[0]?.id)
  const [url, setUrl] = useState(null)
  const [crop, setCrop] = useState({ x: 0, y: 0 })

  const showCroppedImage = useCallback(
    async (newCroppedAreaPixels) => {
      try {
        const newCroppedImage = await getCroppedImg(url, newCroppedAreaPixels)
        onChange(newCroppedImage)
      } catch (error) {
        onChange(null)
      }
    },
    [onChange, url]
  )

  const onCropComplete = useCallback(
    (_croppedArea, newCroppedAreaPixels) => {
      showCroppedImage(newCroppedAreaPixels)
    },
    [showCroppedImage]
  )

  const setCoverImage = (event) => {
    const newImage = (event?.target?.files || [])[0]

    if (newImage != null && setImageFile != null) {
      setImageFile(newImage)

      const reader = new FileReader()
      reader.onload = () => {
        onChange(reader.result)
        setUrl(reader.result)
      }
      reader.readAsDataURL(newImage)
    }
  }

  const setDefaultImage = () => {
    if (youtubeUrl != null) {
      const { id, thumbnailUrl } = youtubeUrlParser(youtubeUrl)
      if (id != null) {
        setUrl(thumbnailUrl)
        onChange(thumbnailUrl)
      }
    } else {
      setUrl(null)
      onChange(null)
    }
    setImageFile(null)
  }

  const onIsCropModeChanged = (checked) => {
    if (checked === false) {
      onChange(url)
    } else {
      onChange(null)
    }
    setIsCropMode(() => checked)
  }

  const imageBoxUrl = useMemo(() => {
    if (!isCropMode && imageBlob == null) {
      return url
    }
    return imageBlob
  }, [imageBlob, isCropMode, url])

  useEffect(() => {
    if (defaultImage != null) {
      // set default image url (s3)
      setUrl(defaultImage)
    } else if (imageFile instanceof File) {
      const reader = new FileReader()

      reader.onload = () => {
        setUrl(reader.result)
      }

      reader.readAsDataURL(imageFile)
    } else if (youtubeUrl != null) {
      // if this mode is not update or don't have default image url,
      // check youtube url and set youtube thumbnail as default image
      const { id, thumbnailUrl } = youtubeUrlParser(youtubeUrl)
      if (id != null) {
        setUrl(thumbnailUrl)
      }
    } else {
      setUrl(null)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultImage, youtubeUrl])

  return (
    <Container>
      {/* TODO: Add zoom feature */}
      {url != null && (
        <SwitchSection>
          <span>이미지 자르기</span>
          {isCropMode ? (
            <Switch defaultChecked onChange={onIsCropModeChanged} />
          ) : (
            <Switch defaultChecked={false} onChange={onIsCropModeChanged} />
          )}
        </SwitchSection>
      )}
      {isCropMode && (
        <CropperContainer>
          {url != null ? (
            <Cropper
              image={url}
              crop={crop}
              zoom={1}
              rotation={0}
              aspect={1}
              onCropChange={setCrop}
              onCropComplete={onCropComplete}
            />
          ) : (
            <div className="placeholder">이미지 자르기가 ON 상태일 경우 표시됩니다.</div>
          )}
        </CropperContainer>
      )}
      <CroppedImageContainer>
        <ImageWrapper className="imageContainer">
          {url != null ? (
            <ImageContainer imgUrl={imageBoxUrl} size={imageSize} />
          ) : (
            <div className="placeholder">
              커버 이미지로 사용될 이미지가 표시됩니다. 우측에 위치한 사이즈 버튼을
              사용하면 다양한 사이즈의 이미지를 확인할 수 있습니다.
            </div>
          )}
        </ImageWrapper>
        <ButtonGroupWrapper>
          <RadioButton
            items={sizeOptions}
            selectedId={imageSize}
            onChange={(id) => {
              setImageSize(id)
            }}
          />
          <div className="fileButtonWrapper">
            <DarkSmallButton onClick={setDefaultImage}>
              기본 이미지로 설정
            </DarkSmallButton>
            <UploadLabel htmlFor="upload-cover">이미지 가져오기</UploadLabel>
            <FileInput
              accept=".jpg, .jpeg, .png"
              type="file"
              id="upload-cover"
              name="upload-cover"
              onChange={setCoverImage}
            />
          </div>
        </ButtonGroupWrapper>
      </CroppedImageContainer>
    </Container>
  )
}
