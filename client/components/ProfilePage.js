import React, { Component } from 'react';

/* To be replaced with fetches from django api */
var DATA = {    
    name: 'Frog',
    imgURL: 'https://ichef-1.bbci.co.uk/news/624/cpsprodpb/AA04/production/_87842534_bbc_biswas_7.jpg',
    datalist: ['Structure', 'wavelength', 'Factor', 'Location']
}

/* Main component of this page loads two other components  */
export default class ProfilePage extends Component {
	constructor(props) {
		super(props);
	}

	render(){
		return (
			<div>
				<Profile
					name={this.props.profileData.name}
					imgURL={this.props.profileData.imgURL}/>
				<Data
					dataList={this,props.profileData.dataList} />
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


