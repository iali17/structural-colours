import  { combineReducers } from 'redux';

import detailView from './detailViewReducer';
import wordCloud from './wordCloudReducer';
import icicleView from './icicleViewReducer';
import landingView from './landingViewReducer';
import profileView from './profileViewReducer';
import mainView from './mainViewReducer';
import app from './appReducer';

export default combineReducers({
  detailView,
  wordCloud,
  landingView,
  icicleView,
  profileView,
  mainView,
  app,
})
