import { css } from "styled-components"
import { primaryTextColor } from "styles/colors"

/**
 * TitleText
 */

export const title1Normal = css`
  font-family: "Nanum Gothic", sans-serif;
  font-weight: 400;
  font-size: 20px;
  line-height: 20px;
  color: ${primaryTextColor};
`

export const title1Bold = css`
  ${title1Normal}
  font-weight: 700;
`

export const title1ExtraBold = css`
  ${title1Normal}
  font-weight: 800;
`

export const title2Normal = css`
  ${title1Normal}
  font-size: 24px;
  line-height: 24px;
`

export const title2Bold = css`
  ${title2Normal}
  font-weight: 700;
`

export const title2ExtraBold = css`
  ${title2Normal}
  font-weight: 800;
`

export const title3Normal = css`
  ${title2Normal}
  font-size: 36px;
  line-height: 36px;
`

export const title3Bold = css`
  ${title3Normal}
  font-weight: 700;
`

export const title3ExtraBold = css`
  ${title3Normal}
  font-weight: 800;
`

/**
 * BodyText
 */

export const body1Normal = css`
  ${title1Normal}
  font-size: 16px;
  line-height: 16px;
`

export const body1Bold = css`
  ${body1Normal}
  font-weight: 700;
`

export const body1ExtraBold = css`
  ${body1Normal}
  font-weight: 800;
`

export const body2Normal = css`
  ${body1Normal}
  font-size: 14px;
  line-height: 14px;
`

export const body2Bold = css`
  ${body2Normal}
  font-weight: 700;
`

export const body2ExtraBold = css`
  ${body2Normal}
  font-weight: 800;
`

export const body3Normal = css`
  ${body1Normal}
  font-size: 12px;
  line-height: 12px;
`

export const body3Bold = css`
  ${body3Normal}
  font-weight: 700;
`

export const body3ExtraBold = css`
  ${body3Normal}
  font-weight: 800;
`

/**
 * LabelText
 */

export const label1Normal = css`
  ${body1Normal}
  font-size: 9px;
  line-height: 9px;
`

export const label1Bold = css`
  ${label1Normal}
  font-weight: 700;
`

export const label1ExtraBold = css`
  ${label1Normal}
  font-weight: 800;
`

export const label2Normal = css`
  ${body1Normal}
  font-size: 10px;
  line-height: 10px;
`

export const label2Bold = css`
  ${label2Normal}
  font-weight: 700;
`

export const label2ExtraBold = css`
  ${label2Normal}
  font-weight: 800;
`

export const label3Normal = css`
  ${body1Normal}
  font-size: 11px;
  line-height: 11px;
`

export const label3Bold = css`
  ${label3Normal}
  font-weight: 700;
`

export const label3ExtraBold = css`
  ${label3Normal}
  font-weight: 800;
`

/**
 * Logo
 */

export const logoText = css`
  font-family: "Bad Script", cursive;
  font-weight: 400;
  font-size: 24px;
  line-height: 24px;
  color: ${primaryTextColor};
`
