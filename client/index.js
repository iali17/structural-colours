import React from 'react';
import { render } from 'react-dom';
import ColorBar from './components/ColorBar';
import { Provider } from 'react-redux';

import App from './components/App';
import store from './store/store.js';

render(
  <Provider store={store}>
    <App />
    <ColorBar />
  </Provider>,
  document.getElementById('app')
);
