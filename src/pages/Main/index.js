import React from "react"
import { Link } from "react-router-dom"
// import useMainPageData from "utils/hooks/main/useMainPageData"

// Sample code
export default function MainPage() {
  return (
    <div>
      <h1>임시 메인 페이지</h1>
      <div>
        <Link to="/signin">로그인</Link>
      </div>
    </div>
  )
}
