import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import routes from './routes';



import App from './components/App';
import store from './store/store.js';

render(
  <Provider store={store}>
    <App />
  </Provider>,
  
  document.getElementById('app')
);
