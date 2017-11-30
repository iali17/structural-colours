import React, { Component } from 'react';

export default class LandingPic extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <img src={this.props.pic.picture} onClick={() => this.props.getProfile(this.props.pic.species)} />
    );
  }
}
