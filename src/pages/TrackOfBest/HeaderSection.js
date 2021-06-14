import React from "react"
import styled from "styled-components"
import { primaryTextColor, primaryColor, lightInteractionColor } from "styles/colors"
import TagSelectInput from "src/components/TagSelectInput"
import { title1Normal } from "styles/textTheme"
import { Info } from "@material-ui/icons"
import { SearchIconButton } from "components/IconButtons"
import RadioButton from "components/RadioButton"
import { RoundedLinkButton } from "components/Buttons"

const TagSection = styled.div`
  display: flex;
  flex-flow: column;
  .titleSection {
    display: flex;
    align-items: center;
    padding-bottom: 16px;
    .title {
      ${title1Normal}
      padding-right: 12px;
      .boldText {
        padding-right: 4px;
        font-weight: 700;
      }
    }
  }
  .tagInputSection {
    display: flex;
    align-items: center;
    .searchButton {
      display: flex;
      justify-content: center;
      align-items: center;
      width: ${(props) => (props.isSmall ? "40px" : "46px")};
      height: ${(props) => (props.isSmall ? "40px" : "46px")};
      border: 1px solid ${primaryTextColor};
      border-radius: 4px;
      margin-left: 16px;
      &:hover {
        background: ${lightInteractionColor};
      }
    }
  }
`

const ButtonGroupContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  margin: 40px 0;
`

export default function HeaderSection({
  tagOptions,
  onTagChange,
  onSearch,
  orderType,
  onOrderChange,
}) {
  // TODO: change order type id
  const orderTypeOptions = [
    {
      id: 1,
      name: "최신순",
    },
    {
      id: 2,
      name: "공감순",
    },
  ]

  return (
    <>
      <TagSection>
        <div className="titleSection">
          <span className="title">
            <span className="boldText">#</span>태그 검색
          </span>
          <Info style={{ color: `${primaryColor}`, fontSize: 16 }} />
        </div>
        <div className="tagInputSection">
          <TagSelectInput
            options={tagOptions}
            placeholder="검색할 태그명 입력"
            notFoundContent={<div>존재하지 않는 태그명입니다.</div>}
            width={250}
            onChange={onTagChange}
          />
          <div className="searchButton">
            <SearchIconButton onClick={onSearch} />
          </div>
        </div>
      </TagSection>
      <ButtonGroupContainer>
        <RadioButton
          items={orderTypeOptions}
          selectedId={orderType || orderTypeOptions[0]?.id}
          onChange={onOrderChange}
        />
        <RoundedLinkButton to="/trackOfBest/register">새 띵곡 추가하기</RoundedLinkButton>
      </ButtonGroupContainer>
    </>
  )
}
