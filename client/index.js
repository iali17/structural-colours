import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom'

import App from './components/App';
import store from './store/store.js';

render((
	<BrowserRouter>
  		<Provider store={store}>
   			<App />
  		</Provider>
  	</BrowserRouter>),

  document.getElementById('app')
);
