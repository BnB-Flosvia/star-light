import axios from "axios"
import MockAdapter from "axios-mock-adapter"
import token from "./data/token.json"
import getPosts from "./data/getPosts.json"
import getTags from "./data/getTags.json"
import getUserData from "./data/getUserData.json"
import getPostDetail from "./data/getPostDetail.json"

let mock = {
  restore: () => {},
}

const trackOfBestUrl = new RegExp(`/post/*`)

const fetchMock = {
  enable() {
    mock = new MockAdapter(axios, { delayResponse: 1000 })

    // mock handler
    // signin, signup
    mock.onPost("/user/login/").reply(200, token)
    mock.onPost("/user/refresh/").reply(200)
    mock.onPost("/user/register/").reply(200)

    // trackOfBest detail
    mock.onGet("/post/1/").reply(200, getPostDetail)
    mock.onGet("/post/2/").reply(200, getPostDetail)
    mock.onGet("/post/3/").reply(200, getPostDetail)
    mock.onGet("/post/4/").reply(200, getPostDetail)

    // tag list
    mock.onGet("/post/tag/").reply(200, getTags)

    // user own data
    mock.onGet("/user/me/").reply(200, getUserData)

    // trackOfBest list
    mock.onGet(trackOfBestUrl).reply(200, getPosts)

    // createTrackOfBest
    mock.onPost("/post/").reply(200)

    // updateTrackOfBest
    mock.onPut(trackOfBestUrl).reply(200)

    // deleteTrackOfBest
    mock.onDelete(trackOfBestUrl).reply(200)

    mock.onPost().reply(500)
  },
  disable() {
    mock.restore()
  },
}

export default fetchMock
