import React, { Component } from 'react';
import { connect } from 'react-redux';

// Material ui
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Drawer from 'material-ui/Drawer'

import Container from './Container';
import ColorBar from './ColorBar';
import Icicle from './Icicle';

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
    this.props.dispatch(setCurrentColour(colour));
    this.props.dispatch(fetchPicture(colour))
    if (this.props.activeTab != TABS.main) {
      this.props.dispatch(switchTabs(TABS.main))
    }
  }

  getProfile(id) {
    this.props.dispatch(setCurrentId(id));
    if (this.props.activeTab != TABS.profile) {
      this.props.dispatch(switchTabs(TABS.profile))
    }
  }

  render() {
    return (
      <div>
        <Grid container spacing={0}>
          <Grid item xs={12}>
            <h1>DTSC | Dynamic Taxonomy of Structural Colour in Life-forms</h1>
            <SearchBar />
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
