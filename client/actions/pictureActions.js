import axios from 'axios';
import { URL_PREFIX } from '../constants';

export function fetchPicture(c) {
  return function(dispatch) {
    dispatch({type: "FETCH_PICTURE"});
    axios.get(URL_PREFIX + "/api/pictures/all", {
       params: {
         colour: c
        }
    })
    .then((response) => {
      dispatch({type: "FETCH_PICTURE_FULFILLED", payload: response.data})
    })
    .catch((err) => {
      dispatch({type: "FETCH_PICTURE_REJECTED", payload: err})
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

export function fetchRandomPictures() {
  return function(dispatch) {
    dispatch({type: "FETCH_RANDOM_PICTURES"});
    axios.get(URL_PREFIX + "/api/pictures/random")
    .then((response) => {
      dispatch({type: "FETCH_RANDOM_PICTURES_FULFILLED", payload: response.data})
    })
    .catch((err) => {
      dispatch({type: "FETCH_RANDOM_PICTURES_REJECTED", payload: err})
    })
  }
}
