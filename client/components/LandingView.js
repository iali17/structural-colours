import React, { Component } from 'react';
import { connect } from 'react-redux';

// Material ui
import { withStyles } from 'material-ui/styles';
import { GridList, GridListTile } from 'material-ui/GridList';
import Typography from 'material-ui/Typography';

import LandingPic from './LandingPic';

import {
  fetchRandomPicture,
} from '../actions/pictureActions';

// The styles that will be used in this component.
const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: '#ececec',
    alignItems: 'center',
    marginTop: '40px',
  },
  title: {
    fontSize: '3.5rem',
    color: '#565656',
    borderRight: 'medium solid #565656',
    paddingRight: '85px',
  }
});

// What we will be using from the dispatch calls.
@connect((store) => {
  return {
    picture: store.landingView.picture,
    fetching: store.landingView.fetching,
    fetched: store.landingView.fetched
  };
})

/**
* This is the landing page. It loads a random picture with a dispatch call
* every 10 seconds. If you click on a picture it will take you to that 
* pictures profile page.
**/
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
          <Typography type="headline" component="h3" className={classes.title}>
             Explore<br/>
             Structural<br/>
             Colour<br/>
             to Inform<br/>
             Biomimetic<br/>
             Design
           </Typography>
          <LandingPic pic={this.props.picture} getProfile={this.props.getProfile}/>
        </div>
      );
    }
    else {
      return (
        <div></div>
      )
    }
  }
}

export default withStyles(styles)(LandingView);
