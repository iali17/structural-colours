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

	render() {

		//if (this.props.dfetched && this.props.pfetched && (this.props.id != this.props.picture.species) && !this.props.dfetching && !this.props.pfetching) {
			//this.props.dispatch(fetchDetail(this.props.id))
			//this.props.dispatch(fetchOnePicture(this.props.id))
		//}//else if (this.props.dfetched && this.props.pfetched && !this.props.dfetching && !this.props.pfetching) {

		// if (this.props.dfetched && this.props.pfetched && this.props.id != this.props.picture.species && !this.props.dfetching && !this.props.pfetching){
		// 	this.props.dispatch(fetchDetail(this.props.id))
		// 	this.props.dispatch(fetchOnePicture(this.props.id))
		// 	//this.setState({needToReFetch: true})
		// } //else if(this.props.dfetched && this.props.pfetched && this.props.id == this.props.picture.species && !this.props.dfetching && !this.props.pfetching && this.state.needToReFetch) {
			//this.setState({needToReFetch: false})
		//}

		// if (this.prevId != id){
		// 	this.props.dispatch(fetchDetail(this.props.id))
		// 	this.props.dispatch(fetchOnePicture(this.props.id))
		// 	this.prevId = id
		// }
		
		if (this.props.dfetched && this.props.pfetched && this.props.id == this.props.picture.species) {
			var imgURL;
			var id = this.props.id

			var datalist
			const { classes } = this.props;

			console.log("picture and id: ", this.props.picture, this.props.id)
			const info = this.props.detail
			datalist = [info.description, "wavelength = " + info.wavelength, "structure = " + info.structure + "D"]

			var data = datalist.map(function(data,index) {
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
		} else if(this.props.dfetched) {
			return(
				<div>
					Fetched detail, waiting on picture.
				</div>
			);
		}
    else if (this.props.pfetched) {
			return (
				<div>
					Fetched picture waiting on detail.
				</div>
			);
		}
    else {
			return (
				<div>
					{"Fetching name"}
				</div>
			);
		}
	}
}
