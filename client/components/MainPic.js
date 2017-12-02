import React, { Component } from 'react';

import { withStyles } from 'material-ui/styles';

/**
* Styles that will be used for some of the
* components we render
**/
const styles = theme => ({
  img: {
    position: 'absolute',
    margin: 'auto',
    minHeight: '100%',
    minWidth: '100%',
    left: '-100%',
    right: '-100%',
    top: '-100%',
    bottom: '-100%',
    cursor: 'pointer',
  },
});

/**
* This is a picture component, that will send to the profile page
* when the picture is clicked.
**/
class MainPic extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { classes } = this.props;

    return (
      <img className={classes.img} src={this.props.pic.picture} onClick={() => this.props.getProfile(this.props.pic.species)} />
    );
  }
}

export default withStyles(styles)(MainPic);
