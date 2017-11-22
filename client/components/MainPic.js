import React, { Component } from 'react';

export default class MainPic extends Component {
  constructor(props) {
    super(props);
  }

  getProfile(t) {
    var id2 = this.props.pic.species
    this.props.getProfile(id2 );
  }

  render() {
    return (
      <img src={this.props.pic.picture}  onClick =  { this.getProfile.bind(this)} />
    );
  }
}
