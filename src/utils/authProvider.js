import { isEmpty } from "lodash-es"
import { jwt_decode as jwtDecode } from "jwt-decode-es"
import httpClient from "utils/network/httpClient"

function getTokenData(token) {
  const tokenData = jwtDecode(token)
  return tokenData
}

function checkTokenExpire(token) {
  const tokenData = getTokenData(token)
  const expirationTime = new Date(tokenData.exp * 1000)
  return expirationTime <= new Date()
}

export async function refreshAccessToken() {
  try {
    const refreshToken = localStorage.getItem("refreshToken")

    if (refreshToken == null || isEmpty(refreshToken)) {
      throw Error("Not Exist Refresh Token")
    }

    const isTokenExpired = checkTokenExpire(refreshToken)

    if (isTokenExpired) {
      throw Error("RefreshToken is expired. required login")
    }

    const response = await httpClient.post("/user/refresh/", {
      refresh: refreshToken,
    })
    const { access } = response?.data || {}

    if (access != null) {
      localStorage.setItem("accessToken", access)
    }

    return access
  } catch (error) {
    localStorage.setItem("accessToken", "")
    localStorage.setItem("refreshToken", "")
    throw error
  }
}

export const getLocalToken = async () => {
  const accessToken = localStorage.getItem("accessToken")

  if (accessToken == null || isEmpty(accessToken)) {
    throw Error("Token is Not Exist")
  }

  const isTokenExpired = checkTokenExpire(accessToken)
  if (!isTokenExpired) {
    return accessToken
  }

  const updatedAccessToken = await refreshAccessToken()

  if (isEmpty(updatedAccessToken)) {
    throw Error("Token is Not Exist")
  }

  if (checkTokenExpire(updatedAccessToken)) {
    throw Error("Token is Expired")
  }
  return updatedAccessToken
}

export const checkLocalToken = () => {
  const token = localStorage.getItem("accessToken")
  return token != null && !isEmpty(token)
}

export const logout = () => {
  localStorage.setItem("accessToken", "")
}

export function getUserMetadata() {
  return getTokenData(localStorage.getItem("accessToken"))
}
