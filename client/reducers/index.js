import  { combineReducers } from 'redux';

import detailView from './detailViewReducer';
import landingView from './LandingViewReducer';
import icicleView from './icicleViewReducer';

export default combineReducers({
  detailView,
  landingView,
  icicleView,
})
