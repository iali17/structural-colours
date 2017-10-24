import  { combineReducers } from 'redux';

import detailView from './detailViewReducer';
import landingView from './LandingViewReducer';

export default combineReducers({
  detailView,
  landingView,
})
