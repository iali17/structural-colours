import React, { Component } from 'react';
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField';  

import {
  fetchPicture,
} from '../actions/pictureActions';

@connect((store) => {
})

export default class SearchBar extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      value: 'Bogbane Beetle',
    };
  }

  handleChange(e) {
    console.log("Event search:", e.target.value)
    this.setState({
            value: e.target.value
    });
    
  };

  searchText() {
    this.props.dispatch(fetchPicture("", this.state.value))
  }

  render() {
    return (
       <div>
        <TextField
          defaultValue="Search here"
          value={this.state.textFieldValue}
          onChange={this.handleChange.bind(this)}
        />
        <button
          onClick={this.searchText.bind(this)}
        >  
          Search
        </button>
      </div>
    );
  }
}