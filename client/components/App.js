import React, { Component } from 'react';
import { connect } from 'react-redux';

// Material ui
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Drawer from 'material-ui/Drawer'

import Container from './Container';
import ColorBar from './ColorBar';
import Icicle from './Icicle';
import TitleBar from './TitleBar'

import { TABS } from '../constants';

import {
  switchTabs,
  setCurrentColour,
  setCurrentId,
} from '../actions/appActions';

import {
  fetchPictures,
} from '../actions/pictureActions';

/**
* This is what we get from dispatch calls.
**/
@connect((store) => {
  return {
    activeTab: store.app.activeTab,
    colour: store.app.colour,
  };
})
/**
* This is the main view, it holds all the base components
* and puts them in grids. There is also some dispatch
* calls that wait on promises, to get to certain species.
**/
export default class App extends Component {
  constructor(props) {
    super(props);
    this.updateColour = this.updateColour.bind(this);
    this.getProfile = this.getProfile.bind(this);
  }
    // Override base syles on body
  componentDidMount() {
    document.body.style.margin = 0;
    document.body.style.background = "#ECECEC";
  }

  updateColour(colour) {
    var that = this;
    Promise.resolve(that.props.dispatch(setCurrentColour(colour)))
    .then(function (response) {
      that.props.dispatch(fetchPictures(colour))
      return response;
    })
    .then(function(response) {
      if (that.props.activeTab != TABS.main) {
        that.props.dispatch(switchTabs(TABS.main))
      }
    })
  }

  getProfile(id) {
    var that = this;
    Promise.resolve(that.props.dispatch(setCurrentId(id)))
    .then(function (response) {
      that.props.dispatch(switchTabs(TABS.profile))
    })
  }

  render() {
    return (
      <div style={{overflowX:'hidden'}}>
        <Grid container spacing={0}>
          <Grid item xs={12}>
            <TitleBar />
            <Icicle getProfile={this.getProfile}/>
          </Grid>
        </Grid>
        <Grid container spacing={0}>
          <Grid item xs={0}>
           <ColorBar colour={this.props.colour} updateColour={this.updateColour}/>
          </Grid>
          <Grid item xs>
            <Container getProfile={this.getProfile}/>
          </Grid>
        </Grid>
      </div>
    );
  }
}
