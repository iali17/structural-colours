import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';

/**
* Styles that will be used for some of the
* components we render
**/
const styles = theme => ({
});

class WordCloud extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { classes } = this.props;

    return (
      <div></div>
    );
  }
}

export default withStyles(styles)(WordCloud);
