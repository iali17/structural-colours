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

  

    if 
	render(){

		var imgURL;
		

		var id = 0
		
		var datalist	

		if (this.props.dfetched && this.props.pfetched) {
			const info = this.props.detail
			datalist = [info.description, "wavelength = " + info.wavelength, "structure = " + info.structure]
			
			var data = datalist.map(function(data,index){
				return (<li key={index}>{data}</li>);
			});
			return (
				<div>
					
					<h2>
					{this.props.detail.common_name}
					</h2>

					{this.props.detail.family},
					{this.props.detail.species}

					<p>	
					<img src = {this.props.detail.sillouette}/>
					<img src = {this.props.picture[id].picture}/>
					</p>

					<ul>
						{data}
					</ul>

				</div>
			)
		} else if(this.props.defetched) {
			return(
				<div>
					
					{this.props.detail.common_name}
					<p>
						<img src = "http://localhost:8000/media/pictures/BogbaneBeetleP_MG0pOn5.png/"/>
					</p>
					
				</div>
			)
		} else if(this.props.pfetched) {
			return(
				<div>
					
					Fetching

					<img src = {this.props.picture[id].picture}/>

					/>
				</div>
			)
		} else {
			return(
				<div>
						
					{"Fetching name"}

					<img src = "http://localhost:8000/media/pictures/BogbaneBeetleP_MG0pOn5.png/"/>
					/>
				</div>
			)
		}

		
	}
}
