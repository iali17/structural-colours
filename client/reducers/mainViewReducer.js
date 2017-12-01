export default function reducer(state={
  pictures: [],
  fetching: false,
  fetched: false,
}, action) {
  switch (action.type) {
    case "FETCH_PICTURES": {
      return {...state, fetching: true}
    }
    case "FETCH_PICTURES_REJECTED": {
      return {...state, fetching: false, error: action.payload}
    }
    case "FETCH_PICTURES_FULFILLED": {
      return {
        ...state,
        fetching: false,
        fetched: true,
        pictures: action.payload,
      }
    }
    case "FETCH_NEXT_PICTURES": {
      return {...state, fetching: true}
    }
    case "FETCH_NEXT_PICTURES_REJECTED": {
      return {...state, fetching: false, error: action.payload}
    }
    case "FETCH_NEXT_PICTURES_FULFILLED": {
      var oldPictures = state.pictures.results.slice();
      action.payload.results = oldPictures.concat(action.payload.results);

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
