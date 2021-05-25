import axios from "axios"
import MockAdapter from "axios-mock-adapter"
import token from "./data/token.json"

let mock = {
  restore: () => {},
}

const fetchMock = {
  enable() {
    mock = new MockAdapter(axios, { delayResponse: 1000 })

    // mock handler
    mock.onPost("/user/login/").reply(200, token)
    mock.onPost("/user/refresh/").reply(200, token)
    mock.onPost("/user/register/").reply(200)

    mock.onPost().reply(500)
  },
  disable() {
    mock.restore()
  },
}

export default fetchMock
