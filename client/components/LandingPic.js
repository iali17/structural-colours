import React, { Component } from 'react';

import { withStyles } from 'material-ui/styles';

/**
* The styles we will be using in this component
**/
const styles = theme => ({
  container: {
  },
  img: {
    height: '500px',
    opacity: '.7',
  },
});

/**
* This is the landing pic. When clicked on it goes to its profile page.
**/
class LandingPic extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.container}>
        <img className={classes.img} src={this.props.pic.picture} onClick={() => this.props.getProfile(this.props.pic.species)} />
      </div>
    );
  }
}

export default withStyles(styles)(LandingPic);
