import axios from 'axios';
import { URL_PREFIX } from '../constants';

export function fetchDetail(id) {
  return function(dispatch) {
    dispatch({type: "FETCH_DETAIL"});
    axios.get(URL_PREFIX + "/api/species/" + id)
    .then((response) => {
      dispatch({type: "FETCH_DETAIL_FULFILLED", payload: response.data})
    })
    .catch((err) => {
      dispatch({type: "FETCH_DETAIL_REJECTED", payload: err})
    })
  }
}

export function fetchAuthor(id) {
  return function(dispatch) {
    dispatch({type: "FETCH_AUTHOR"});
    axios.get(URL_PREFIX + "/api/articles/all", {
      params: {
        species: id
      }
    })
    .then((response) => {
      dispatch({type: "FETCH_AUTHOR_FULFILLED", payload: response.data})
    })
    .catch((err) => {
      dispatch({type: "FETCH_AUTHOR_REJECTED", payload: err})
    })
  }
}

export function fetchArticle(id) {
  return function(dispatch) {
   dispatch({type: "FETCH_ARTICLE"});
    axios.get(URL_PREFIX + "/api/articles/author/", {
      params: {
        author: id
      }
    })
    .then((response) => {
      dispatch({type: "FETCH_ARTICLE_FULFILLED", payload: response.data})
    })
    .catch((err) => {
      dispatch({type: "FETCH_ARTICLE_REJECTED", payload: err})
    })
  }
}
