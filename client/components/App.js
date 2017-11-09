import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// Material ui
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Drawer from 'material-ui/Drawer'

import MainView from './MainView';
import ProfilePage from './ProfilePage';
import ColorBar from './ColorBar';
import Icicle from './Icicle';
import LandingView from './LandingView'
import Main from '../routes.js'

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
            <h1>DTSC | Dynamic Taxonomy of Structural Colour in Life-forms</h1>
            <Icicle />     
          </Grid>
        </Grid>
        <Grid container spacing={24}>
          <Grid item xs={2} sm = {1}>
              <ColorBar />
          </Grid>
          <Grid item xs={12} sm={6}>
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
