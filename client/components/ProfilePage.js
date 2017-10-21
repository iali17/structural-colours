import React, { Component } from 'react';
import { connect } from 'react-redux';


import {
  fetchDetail,
} from '../actions/detailActions';

import {
  fetchPicture,
} from '../actions/pictureActions';

@connect((store) => {
  return {
    detail: store.detailView.detail,
    fetching: store.detailView.fetching,
    fetched: store.detailView.fetched
  };
})



/* Main component of this page loads two other components  */
export default class ProfilePage extends Component {
	constructor(props) {
		super(props);
	}
	
	render(){

		const datalist = ['Structure', 'Wavelength', 'Factor', 'Location']
		const id = 1
		return (
			<div>
				<Profile
					name={this.props.dispatch(fetchDetail(id))} /*need a way to get the id of the image clicked by the user to get to this page */
					/*imgURL={this.props.dispatch(fetchPicture(id))}*/ />
				<Data
					dataList={datalist} />
			</div>
		)
	}
}

/* Loads the name and picture of the speicies */
var Profile = React.createClass({
	render: function(){
		

		return (
			<div>
				<h3>{this.props.name}</h3>
				<img src={this.props.imgURL}/>
			</div>
		);

		
	}
});

/* Loads the data associated with the species */
var Data = React.createClass({
	render:function(){
		
	var data = this.props.dataList.map(function(data,index){
		return (<li key={index}>{data}</li>);
	});			
	
	return (
		<div>
			<ul>
				{data}
			</ul>

		</div>
		);
	}
	
});

