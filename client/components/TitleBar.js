import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';

import Button from 'material-ui/Button';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';

import Icicle from './Icicle';
import SearchBar from './SearchBar';

import {
  fetchTax,
} from '../actions/taxonomyActions';


const styles = theme => ({
  root: {
    width: '100%',
  },
  appBar: {
    backgroundColor: '#f1f1f1',
  },
});


@connect((store) => {
})
class TitleBar extends Component {
  constructor(props) {
    super(props);
  }

  resetIcicle() {
    this.props.dispatch(fetchTax())
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <AppBar className={classes.appBar} position="static" color="default" >
          <Toolbar>
            <h1 style={{flex: 1}} onClick = {this.resetIcicle.bind(this)}>DTSC | Dynamic Taxonomy of Structural Colour in Life-forms</h1>
            <SearchBar/>
            <Button disabled className={classes.Button}>
              Edit/Contribute
            </Button>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default withStyles(styles)(TitleBar);
