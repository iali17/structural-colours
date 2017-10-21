import React, { Component } from 'react';

import TreeAndColourView from './TreeAndColourView';
import MainView from './MainView';
import ProfilePage from './ProfilePage';
import ColorBar from './ColorBar';
import TreeView from './TreeView';


export default class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <TreeAndColourView />
        <TreeView />
        <MainView />
	{this.props.children}
	{/*{this.props.children} 
		<ProfilePage />for profile page */}
        <ColorBar />

      </div>
    )
  }
}



