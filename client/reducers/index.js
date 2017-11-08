import  { combineReducers } from 'redux';

import detailView from './detailViewReducer';
import landingView from './landingViewReducer';

export default combineReducers({
  detailView,
  landingView,
})
