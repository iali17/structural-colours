import axios from 'axios';
import { URL_PREFIX } from '../constants';

export function fetchPictures(c,s) {
  return function(dispatch) {
    dispatch({type: "FETCH_PICTURES"});
    axios.get(URL_PREFIX + "/api/pictures/all", {
       params: {
         species: s,
         colour: c
        }
    })
    .then((response) => {
      dispatch({type: "FETCH_PICTURES_FULFILLED", payload: response.data})
    })
    .catch((err) => {
      dispatch({type: "FETCH_PICTURES_REJECTED", payload: err})
    })
  }
}

export function fetchOnePicture(id) {
  return function(dispatch) {
    dispatch({type: "FETCH_ONE_PICTURE"});
    axios.get(URL_PREFIX + "/api/pictures/species/" + id)
    .then((response) => {
      dispatch({type: "FETCH_ONE_PICTURE_FULFILLED", payload: response.data})
    })
    .catch((err) => {
      dispatch({type: "FETCH_ONE_PICTURE_REJECTED", payload: err})
    })
  }
}

export function fetchRandomPicture() {
  return function(dispatch) {
    dispatch({type: "FETCH_RANDOM_PICTURE"});
    axios.get(URL_PREFIX + "/api/pictures/random")
    .then((response) => {
      dispatch({type: "FETCH_RANDOM_PICTURE_FULFILLED", payload: response.data})
    })
    .catch((err) => {
      dispatch({type: "FETCH_RANDOM_PICTURE_REJECTED", payload: err})
    })
  }
}

export function fetchNextPictures(url) {
  return function(dispatch) {
    dispatch({type: "FETCH_NEXT_PICTURES"});
    axios.get(url)
    .then((response) => {
      dispatch({type: "FETCH_NEXT_PICTURES_FULFILLED", payload: response.data})
    })
    .catch((err) => {
      dispatch({type: "FETCH_NEXT_PICTURES_REJECTED", payload: err})
    })
  }
}
