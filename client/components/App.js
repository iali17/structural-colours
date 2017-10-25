import React, { Component } from 'react';

// Material ui
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';

import MainView from './MainView';
import ProfilePage from './ProfilePage';
import ColorBar from './ColorBar';
import TreeView from './TreeView';
import LandingView from './LandingView'

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  // Override base syles on body
  componentDidMount() {
    document.body.style.margin = 0;
  }

  render() {
    return (
      <div>

        <Grid container spacing={0}>
          <Grid item xs={12}>
            <h1>TREE VIEW</h1>
            <p>|</p>
            <p>|</p>
            <p>|</p>
            <p>|</p>
            <p>|</p>
            <p>|</p>
            <p>|</p>
            <p>|</p>         
          </Grid>
        </Grid>
        <Grid container spacing={24}>
          <Grid item xs={12}>
              <LandingView />
          </Grid>
        </Grid>

      	{this.props.children}
      	{/*{this.props.children}
      		<ProfilePage />for profile page */}


      </div>
    )
  }
}
