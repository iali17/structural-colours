export default function reducer(state={
  author: {},
  fetching: false,
  fetched: false,
}, action) {
  switch (action.type) {
    case "FETCH_AUTHOR": {
      return {...state, fetching: true}
    }
    case "FETCH_AUTHOR_REJECTED": {
      return {...state, fetching: false, error: action.payload}
    }
    case "FETCH_AUTHOR_FULFILLED": {
      return {
        ...state,
        author: action.payload,
        fetching: false,
        fetched: true,
      }
    }
  }

  return state
}
