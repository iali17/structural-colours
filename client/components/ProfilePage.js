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
    dfetching: store.detailView.fetching,
    dfetched: store.detailView.fetched,
    picture: store.profileView.picture.results,
    pfetching: store.profileView.fetching,
    pfetched: store.profileView.fetched

  };
})


/* Main component of this page loads two other components  */
export default class ProfilePage extends Component {
	constructor(props) {
		super(props);
	}
	
	componentWillMount() {
    		this.props.dispatch(fetchPicture())
		this.props.dispatch(fetchDetail(1))
  	}
	render(){

		var imgURL;
		var name;
		const id = 1
		console.log(this.pfetching);
		const datalist = ['Structure', 'Wavelength', 'Factor', 'Location']
		return (
			<div>
				<img src = "http://localhost:8000/media/pictures/BogbaneBeetleP_MG0pOn5.png/"/>
				<Profile 

					name = {this.props.detail}/>		
				<Picture 
					
						imgURL = {this.props.picture}/>
			
				<Data
					dataList={datalist} />
			</div>
		)
		
	}
}

/* Loads the name and picture of the speicies */
var Profile = React.createClass({
	render(){


		if (this.props.dfetching) {
      			return <h1>IM FETCHING</h1>
    		} else if (this.props.dfetched) {
      			return <h1>{this.props.detail.common_name}</h1>
    		} else {
      			
			return <h1>{"name"}</h1>
    		}
		
	}
});

var Picture = React.createClass({
     render(){
	
	if (this.props.pfetched) {
		return (
			<div>
				<img src = {this.props.imgURL}/>
			</div>
			)
	} else {
		return (
			<div>
				"not fetched"
			</div>
		)
	}
    }
	
});
/* Loads the data associated with the species */
var Data = React.createClass({
	render(){
		
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