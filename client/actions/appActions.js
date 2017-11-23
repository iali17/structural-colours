export function switchTabs(tab) {
  return {
    type: "SWITCH_TABS",
    tab,
  };
}

export function setCurrentColour(colour) {
  return {
    type: "SET_CURRENT_COLOUR",
    colour,
  }
}

export function setCurrentId(id) {
  return {
    type: "SET_CURRENT_ID",
    id,
  }
}
