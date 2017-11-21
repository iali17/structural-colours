export default function reducer(state={
  activeTab: 'landing',
}, action) {
  switch (action.type) {
    case "SWITCH_TABS": {
      return {
        ...state,
        activeTab: action.tab,
      }
    }
  }

  return state;
}
