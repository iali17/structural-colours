export default function reducer(state={
  taxonomy: {},
  Tfetching: false,
  Tfetched: false,
}, action) {
  switch (action.type) {
    case "FETCH_TAXONOMY": {
      return {...state, Tfetching: true}
    }
    case "FETCH_TAXONOMY_REJECTED": {
      return {...state, Tfetching: false, error: action.payload}
    }
    case "FETCH_TAXONOMY_FULFILLED": {
      return {
        ...state,
        Tfetching: false,
        Tfetched: true,
        taxonomy: action.payload,
      }
    }
  }
  return state
}
