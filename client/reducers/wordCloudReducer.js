export default function reducer(state={
  author: {},
  fetching: false,
  fetched: false,
  article: {},
  article_fetching: false,
  article_fetched: false,
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
    case "FETCH_ARTICLE": {
      return {...state, article_fetching: true}
    }
    case "FETCH_ARTICLE_REJECTED": {
      return {...state, article_fetching: false, error: action.payload}
    }
    case "FETCH_ARTICLE_FULFILLED": {
      return {
        ...state,
        article: action.payload,
        article_fetching: false,
        article_fetched: true,
      }
    }
  }

  return state
}
