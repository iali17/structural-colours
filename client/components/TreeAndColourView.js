import React, { Component } from 'react';
import Icicle from './Icicle';

export default class TreeAndColourView extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Icicle />
      </div>
    )
  }
}
