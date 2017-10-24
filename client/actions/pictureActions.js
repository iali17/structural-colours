import axios from 'axios';

import { URL_PREFIX } from '../constants';

export function fetchPicture(id) {
  return function(dispatch) {
    dispatch({type: "FETCH_PICTURE"});
    axios.get(URL_PREFIX + "/api/pictures/" + id)
    .then((response) => {
      dispatch({type: "FETCH_PICTURE_FULFILLED", payload: response.data})
    })
    .catch((err) => {
      dispatch({type: "FETCH_PICTURE_REJECTED", payload: err})
    })
  }
}
