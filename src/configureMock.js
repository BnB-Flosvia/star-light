import fetchMock from "utils/network/mock/fetchMock"

switch (process.env.REACT_APP_ENVIRONMENT) {
  case "mock":
    fetchMock.enable()
    break
  default:
    break
}

export default {
  enable() {
    fetchMock.enable()
  },
  disable() {
    fetchMock.disable()
  },
}
