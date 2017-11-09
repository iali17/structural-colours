import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// Material ui
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';

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
        <ul>
          <li><Link to='/profilePage'>Home</Link></li> 
        </ul>
        <Grid container spacing={0}>
          <Grid item xs={12}>
            <h1>DTSC | Dynamic Taxonomy of Structural Colour in Life-forms</h1>
            <Icicle />
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
