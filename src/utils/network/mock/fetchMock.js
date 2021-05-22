import axios from "axios"
import MockAdapter from "axios-mock-adapter"
import { baseApiUrl } from "utils/network/httpClient"

let mock = {
  restore: () => {},
}

const fetchMock = {
  enable() {
    mock = new MockAdapter(axios, { delayResponse: 1000 })

    // mock handler
    mock.onPost(`${baseApiUrl}/user/login`).reply(200, {
      refresh:
        "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTYyMTczODk0OSwianRpIjoiZjYwNmVkYWQ5ZTFlNGMwY2EyYjI5Y2ZmMTBmOWQzNTAiLCJ1c2VyX2lkIjo0fQ.IGW_ptd4CImDC8rumuUJ1hoyN1A0ye0agjhHE8d_j30",
      access:
        "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjIxMTM3NzQ5LCJqdGkiOiI3NmY2MjVmZDgwMjQ0ODMwYTA3M2Y4Yjg3ODcwMzA0NSIsInVzZXJfaWQiOjR9.08lnFrhZY0LCYudIpCY27bTvJPOYRzshgT1vgx1DWJE",
    })
    mock.onPost(`${baseApiUrl}/user/refresh`).reply(200, {
      refresh:
        "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTYyMTczODk0OSwianRpIjoiZjYwNmVkYWQ5ZTFlNGMwY2EyYjI5Y2ZmMTBmOWQzNTAiLCJ1c2VyX2lkIjo0fQ.IGW_ptd4CImDC8rumuUJ1hoyN1A0ye0agjhHE8d_j30",
      access:
        "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjIxMTM3NzQ5LCJqdGkiOiI3NmY2MjVmZDgwMjQ0ODMwYTA3M2Y4Yjg3ODcwMzA0NSIsInVzZXJfaWQiOjR9.08lnFrhZY0LCYudIpCY27bTvJPOYRzshgT1vgx1DWJE",
    })

    mock.onPost().reply(500)
  },
  disable() {
    mock.restore()
  },
}

export default fetchMock
