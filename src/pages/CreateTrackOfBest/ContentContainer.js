import ContentEditor from "components/ContentEditor"
import InfoTooltip from "components/InfoTooltip"
import { OutlineInput } from "components/Inputs"
import TagSelectInput from "components/TagSelectInput"
import { isEmpty } from "lodash-es"
import React from "react"
import styled from "styled-components"
import {
  borderColor,
  secondaryTextColor,
  warningColor,
  backgroundColor1,
  interactionColor,
} from "styles/colors"
import { title1Normal, body3Normal, body2Bold, body3Bold } from "styles/textTheme"
import CoverImageContainer from "./CoverImageContainer"
import YoutubeVideoContent from "./YoutubeVideoContainer"

const Container = styled.div`
  display: flex;
  flex-flow: column;
  max-width: 720px;
`

const SectionContainer = styled.div`
  display: flex;
  flex-flow: column;
  border-top: 1px solid ${borderColor};
  padding: 30px 40px;
  .title {
    display: flex;
    align-items: center;
    ${title1Normal}
    padding-bottom: ${(props) => (props.hasSubtitle ? "12px" : "20px")};
    .required {
      color: ${warningColor};
    }
    svg {
      margin-left: 10px;
    }
  }
  .subtitle {
    ${body3Normal}
    color: ${secondaryTextColor};
    padding-bottom: 20px;
  }
`

const RowContainer = styled.div`
  display: flex;
  width: 100%;
  & > :not(:last-child) {
    margin-right: 20px;
  }
  .input {
    display: flex;
    width: 300px;
    flex-flow: column;
  }
`

const PopularTagContainer = styled.div`
  display: flex;
  flex-flow: column;
  width: 200px;
  min-height: 200px;
  border: 1px dashed ${secondaryTextColor};
  background: ${backgroundColor1};
  padding: 18px 16px 8px 0px;
  margin-left: 40px;
  .title {
    padding: 0px 16px 16px;
    ${body2Bold}
  }
  .tagContainer {
    display: flex;
    width: 100%;
    height: 100%;
    & > div {
      margin-left: 16px;
      margin-bottom: 10px;
    }
    flex-wrap: wrap;
  }
  .emptyView {
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
    ${body3Normal}
    color: ${secondaryTextColor};
  }
`

const TagItem = styled.div`
  display: flex;
  padding: 6px 12px;
  ${body3Bold}
  background: ${interactionColor};
`

export default function ContentContainer({
  headerSection,
  onChange,
  form,
  setImageFile,
  imageFile,
  tagOptions = [],
  popularTagOptions = [],
  setError,
  defaultValue,
  mode,
}) {
  const contentList = [
    {
      title: "가수명 / 곡제목",
      contentBuilder: () => {
        return (
          <RowContainer>
            <OutlineInput
              className="input"
              labelText="가수명"
              placeholderText="가수명 입력"
              errorText={form.fields.artist.error}
              onChange={(value) => onChange("artist", value)}
              defaultValue={defaultValue?.artist || form.fields.artist.value}
            />
            <OutlineInput
              className="input"
              labelText="곡제목"
              placeholderText="곡제목 입력"
              errorText={form.fields.songName.error}
              onChange={(value) => onChange("songName", value)}
              defaultValue={defaultValue?.songName || form.fields.songName.value}
            />
          </RowContainer>
        )
      },
      required: true,
    },
    {
      title: "이 곡의 특징 간단 설명",
      subtitle:
        "ex) 여행갈 때 듣기 좋은 노래, 여름하면 떠오르는 청량갑 노래, 몸이 먼저 반응하는 신나는 노래",
      contentBuilder: () => {
        return (
          <OutlineInput
            placeholderText="내용 입력"
            errorText={form.fields.simplePoint.error}
            onChange={(value) => onChange("simplePoint", value)}
            maxLength={20}
            defaultValue={defaultValue?.simplePoint || form.fields.simplePoint.value}
          />
        )
      },
      required: true,
    },
    {
      title: "이 곡이 띵곡인 이유",
      contentBuilder: () => {
        return (
          <ContentEditor
            onChange={(value) => onChange("choseReason", value)}
            errorText={form.fields.choseReason.error}
            value={defaultValue?.choseReason || form?.fields.choseReason.value}
          />
        )
      },
      required: true,
    },
    {
      title: "유튜브 링크 첨부",
      contentBuilder: () => {
        return (
          <YoutubeVideoContent
            onChange={(value) => onChange("youtubeUrl", value)}
            value={form.fields.youtubeUrl.value || defaultValue?.youtubeUrl}
            error={form.fields.youtubeUrl.error}
            setError={(value) => setError("youtubeUrl", value)}
          />
        )
      },
      required: true,
      infoText: (
        <span>
          내가 선택한 띵곡을 들을 수 있는 유튜브
          <br /> 동영상의 url을 입력해주세요!
        </span>
      ),
    },
    {
      title: "커버 이미지 첨부",
      subtitle: "기본 이미지는 유튜브 영상 썸네일로 설정됩니다.",
      contentBuilder: () => {
        return (
          <CoverImageContainer
            defaultImage={defaultValue?.coverImage}
            onChange={(value) => onChange("coverImageData", value)}
            value={form.fields.coverImageData.value}
            youtubeUrl={form.fields.youtubeUrl.value || defaultValue?.youtubeUrl}
            imageFile={imageFile}
            setImageFile={setImageFile}
            mode={mode}
          />
        )
      },
      infoText: (
        <span>
          목록에서 표시될 커버 이미지를 선택해주세요!
          <br /> 커버 이미지를 선택하지 않을 경우, 유튜브 영상
          <br /> 썸네일로 자동설정됩니다.
        </span>
      ),
    },
    {
      title: "태그 선택",
      contentBuilder: () => {
        return (
          <div style={{ display: "flex", width: "100%", paddingBottom: "20px" }}>
            <TagSelectInput
              options={tagOptions.map((item) => {
                return { value: item }
              })}
              placeholder="태그를 선택해주세요"
              notFoundContent={<div>존재하지 않는 태그명입니다.</div>}
              width={300}
              onChange={(value) => onChange("tag", value)}
              value={defaultValue?.tag || form.fields.tag.value || []}
              mode="tags"
            />
            <PopularTagContainer>
              <div className="title">🔥 인기태그 🔥</div>
              <div className="tagContainer">
                {isEmpty(popularTagOptions) ? (
                  <div className="emptyView">인기 태그가 없습니다.</div>
                ) : (
                  popularTagOptions.map((item) => {
                    return <TagItem>{item}</TagItem>
                  })
                )}
              </div>
            </PopularTagContainer>
          </div>
        )
      },
      infoText: (
        <span>
          이 곡에 어울리는 태그를 선택해주세요!
          <br />
          태그를 등록하시면 검색 기능, 투표 기능 등을 <br />
          이용하실 수 있습니다!
        </span>
      ),
    },
  ]

  return (
    <Container>
      {headerSection}
      {contentList.map((item) => {
        const { title, subtitle, required, contentBuilder, infoText } = item
        return (
          <SectionContainer hasSubtitle={subtitle != null} isRequired={required || false}>
            <div className="title">
              {title}
              {required && <span className="required">*</span>}
              {infoText && <InfoTooltip tooltipText={infoText} />}
            </div>
            {subtitle && <span className="subtitle">{subtitle}</span>}
            {contentBuilder()}
          </SectionContainer>
        )
      })}
    </Container>
  )
}
