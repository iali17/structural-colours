export default function reducer(state={
  taxonomy: {},
  Tfetching: false,
  Tfetched: false,
  phylum: {},
  Pfetching: false,
  Pfetched: false,
  order: {},
  Ofetching: false,
  Ofetched: false,
  family: {},
  Ffetching: false,
  Ffetched: false,
  species: {},
  Sfetching: false,
  Sfetched: false,
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
    case "FETCH_PHYLUM": {
      return {...state, Pfetching: true}
    }
    case "FETCH_PHYLUM_REJECTED": {
      return {...state, Pfetching: false, error: action.payload}
    }
    case "FETCH_PHYLUM_FULFILLED": {
      return {
        ...state,
        Pfetching: false,
        Pfetched: true,
        phylum: action.payload,
      }
    }
    case "FETCH_ORDER": {
      return {...state, Ofetching: true}
    }
    case "FETCH_ORDER_REJECTED": {
      return {...state, Ofetching: false, error: action.payload}
    }
    case "FETCH_ORDER_FULFILLED": {
      return {
        ...state,
        Ofetching: false,
        Ofetched: true,
        order: action.payload,
      }
    }
    case "FETCH_FAMILY": {
        return {...state, Ffetching: true}
      }
      case "FETCH_FAMILY_REJECTED": {
        return {...state, Ffetching: false, error: action.payload}
      }
      case "FETCH_FAMILY_FULFILLED": {
        return {
          ...state,
          Ffetching: false,
          Ffetched: true,
          family: action.payload,
        }
      }
      case "FETCH_SPECIES": {
        return {...state, Sfetching: true}
      }
      case "FETCH_SPECIES_REJECTED": {
        return {...state, Sfetching: false, error: action.payload}
      }
      case "FETCH_SPECIES_FULFILLED": {
        return {
          ...state,
          Sfetching: false,
          Sfetched: true,
          species: action.payload,
        }
      }
    }

  return state
}
