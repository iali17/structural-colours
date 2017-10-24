import React, { Component } from 'react';
import { connect } from 'react-redux';

// Material ui
import { withStyles } from 'material-ui/styles';
import { GridList, GridListTile } from 'material-ui/GridList';

import {
  fetchRandomPictures,
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
    pictures: store.landingView.pictures,
    fetching: store.landingView.fetching,
    fetched: store.landingView.fetched
  };
})
class LandingView extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.dispatch(fetchRandomPictures())
  }

  render() {
    const { classes } = this.props;

    if (this.props.fetched) {
      return (
        <div className={classes.root}>
          <GridList cellHeight={'auto'} className={classes.gridList} cols={2}>
            {this.props.pictures.map((picture, index) => (
              <GridListTile key={index}>
                <img src={picture.picture} />
              </GridListTile>
            ))}
          </GridList>
        </div>
      )
    }
    else {
      return (
        <h1>NO PICTURES :(</h1>
      )
    }
  }
}

export default withStyles(styles)(LandingView);
