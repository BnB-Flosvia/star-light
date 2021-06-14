import React from "react"
import { withRouter } from "react-router-dom"
import styled from "styled-components"
import { lightBackgroundColor } from "styles/colors"

const RowContainer = styled.div`
  flex: 1;
  display: flex;
  flex-flow: column;
  width: 100%;
  height: 100%;
  justify-content: flex-start;
  align-items: flex-start;
  background: ${lightBackgroundColor};
`

function TrackOfBestDetailPage({ match }) {
  const { id } = match.params
  return <RowContainer>TODO: Detail {id}</RowContainer>
}

export default withRouter(TrackOfBestDetailPage)
