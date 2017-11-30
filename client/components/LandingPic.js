import React, { Component } from 'react';

import { withStyles } from 'material-ui/styles';

const styles = theme => ({
  container: {
  },
  img: {
  },
});

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
