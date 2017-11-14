import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router';

// Material ui
import { withStyles } from 'material-ui/styles';
import { GridList, GridListTile } from 'material-ui/GridList';

import MainPic from './MainPic';
import ColorBar from './ColorBar';

import {
  fetchPicture,
} from '../actions/pictureActions';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    background: theme.palette.background.paper,
  },
  gridList: {
    width: '100%',
    height: '100%',
  },
  subheader: {
    width: '100%',
  },
});

@connect((store) => {
  return {
    picture: store.mainView.picture.results,
    fetching: store.mainView.fetching,
    fetched: store.mainView.fetched
  };
})
class MainView extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount( ) {
    var colour = this.props.colour;
    this.getProfile.bind(this)
    this.props.dispatch(fetchPicture(colour))
  }

  getProfile(t) {
    var id2 = 2
    this.props.getProfile(id2 );
  }

  render() {
    const { classes } = this.props;

    if (this.props.fetched) {
      return (
        <div className={classes.root}>
          <GridList cellHeight={'auto'} className={classes.gridList} cols={4}>
            {this.props.picture.map((picture, index) => (
              <GridListTile key={index} >
                <MainPic pic = {picture}  getProfile={this.props.getProfile.bind(this)}/>
              </GridListTile>
            ))}
          </GridList>
        </div>
      );
    }
    else {
      return (
        <h1>NO PICTURES :(</h1>
      );
    }
  }
}
    /**
    *To be implemented when we implement pics on page
    *<Link to = "/ProfilePage">Click me </Link>
    */
export default withStyles(styles)(MainView);
