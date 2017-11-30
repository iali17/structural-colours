import React, { Component } from 'react';
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField';
import { TABS } from '../constants';

import {
  fetchPicture,
} from '../actions/pictureActions';

import {
  switchTabs
} from '../actions/appActions'

@connect((store) => {
})

export default class SearchBar extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      value: '',
    };
  }

  handleChange(e) {
    this.setState({
            value: e.target.value
    });

  };

  searchText() {
    this.props.dispatch(switchTabs(TABS.main))
    this.props.dispatch(fetchPicture("", this.state.value))
  }

  render() {
    return (
       <div>
        <TextField
          id="search"
          label="Search field"
          type="search"
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
