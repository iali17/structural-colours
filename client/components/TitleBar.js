import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';

import Button from 'material-ui/Button';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';

import Icicle from './Icicle';
import SearchBar from './SearchBar';

/**
* Styles that will be used for some of the
* components we render
**/
const styles = theme => ({
  root: {
    width: '100%',
    cursor: "pointer",
  },
  appBar: {
    backgroundColor: '#f1f1f1',
  },
  button: {
    marginTop: '15px',
  },
  title: {
    flex: '1',
    fontSize: '2rem',
  },
});

/**
* Creates a title bar that will reset the icicle when clicked.
* There is a disabled button for edit and contribute for later progress.
*
* We are using material-ui next for these components.
**/
class TitleBar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <AppBar className={classes.appBar} position="static" color="default" >
          <Toolbar>
            <Typography type="headline" component="h1" className={classes.title} onClick={this.props.resetIcicle}>
              DTSC | Dynamic Taxonomy of Structural Colour in Life-forms
            </Typography>
            <SearchBar/>
            <Button disabled className={classes.button}>
              Edit/Contribute
            </Button>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default withStyles(styles)(TitleBar);
