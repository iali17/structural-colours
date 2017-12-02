import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router';
import ReactDOM from 'react-dom';
import { debounce } from 'lodash';

// Material ui
import { withStyles } from 'material-ui/styles';
import { GridList, GridListTile } from 'material-ui/GridList';
import { LinearProgress } from 'material-ui/Progress';
import { CircularProgress } from 'material-ui/Progress';
import { grey } from 'material-ui/colors';

import MainPic from './MainPic';
import ColorBar from './ColorBar';

import {
  fetchNextPictures,
} from '../actions/pictureActions';

/**
* Styles that will be used for some of the
* components we render
**/
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
    backgroundColor: '#ececec',
  },
  subheader: {
    width: '100%',
  },
  linearProgress: {
    clear: "both",
  },
  setWidth: {
    width:'150px',
    height: '150px',
  },
});

/**
* The items we will be getting from the dispatch calls.
**/
@connect((store) => {
  return {
    pictures: store.mainView.pictures,
    fetching: store.mainView.fetching,
    fetched: store.mainView.fetched,
    id: store.app.id,
    colour: store.app.colour,
  };
})

/**
* This is the component right underneath the icicle.
* It handles paginiation, so when you scroll to the bottom
* it loads more pictures. 
*
* There is a loading bar from material-ui. We also use grids
* to make sure everything stays aligned.
**/
class MainView extends Component {
  constructor(props) {
    super(props);
    this.isAtBottom = this.isAtBottom.bind(this);
    this.trackScrolling = this.trackScrolling.bind(this);
    this.getNextPictures = this.getNextPictures.bind(this);
    this.getNextPictures = debounce(this.getNextPictures, 100);
  }

  componentDidMount() {
    document.addEventListener('wheel', this.trackScrolling);
  }

  componentWillUnmount() {
    document.removeEventListener('wheel', this.trackScrolling);
  }

  getNextPictures() {
    if (this.props.pictures.next && !this.props.fetching) {
      this.props.dispatch(fetchNextPictures(this.props.pictures.next))
    }
  }

  isAtBottom(el) {
    return el.getBoundingClientRect().bottom <= window.innerHeight;
  }

  trackScrolling() {
    const picturesEnd = ReactDOM.findDOMNode(this.picturesEnd);
    if (this.isAtBottom(picturesEnd)) {
      this.getNextPictures()
    }
  }

  render() {
    const { classes } = this.props;

    const primary = grey[800];

    if (this.props.fetched) {
      return (
        <div>
          <div className={classes.root}>
            <GridList cellHeight={'auto'} className={classes.gridList} cols={'auto'} spacing={2}>
              {this.props.pictures.results.map((picture, index) => (
                <GridListTile key={index} >
                  <div className={classes.setWidth}>
                    <MainPic pic={picture} getProfile={this.props.getProfile}/>
                  </div>
                </GridListTile>
              ))}
            </GridList>
          </div>
          <div style={{ float:"left", clear: "both" }}
               ref={(el) => { this.picturesEnd = el; }}>
          </div>
          <div>
            {this.props.fetching &&
              <LinearProgress color="primary" className={classes.linearProgress}/>
            }
          </div>
        </div>
      );
    }
    else {
      return (
        <LinearProgress color="primary" className={classes.linearProgress}/>
      );
    }
  }
}

export default withStyles(styles)(MainView);
