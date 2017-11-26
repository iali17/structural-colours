import React from 'react';
import TextField from 'material-ui/TextField';

import {
  fetchPicture,
} from '../actions/pictureActions';

export default class TextFieldExampleControlled extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      value: 'Search by common name',
    };
  }

  handleChange(event) {
    console.log("Event search:", event)
    
  };

  render() {
    return (
      <div>
        <TextField
          id="text-field-controlled"
          value;
          onChange={this.props.dispatch(fetchPicture(value))}
        />
      </div>
    );
  }
}