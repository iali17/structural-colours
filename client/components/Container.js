import React, { Component } from 'react';
import { connect } from 'react-redux';

import { TABS } from '../constants';

import MainView from './MainView';
import ProfilePage from './ProfilePage';
import LandingPage from './LandingView';
import ColorBar from './ColorBar';

/**
* What we will be getting from dispatch calls.
**/
@connect((store) => {
  return {
    activeTab: store.app.activeTab,
    id: store.app.id,
  };
})
/**
* This loads the tab into the component.
**/
export default class LandingView extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const pickTab = () => {
      switch(this.props.activeTab) {
        case TABS.landing: {
          return (
            <LandingPage getProfile={this.props.getProfile}/>
          );
        }
        case TABS.main: {
          return (
            <div>
              <MainView getProfile={this.props.getProfile}/>
            </div>
          );
        }
        case TABS.profile: {
          return (
            <ProfilePage id={this.props.id} getProfile={this.props.getProfile}/>
          );
        }
      }
    };

    return (
      <div>
        {pickTab()}
      </div>
    );
  };
}
