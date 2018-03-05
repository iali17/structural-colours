export default function reducer(state={
  fetching: false,
  fetched: false,
  articles: [],
}, action) {
  switch (action.type) {
    case "FETCH_ARTICLE": {
      return {...state, fetching: true}
    }
    case "FETCH_ARTICLE_REJECTED": {
      return {...state, fetching: false, error: action.payload}
    }
    case "FETCH_ARTICLE_FULFILLED": {
      return {
        ...state,
        article: action.payload,
        fetching: false,
        fetched: true,
      }
    }
  }

  return state
}
