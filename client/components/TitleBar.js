import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';

import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';

const styles = theme => ({
  root: {
    width: '100%',
  },
  appBar: {
    backgroundColor: '#f1f1f1',
  },
});

class TitleBar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <AppBar className={classes.appBar} position="static" color="default">
          <Toolbar>
            <h1>DTSC | Dynamic Taxonomy of Structural Colour in Life-forms</h1>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default withStyles(styles)(TitleBar);
