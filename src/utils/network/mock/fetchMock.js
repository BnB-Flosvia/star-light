import axios from "axios"
import MockAdapter from "axios-mock-adapter"
import token from "./data/token.json"
import getPosts from "./data/getPosts.json"
import getTags from "./data/getTags.json"
import getUserData from "./data/getUserData.json"

let mock = {
  restore: () => {},
}

const fetchMock = {
  enable() {
    mock = new MockAdapter(axios, { delayResponse: 1000 })

    // mock handler
    // signin, signup
    mock.onPost("/user/login/").reply(200, token)
    mock.onPost("/user/refresh/").reply(200)
    mock.onPost("/user/register/").reply(200)

    // trackOfBest
    mock.onGet("/post/").reply(200, getPosts)
    mock.onGet("/post/?tags=Tag1").reply(200, getPosts)
    mock.onGet("/post/tag/").reply(200, getTags)
    mock.onGet("/user/me/").reply(200, getUserData)

    // createTrackOfBest
    mock.onPost("/post/").reply(200)

    mock.onPost().reply(500)
  },
  disable() {
    mock.restore()
  },
}

export default fetchMock
