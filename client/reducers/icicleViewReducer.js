export default function reducer(state={
  taxonomy: {},
  fetching: false,
  fetched: false,
}, action) {
  switch (action.type) {
    case "FETCH_TAXONOMY": {
      return {...state, fetching: true}
    }
    case "FETCH_TAXONOMY_REJECTED": {
      return {...state, fetching: false, error: action.payload}
    }
    case "FETCH_TAXONOMY_FULFILLED": {
      return {
        ...state,
        fetching: false,
        fetched: true,
        taxonomy: action.payload,
      }
    }
  }
  
  return state
}
