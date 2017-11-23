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

export function fetchPhylum(k) {
  return function(dispatch) {
    dispatch({type: "FETCH_PHYLUM"});

    axios.get(URL_PREFIX + "/api/taxonomy/kingdom/", {
       params: {
         kingdom: k
        }
    })

    .then((response) => {
      dispatch({type: "FETCH_PHYLUM_FULFILLED", payload: response.data})
    })
    .catch((err) => {
      dispatch({type: "FETCH_PHYLUM_REJECTED", payload: err})
    })
  }
}

export function fetchOrder(p) {
  return function(dispatch) {
    dispatch({type: "FETCH_ORDER"});

    axios.get(URL_PREFIX + "/api/taxonomy/phylum/", {
       params: {
         phylum: p
        }
    })

    .then((response) => {
      dispatch({type: "FETCH_ORDER_FULFILLED", payload: response.data})
    })
    .catch((err) => {
      dispatch({type: "FETCH_ORDER_REJECTED", payload: err})
    })
  }
}

export function fetchFamily(o) {
  return function(dispatch) {
    dispatch({type: "FETCH_FAMILY"});

    axios.get(URL_PREFIX + "/api/taxonomy/order/", {
       params: {
         order: o
        }
    })

    .then((response) => {
      dispatch({type: "FETCH_FAMILY_FULFILLED", payload: response.data})
    })
    .catch((err) => {
      dispatch({type: "FETCH_FAMILY_REJECTED", payload: err})
    })
  }
}

export function fetchSpecies(f) {
  return function(dispatch) {
    dispatch({type: "FETCH_SPECIES"});

    axios.get(URL_PREFIX + "/api/taxonomy/family/", {
       params: {
         family: f
        }
    })

    .then((response) => {
      dispatch({type: "FETCH_SPECIES_FULFILLED", payload: response.data})
    })
    .catch((err) => {
      dispatch({type: "FETCH_SPECIES_REJECTED", payload: err})
    })
  }
}