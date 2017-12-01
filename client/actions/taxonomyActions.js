import axios from 'axios';

import { URL_PREFIX } from '../constants';

export function fetchTax() {
  return function(dispatch) {
    dispatch({type: "FETCH_TAXONOMY"});
    axios.get(URL_PREFIX + "/api/taxonomy/all")
    .then((response) => {
      dispatch({type: "FETCH_TAXONOMY_FULFILLED", payload: response.data})
    })
    .catch((err) => {
      dispatch({type: "FETCH_TAXONOMY_REJECTED", payload: err})
    })
  }
}
