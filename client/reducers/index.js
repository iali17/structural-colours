import  { combineReducers } from 'redux';

import detailView from './detailViewReducer';
import landingView from './landingViewReducer';
import profileView from './profileViewReducer';
import mainView from './mainViewReducer';

export default combineReducers({
  detailView,
  landingView,
  profileView,
  mainView,
})
