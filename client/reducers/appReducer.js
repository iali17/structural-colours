export default function reducer(state={
  activeTab: 0,
  colour: "init",
  id: "init",
}, action) {
  switch (action.type) {
    case "SWITCH_TABS": {
      return {
        ...state,
        activeTab: action.tab,
      }
    }
    case "SET_CURRENT_COLOUR": {
      return {
        ...state,
        colour: action.colour,
      }
    }
    case "SET_CURRENT_ID": {
      return {
        ...state,
        id: action.id,
      }
    }
  }

  return state;
}
