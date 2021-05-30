import { isEmpty } from "lodash-es"

export const checkLocalToken = () => {
  const accessToken = localStorage.getItem("accessToken")

  if (accessToken != null && !isEmpty(accessToken)) {
    return true
  }
  return false
}

export const logout = () => {
  localStorage.setItem("accessToken", "")
}
