import ContentEditor from "components/ContentEditor"
import { OutlineInput } from "components/Inputs"
import TagSelectInput from "components/TagSelectInput"
import React from "react"
import styled from "styled-components"
import { borderColor, secondaryTextColor } from "styles/colors"
import { title1Normal, title2Normal, body3Normal } from "styles/textTheme"

const Container = styled.div`
  display: flex;
  flex-flow: column;
  max-width: 720px;
`

const HeaderSection = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  padding: 32px 0;
  ${title2Normal}
`

const SectionContainer = styled.div`
  display: flex;
  flex-flow: column;
  border-top: 1px solid ${borderColor};
  padding: 30px 40px;
  .title {
    ${title1Normal}
    padding-bottom: ${(props) => (props.hasSubtitle ? "12px" : "20px")};
  }
  .subtitle {
    ${body3Normal}
    color: ${secondaryTextColor};
    padding-bottom: ${(props) => (props.hasSubtitle ? "12px" : "20px")};
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

const YoutubeLinkContent = () => {
  return <div />
}

const CoverImageContent = () => {
  return <div />
}

export default function ContentContainer({ onChange, form, tagOptions = [] }) {
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
            />
            <OutlineInput
              className="input"
              labelText="곡제목"
              placeholderText="곡제목 입력"
              errorText={form.fields.songName.error}
              onChange={(value) => onChange("songName", value)}
            />
          </RowContainer>
        )
      },
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
          />
        )
      },
    },
    {
      title: "이 곡이 띵곡인 이유",
      contentBuilder: () => {
        return (
          <ContentEditor
            onChange={(value) => onChange("choseReason", value)}
            errorText={form.fields.choseReason.error}
          />
        )
      },
    },
    {
      title: "유튜브 링크 첨부",
      contentBuilder: () => {
        return <YoutubeLinkContent />
      },
    },
    {
      title: "커버 이미지 첨부",
      contentBuilder: () => {
        return <CoverImageContent />
      },
    },
    {
      title: "태그 선택",
      contentBuilder: () => {
        return (
          <TagSelectInput
            options={tagOptions.map((item) => {
              return { value: item }
            })}
            placeholder="태그를 선택해주세요"
            notFoundContent={<div>존재하지 않는 태그명입니다.</div>}
            width={400}
            onChange={(value) => onChange("tag", value)}
          />
        )
      },
    },
  ]

  return (
    <Container>
      <HeaderSection>
        <span>나만 아는 갓띵곡 생성</span>
      </HeaderSection>
      {contentList.map((item) => {
        const { title, subtitle, contentBuilder } = item
        return (
          <SectionContainer hasSubtitle={subtitle != null}>
            <span className="title">{title}</span>
            {subtitle && <span className="subtitle">{subtitle}</span>}
            {contentBuilder()}
          </SectionContainer>
        )
      })}
    </Container>
  )
}
