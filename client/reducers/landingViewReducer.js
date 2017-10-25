export default function reducer(state={
  pictures: [],
  fetching: false,
  fetched: false,
}, action) {
  switch (action.type) {
    case "FETCH_RANDOM_PICTURES": {
      return {...state, fetching: true}
    }
    case "FETCH_RANDOM_PICTURES_REJECTED": {
      return {...state, fetching: false, error: action.payload}
    }
    case "FETCH_RANDOM_PICTURES_FULFILLED": {
      return {
        ...state,
        fetching: false,
        fetched: true,
        pictures: action.payload,
      }
    }
  }

  return state
}
