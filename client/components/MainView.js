import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router';
import ReactDOM from 'react-dom';
import { debounce } from 'lodash';

// Material ui
import { withStyles } from 'material-ui/styles';
import { GridList, GridListTile } from 'material-ui/GridList';

import MainPic from './MainPic';
import ColorBar from './ColorBar';

import {
  fetchNextPictures,
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
    pictures: store.mainView.pictures,
    fetched: store.mainView.fetched,
    id: store.app.id,
    colour: store.app.colour,
  };
})
class MainView extends Component {
  constructor(props) {
    super(props);
    this.isAtBottom = this.isAtBottom.bind(this);
    this.trackScrolling = this.trackScrolling.bind(this);
    this.getNextPictures = this.getNextPictures.bind(this);
    this.getNextPictures = debounce(this.getNextPictures, 500);
  }

  componentDidMount() {
    document.addEventListener('wheel', this.trackScrolling);
  }

  componentWillUnmount() {
    document.removeEventListener('wheel', this.trackScrolling);
  }

  getNextPictures() {
    this.props.dispatch(fetchNextPictures(this.props.pictures.next))
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

    if (this.props.fetched) {
      return (
        <div>
          <div className={classes.root}>
            <GridList cellHeight={'auto'} className={classes.gridList} cols = {'auto'} spacing = {0}>
              {this.props.pictures.results.map((picture, index) => (
                <GridListTile key={index} >
                  <MainPic pic={picture} getProfile={this.props.getProfile}/>
                </GridListTile>
              ))}
            </GridList>
          </div>
          <div style={{ float:"left", clear: "both" }}
               ref={(el) => { this.picturesEnd = el; }}>
          </div>
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
export default withStyles(styles)(MainView);
