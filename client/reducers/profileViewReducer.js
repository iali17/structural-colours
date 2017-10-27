export default function reducer(state={
  picture: [],
  fetching: false,
  fetched: false,
}, action) {
  switch (action.type) {
    case "FETCH_PICTURE": {
      return {...state, fetching: true}
    }
    case "FETCH_PICTURE_REJECTED": {
      return {...state, fetching: false, error: action.payload}
    }
    case "FETCH_PICTURE_FULFILLED": {
      return {
        ...state,
        fetching: false,
        fetched: true,
        picture: action.payload,
      }
    }
  }

  return state
}
