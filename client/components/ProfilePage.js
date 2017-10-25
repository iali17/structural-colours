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
    detail: store.detailView.family,
    fetching: store.detailView.fetching,
    fetched: store.detailView.fetched
  };
})

@connect((store) => {
  return {
    pictures: store.profileView.pictures,
    fetching: store.profileView.fetching,
    fetched: store.profileView.fetched
  };
})



@connect((store) => {
  return {
    picture: store.pictureView.picture,
    fetching: store.pictureView.fetching,
    fetched: store.pictureView.fetched
  };
})



/* Main component of this page loads two other components  */
export default class ProfilePage extends Component {
	constructor(props) {
		super(props);
	}
	
	render(){

		var imgURL;
		var name;
		
		const id = 1
		if (this.props.fetching) {

      			imgURL = "IM FETCHING";
		}else if (this.props.fetched) {
      			imgURL = this.props.pictures.pictures;
		}else {
      			imgURL = this.props.dispatch(fetchPicture(id));
		}

		if (this.props.fetching) {
      			name = "IM FETCHING";
			
    		}else if (this.props.fetched) {
      			name = this.props.detail.common_name;
			{/*datalist = [this.props.detail.family, this.props.detail.description, this.props.detail.species, this.props.detail.wavelength]*/}
    		} else {
      			name = this.props.dispatch(fetchDetail(1));
    		}

		
		const datalist = ['Structure', 'Wavelength', 'Factor', 'Location']
		return (
			<div>
				<Profile
					name = {name}
					imgURL/>
					
>>>>>>> develop
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

