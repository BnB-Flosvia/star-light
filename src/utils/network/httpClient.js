import queryStringify from "utils/queryString"
import axios from "axios"
import { isEmpty } from "lodash-es"
import { refreshAccessToken } from "authProvider"

axios.defaults.baseURL = `http://${process.env.REACT_APP_HOST}/api/v1`

const mapToQueryParams = (queryParams = {}) => {
  const result = queryStringify(queryParams)

  if (result.length > 0) {
    return `?${queryStringify(queryParams)}`
  }

  return result || ""
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
  try {
    if (body != null) {
      options.headers["Content-Type"] = "application/json;charset=utf-8"
      options.data = body
    }

    if (requiredToken) {
      const accessToken = localStorage.getItem("accessToken")

      if (accessToken == null || isEmpty(accessToken)) {
        throw Error("Not Exist Session")
      }

      options.headers = {
        ...options.headers,
        Authorization: `Bearer ${accessToken}`,
      }
    }

    const response = await axios(options)
    if (response?.data != null) {
      return { data: response.data }
    }
    return {}
  } catch (error) {
    if (error?.response?.status === 444) {
      const newAccessToken = await refreshAccessToken()

      options.headers = {
        ...options.headers,
        Authorization: `Bearer ${newAccessToken}`,
      }

      const response = await axios(options)
      if (response?.data != null) {
        return { data: response.data }
      }
      return {}
    }
    throw error
  }
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
