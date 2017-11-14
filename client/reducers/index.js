import  { combineReducers } from 'redux';

import detailView from './detailViewReducer';
import icicleView from './icicleViewReducer';
import landingView from './landingViewReducer';
import profileView from './profileViewReducer';
import mainView from './mainViewReducer';
import app from './appReducer';

export default combineReducers({
  detailView,
  landingView,
  icicleView,
  profileView,
  mainView,
  app,
})
