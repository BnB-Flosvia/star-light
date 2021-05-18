import { createGlobalStyle } from "styled-components"
import NanumGothicRegular from "./NanumGothic.ttf"

export default createGlobalStyle`
  @font-face {
    font-family: "NanumGothic";
    font-style: normal;
    font-weight: 400;
    src: url("./NanumGothic.eot");
    src: local(※), url("NanumGothic.woff2") format("woff2"),
      url("./NanumGothic.woff") format("woff"),
      url(${NanumGothicRegular}) format("truetype")
  }
`
