import queryStringify from "utils/queryString"
import axios from "axios"
import { StatusCodes } from "http-status-codes"

axios.defaults.baseURL = `http://${process.env.REACT_APP_HOST}/api/v1`

const mapToQueryParams = (queryParams = {}) => {
  const result = queryStringify(queryParams)

  if (result.length > 0) {
    return `?${queryStringify(queryParams)}`
  }

  return result || ""
}

export async function refreshToken() {
  const url = "/user/refresh/"
  const token = localStorage.getItem("refreshToken")
  const options = {
    url,
    method: "GET",
    headers: {
      token,
    },
  }
  const response = await axios(options)

  if (response.status === StatusCodes.OK && response.data != null) {
    return response.data
  }

  throw Error(response)
}

const fetchRequest = async ({
  path,
  method,
  body,
  query,
  headers = {},
  requiredToken = false,
}) => {
  const url = `${path}${mapToQueryParams(query || {})}`
  const options = {
    url,
    method,
    headers,
  }

  if (body != null) {
    options.headers["Content-Type"] = "application/json;charset=utf-8"
    options.data = body
  }

  if (requiredToken) {
    const accessToken = localStorage.getItem("accessToken")
    options.header = {
      ...options.header,
      token: accessToken,
    }
  }

  let response = await axios(options)

  if (response.status === StatusCodes.UNAUTHORIZED) {
    const newAccessToken = await refreshToken()
    options.headers.token = newAccessToken
    response = await axios(options)
  }

  if (response.status === StatusCodes.OK || response.status === StatusCodes.CREATED) {
    if (response.data != null) {
      return { data: response.data }
    }
    return {}
  }

  throw Error(response)
}

export default {
  async get(path, query, headers) {
    const response = await fetchRequest({
      method: "GET",
      path,
      query,
      headers,
    })

    return response
  },
  async getWithToken(path, query, headers) {
    const response = await fetchRequest({
      method: "GET",
      path,
      query,
      headers,
      requiredToken: true,
    })

    return response
  },
  async post(path, body, query, headers) {
    const response = await fetchRequest({
      method: "POST",
      path,
      body,
      query,
      headers,
    })

    return response
  },
  async postWithToken(path, body, query, headers) {
    const response = await fetchRequest({
      method: "POST",
      path,
      body,
      query,
      headers,
      requiredToken: true,
    })

    return response
  },
  async putWithToken(path, body, query, headers) {
    const response = await fetchRequest({
      method: "PUT",
      path,
      body,
      query,
      headers,
      requiredToken: true,
    })

    return response
  },
  async patchWithToken(path, body, query, headers) {
    const response = await fetchRequest({
      method: "PATCH",
      path,
      body,
      query,
      headers,
      requiredToken: true,
    })

    return response
  },
  async deleteWithToken(path, query, headers) {
    const response = await fetchRequest({
      method: "DELETE",
      path,
      query,
      headers,
      requiredToken: true,
    })

    return response
  },
}
