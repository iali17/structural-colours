import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router'; 

import {
  fetchPicture,
} from '../actions/pictureActions';

@connect((store) => {
  return {
    picture: store.profileView.picture.results,
    fetching: store.profileView.fetching,
    fetched: store.profileView.fetched
  };
})
export default class MainView extends Component {
  constructor(props) {
    super(props);
  }


  componentWillMount() {
    this.props.dispatch(fetchPicture())
  }

  
  render() {

    console.log(this.props.picture);
    if (this.props.fetching) {
      return <h1>IM FETCHING</h1>
    }
    else if (this.props.fetched) {
      return <p> <img src = {this.props.picture[0].picture}/> </p>
    }
    else {
      return <h1> NOT WORKING </h1>
    }

     
    /**
    *To be implemented when we implement pics on page
    *<Link to = "/ProfilePage">Click me </Link>
    */
    
  }
}
