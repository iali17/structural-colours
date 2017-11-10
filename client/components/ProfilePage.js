
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';
import Typography from 'material-ui/Typography'; 
import { blueGrey, brown } from 'material-ui/colors';



import {
  fetchDetail,
} from '../actions/detailActions';

import {
	fetchOnePicture,
} from '../actions/pictureActions';
 
const styles = theme => ({
  
  card: {
  	primary: blueGrey[100],
    maxWidth: 45,
  },
  media: {
    height: 40,
  },
});

@connect((store) => {
  return {
    detail: store.detailView.detail,
    dfetching: store.detailView.fetching,
    dfetched: store.detailView.fetched,
    picture: store.profileView.picture,
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
    	/*this.props.dispatch(fetchPicture())*/
		this.props.dispatch(fetchDetail(this.props.id))
		this.props.dispatch(fetchOnePicture(this.props.id))
  	}
 
	render(){

		var imgURL;
		
		var id = this.props.id

		
		var datalist
		const { classes } = this.props;
		
		if (this.props.dfetched && this.props.pfetched) {
			const info = this.props.detail
			datalist = [info.description, "wavelength = " + info.wavelength, "structure = " + info.structure + "D"]
			
			var data = datalist.map(function(data,index){
				return (<li key={index}>{data}</li>);
			});
			return (

				<div>
					<center>
					<h1>
					{this.props.detail.common_name}
					</h1>

					<Card className={this.props.card}>

						<CardMedia
							className = {this.props.media}
							image =  {this.props.detail.sillouette}
							title = {this.props.detail.common_name}
							/>
						<CardContent>
							<Typography type="headline" component=
							"h3">
								{this.props.detail.family},
								{this.props.detail.species}
								<p>
								<img src = {this.props.detail.sillouette}/>	
								<img src = {this.props.picture.picture}/>
								</p>
          					</Typography>
        				</CardContent>
        			</Card>
					
					<ul style = {{listStyleType: 'none'}}>
						<Card className={this.props.card}>
							<CardContent>
								 <Typography>
										{data}
								</Typography>
	        				</CardContent>
	        			</Card>
        			</ul>
					</center>

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

