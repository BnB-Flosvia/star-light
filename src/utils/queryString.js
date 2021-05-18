import { isObject } from "lodash-es"

export default function queryStringify(queryParams, prefix) {
  const endcodeList = []

  Object.keys(queryParams).forEach((key) => {
    const value = queryParams[key]

    if (value == null) {
      return
    }

    const queryKey = prefix ? `${prefix}[${key}]` : key

    if (isObject(value)) {
      const subParamString = queryStringify(value, queryKey)
      if (subParamString.length > 0) {
        endcodeList.push(queryStringify(value, queryKey))
      }
    } else {
      endcodeList.push(`${queryKey}=${value}`)
    }
  })

  return endcodeList.join("&")
}
