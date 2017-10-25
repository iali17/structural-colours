import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import {Router, Route, IndexRoute, hashHistory} from "react-router";
import routes from './routes';

import App from './components/App';
import ProfilePage from './components/ProfilePage';
import store from './store/store.js';

render(
  <Provider store={store}>
    <ProfilePage />
  </Provider>,
  
  document.getElementById('app')
);