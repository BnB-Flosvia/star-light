import React from "react"
import styled from "styled-components"
import { useMediaQuery } from "react-responsive"
import { isEmpty } from "lodash-es"
import { primaryTextColor, lightInteractionColor, logoTextColor } from "styles/colors"
import { body1Normal, body2Normal, title1Normal } from "styles/textTheme"
import { RoundedLinkButton } from "components/Buttons"
import RadioButton from "components/RadioButton"
import { SearchIconButton } from "components/IconButtons"
import InfoTooltip from "components/InfoTooltip"
import TagSelectInput from "components/TagSelectInput"
import { LoadingOutlined } from "@ant-design/icons"

const TagSearchSection = styled.div`
  display: flex;
  flex-flow: column;
  .titleSection {
    display: flex;
    align-items: center;
    padding-bottom: 1em;
    ${(props) => (props.isSmall ? body1Normal : title1Normal)};
    .title {
      padding-right: 0.75em;
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
      width: ${(props) => (props.isSmall ? "38px" : "46px")};
      height: ${(props) => (props.isSmall ? "38px" : "46px")};
      border: 1px solid ${primaryTextColor};
      border-radius: 4px;
      margin-left: ${(props) => (props.isSmall ? "10px" : "16px")};
      &:hover {
        background: ${lightInteractionColor};
      }
    }
  }
  .searchedTagText {
    ${(props) => (props.isSmall ? body2Normal : title1Normal)};
    padding-bottom: ${(props) => (props.isSmall ? "28px" : "40px")};
    .infoText {
      padding-right: 12px;
    }
  }
`

const ButtonGroupContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  margin: ${(props) => (props.isSmall ? "24px 0 30px" : "28px 0 40px")};
`

export default function HeaderSection({
  isLoading,
  tagOptions,
  onTagChange,
  onSearch,
  orderType,
  onOrderChange,
  searchedTagList,
}) {
  const isSmallOrMediumMode = useMediaQuery({
    query: "(max-width: 768px)",
  })

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
      <TagSearchSection isSmall={isSmallOrMediumMode}>
        {isLoading ? (
          <div className="searchedTagText">
            <span className="infoText">...검색 중</span>
            <LoadingOutlined style={{ color: `${logoTextColor}`, fontSize: "20px" }} />
          </div>
        ) : (
          !isEmpty(searchedTagList) && (
            <div className="searchedTagText">
              {searchedTagList.join(", ")}에 대한 검색결과 🔍
            </div>
          )
        )}
        <div className="titleSection">
          <span className="title">
            <span className="boldText">#</span>태그 검색
          </span>
          <InfoTooltip
            tooltipText={
              <span>
                원하는 키워드를 입력하여 검색하거나 <br />
                태그 리스트에서 선택할 수 있습니다.
              </span>
            }
          />
        </div>
        <div className="tagInputSection">
          <TagSelectInput
            value={searchedTagList}
            options={tagOptions}
            placeholder="검색할 태그명 입력"
            notFoundContent={<div>존재하지 않는 태그명입니다.</div>}
            width={250}
            onChange={onTagChange}
            isSmall={isSmallOrMediumMode}
          />
          <div className="searchButton">
            <SearchIconButton onClick={onSearch} />
          </div>
        </div>
      </TagSearchSection>
      <ButtonGroupContainer isSmall={isSmallOrMediumMode}>
        <RadioButton
          items={orderTypeOptions}
          selectedId={orderType || orderTypeOptions[0]?.id}
          onChange={onOrderChange}
          isSmall={isSmallOrMediumMode}
        />
        {isSmallOrMediumMode ? (
          <div />
        ) : (
          <RoundedLinkButton to="/trackOfBest/register">
            새 띵곡 추가하기
          </RoundedLinkButton>
        )}
      </ButtonGroupContainer>
    </>
  )
}
