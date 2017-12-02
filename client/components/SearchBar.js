import React, { Component } from 'react';
import { connect } from 'react-redux';

import { withStyles } from 'material-ui/styles';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';

import { TABS } from '../constants';

import {
  fetchPictures,
} from '../actions/pictureActions';

import {
  switchTabs
} from '../actions/appActions'

/**
* Styles we use on the search bar
**/
const styles = theme => ({
  textField: {
    marginRight: '15px',
  },
});
/**
* Empty store so we can use dispatch calls.
**/
@connect((store) => {
})

/**
* Search bar from material-ui.
*
* Everytime they press a key, we set the value.
* When the special key (13, enter) is clicked we go search
**/
class SearchBar extends React.Component {
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
  }

  handleKeyPress(target) {
    if (target.charCode == 13) {
      this.searchText()
    }
  }

  searchText() {
    var that = this;
    Promise.resolve(that.props.dispatch(switchTabs(TABS.main)))
    .then(function (response) {
      that.props.dispatch(fetchPictures("", that.state.value))
    })
  }

  render() {
    const { classes } = this.props;

    return (
       <div>
        <TextField
          className={classes.textField}
          id="search"
          label="Search"
          type="search"
          value={this.state.textFieldValue}
          onChange={this.handleChange.bind(this)}
          onKeyPress={this.handleKeyPress.bind(this)}
        />
        <Button raised color="contrast" onClick={this.searchText.bind(this)}>
          Search
        </Button>
      </div>
    );
  }
}

export default withStyles(styles)(SearchBar);
