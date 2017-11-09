import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import App from './components/App';
import ProfilePage from './components/ProfilePage';
import MainPage from './components/MainView';
import store from './store/store.js';

render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('app')
);