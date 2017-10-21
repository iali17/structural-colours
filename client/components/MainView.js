import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router'; 

import {
  fetchDetail,
} from '../actions/detailActions';

@connect((store) => {
  return {
    detail: store.detailView.detail,
    fetching: store.detailView.fetching,
    fetched: store.detailView.fetched
  };
})
export default class MainView extends Component {
  constructor(props) {
    super(props);
  }


  render() {

    
    if (this.props.fetching) {
      return <h1>IM FETCHING</h1>
    }
    else if (this.props.fetched) {
      return <p>{this.props.detail.common_name}</p>
    }
    else {
      return <button onClick={() => this.props.dispatch(fetchDetail(1))} />
    }

     
    /**
    *To be implemented when we implement pics on page
    *<Link to = "/ProfilePage">Click me </Link>
    */
    
  }
}
