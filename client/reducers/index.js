import  { combineReducers } from 'redux';

import detailView from './detailViewReducer';
import icicleView from './icicleViewReducer';
import landingView from './landingViewReducer';
import profileView from './profileViewReducer';
import mainView from './mainViewReducer';

export default combineReducers({
  detailView,
  landingView,
  icicleView,
  profileView,
  mainView,
})
