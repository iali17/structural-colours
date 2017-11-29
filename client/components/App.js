import React, { Component } from 'react';
import { connect } from 'react-redux';

// Material ui
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Drawer from 'material-ui/Drawer'

import Container from './Container';
import ColorBar from './ColorBar';
import Icicle from './Icicle';
import SearchBar from './SearchBar';
import TitleBar from './TitleBar'


import { TABS } from '../constants';

import {
  switchTabs,
  setCurrentColour,
  setCurrentId,
} from '../actions/appActions';

import {
  fetchPicture,
} from '../actions/pictureActions';

@connect((store) => {
  return {
    activeTab: store.app.activeTab,
    colour: store.app.colour,
  };
})
export default class App extends Component {
  constructor(props) {
    super(props);
    this.updateColour = this.updateColour.bind(this);
    this.getProfile = this.getProfile.bind(this);
  }
    // Override base syles on body
  componentDidMount() {
    document.body.style.margin = 0;
  }

  updateColour(colour) {
    var that = this;
    Promise.resolve(that.props.dispatch(setCurrentColour(colour)))
    .then(function (response) {
      that.props.dispatch(fetchPicture(colour))
      return response;
    })
    .then(function(response){
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
      <div>
        <Grid container spacing={0}>
          <Grid item xs={12}>
            <TitleBar />
            <SearchBar/>
            <Icicle getProfile={this.getProfile}/>
          </Grid>
        </Grid>
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <ColorBar colour={this.props.colour} updateColour={this.updateColour}/>
            <Container getProfile={this.getProfile}/>
          </Grid>
        </Grid>
      </div>
    );
  }
}
