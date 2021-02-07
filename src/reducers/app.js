import { APP_INITIALIZED, CLEAR_API_CALL_STATUS } from "actions/types"

const initialState = {
  initialized: false,
  apiCalling: 0,
}

export default (state = initialState, action) => {
  const splitedType = action.type.split("/")

  if (splitedType[splitedType.length - 1] === "fetch") {
    switch (action.type) {
      default:
        return {
          ...state,
          apiCalling: state.apiCalling + 1,
        }
    }
  }

  switch (action.type) {
    case APP_INITIALIZED:
      return {
        ...state,
        initialized: true,
      }
    case CLEAR_API_CALL_STATUS:
      return {
        ...state,
        apiCalling: Math.max(0, state.apiCalling - 1),
      }
    default:
      return state
  }
}
