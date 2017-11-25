import React, { Component } from 'react';
import { connect } from 'react-redux';

// Material ui
import { withStyles } from 'material-ui/styles';
import { GridList, GridListTile } from 'material-ui/GridList';

import MainPic from './MainPic';

import {
  fetchRandomPicture,
} from '../actions/pictureActions';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    background: theme.palette.background.paper,
  },
});

@connect((store) => {
  return {
    picture: store.landingView.picture,
    fetching: store.landingView.fetching,
    fetched: store.landingView.fetched
  };
})
class LandingView extends Component {
  constructor(props) {
    super(props);
    var interval = setInterval(this.getPictures.bind(this), 10000); // calls get pictures every 10 sec
    this.state = {"interval": interval}
  }

  getPictures() {
    this.props.dispatch(fetchRandomPicture())
  }

  componentWillMount() {
    this.getPictures()
  }

  componentWillUnmount() {
    clearInterval(this.state.interval);
  }

  render() {
    const { classes } = this.props;

    if (this.props.fetched) {
      return (
        <div className={classes.root}>
          <MainPic pic={this.props.picture} getProfile={this.props.getProfile}/>
        </div>
      );
    }
    else {
      return (
        <h1>NO PICTURES :(</h1>
      )
    }
  }
}

export default withStyles(styles)(LandingView);
