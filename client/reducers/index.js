import  { combineReducers } from 'redux';

import detailView from './detailViewReducer';
import landingView from './LandingViewReducer';
import profileView from './profileViewReducer';


export default combineReducers({
  detailView,
  landingView,
  profileView,
})
