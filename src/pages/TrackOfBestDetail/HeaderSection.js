import React from "react"
import styled from "styled-components"
import { secondaryTextColor, borderColor } from "styles/colors"
import {
  body1Normal,
  title2Normal,
  body2Normal,
  title1Normal,
  body3Normal,
  label2Normal,
  body1Bold,
} from "styles/textTheme"
import { MoreVertIconButton } from "components/IconButtons"
import Dropdown from "components/Dropdown"
import { Modal } from "antd"

const { confirm } = Modal

const Container = styled.div`
  display: flex;
  flex-flow: column;
  width: 100%;
  margin-bottom: 40px;
  border-bottom: 1px solid ${borderColor};
  .title {
    display: flex;
    width: 100%;
    justify-content: center;
    padding-top: 1.5em;
    ${(props) =>
      props.isSmallMode ? body1Normal : props.isMediumMode ? title1Normal : title2Normal}
  }
  .subtitle {
    display: flex;
    width: 100%;
    justify-content: center;
    ${(props) =>
      props.isSmallMode ? body3Normal : props.isMediumMode ? body2Normal : body1Normal};
    color: ${secondaryTextColor};
    padding-top: 0.75em;
  }
  .nicknameAndMore {
    display: flex;
    width: 100%;
    justify-content: flex-end;
    align-items: center;
    ${(props) =>
      props.isSmallMode ? label2Normal : props.isMediumMode ? body3Normal : body2Normal}
    padding: 0.5em 1.5em 0.75em;
    margin: ${(props) => (!props.isMine ? "2px 0" : null)};
    .nickname {
      .boldText {
        font-weight: bold;
      }
    }
    .moreButtonDropdown {
      margin-left: 10px;
    }
  }
`

const TitleText = styled.span`
  ${body1Bold};
`

const ButtonText = styled.div`
  ${body2Normal};
`

export default function HeaderSection({
  songName,
  artist,
  username,
  isMine,
  isSmallMode,
  isMediumMode,
  deleteRequest,
  goEditPage,
}) {
  function deleteConfirm() {
    confirm({
      title: <TitleText>해당 글을 삭제하시겠습니까?</TitleText>,
      onOk() {
        deleteRequest()
      },
      onCancel() {},
      okText: <ButtonText>예</ButtonText>,
      cancelText: <ButtonText>아니오</ButtonText>,
    })
  }

  const moreButtonMenu = [
    {
      name: "수정하기",
      onClick: () => {
        goEditPage()
      },
    },
    {
      name: "삭제하기",
      onClick: () => {
        deleteConfirm()
      },
    },
  ]

  const onMoreButtonClick = ({ onClick }) => {
    return <MoreVertIconButton className="moreIcon" onClick={onClick} />
  }

  return (
    <Container isSmallMode={isSmallMode} isMediumMode={isMediumMode} isMine={isMine}>
      <div className="title">{songName}</div>
      <div className="subtitle">{artist}</div>
      {username && (
        <div className="nicknameAndMore">
          <span className="nickname">
            <span className="boldText">{username}</span>님 추천곡
          </span>
          {!isSmallMode && !isMediumMode && isMine && (
            <Dropdown
              className="moreButtonDropdown"
              buildCustomButton={onMoreButtonClick}
              menus={moreButtonMenu}
              placement="bottom-start"
              offset={[0, 10]}
            />
          )}
        </div>
      )}
    </Container>
  )
}
