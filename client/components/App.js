import React, { Component } from 'react';

import TreeAndColourView from './TreeAndColourView';
import MainView from './MainView';

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <TreeAndColourView />
        <MainView />
      </div>
    )
  }
}
