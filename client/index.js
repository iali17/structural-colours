import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import { grey, red } from 'material-ui/colors';

import App from './components/App';
import ProfilePage from './components/ProfilePage';
import MainPage from './components/MainView';
import store from './store/store.js';

const theme = createMuiTheme({
  palette: {
    primary: grey,
    secondary: {
      ...grey,
    },
    error: red,
  },
});

render(
  <MuiThemeProvider theme={theme}>
    <Provider store={store}>
      <App/>
    </Provider>
  </MuiThemeProvider>,
  document.getElementById('app')
);
