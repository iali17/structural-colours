import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import { blueGrey, brown } from 'material-ui/colors';
import WordCloud from './WordCloud';

import {LinearProgress} from 'material-ui/Progress';

import {
  fetchDetail,
} from '../actions/detailActions';

import {
	fetchOnePicture,
} from '../actions/pictureActions';

// The styles that will be used in this component.
const styles = theme => ({
  card: {
  	palette: '#f1f1f1',
    maxWidth: 45,
    fontfamily: 'Helvetica'
  },
  media: {
    height: 40,
  },
  root: {
    width: '100%',
  },
});

// What we will be using from the dispatch calls.
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


/** 
* This is the profile page. It first fetches all the stuff we need from the id that
* is supplied to it. It then takes the information of of that and call two components
* which will help display the information. 
**/
export default class ProfilePage extends Component {
	constructor(props) {
		super(props);
	}

	componentWillMount() {
		this.props.dispatch(fetchDetail(this.props.id))
		this.props.dispatch(fetchOnePicture(this.props.id))
  	}

	render() {
		if (this.props.dfetched && this.props.pfetched && this.props.id == this.props.picture.species) {
			var imgURL;
			var datalist
			const { classes } = this.props;
			console.log(classes)
			var eco = [];
			var geo = [];
			var fun = [];
			var mec = [];
			var inv = [];
			var tun;


			const info = this.props.detail
			var i;

			for (i = 0; i < info.ecosystem.length; i++) {

				switch (info.ecosystem[i]) {

					case "Fo":
						eco.push("Forest");
						break;
					case 'Mo':
						eco.push("Mountain");
						break;
					case 'De':
						eco.push("Desert");
						break;
					case 'Gr':
						eco.push("Grassland");
						break;
					case 'Fr':
						eco.push("Freshwater");
						break;
					case 'Ma':
						eco.push("Marine");
						break;
					default:
						eco = null;
					}
			}
			for (i = 0; i < info.geography.length; i++) {

				switch (info.geography[i]) {

					case "As":
						geo.push("Asia");
						break;
					case 'Am':
						geo.push("America");
						break;
					case 'Eu':
						geo.push("Europe");
						break;
					case 'Af':
						geo.push("Africa");
						break;
					case 'Oc':
						geo.push("Oceania");
						break;
					default:
						eco = null;
					}
			}

			for (i = 0; i < info.mechanism.length; i++) {

				switch (info.mechanism[i]) {

					case "I":
						mec.push("Interference");
						break;
					case 'S':
						mec.push("Scattering");
						break;
					case 'D':
						mec.push("Diffraction");
						break;

					default:
						eco = null;
					}
			}
			for (i = 0; i < info.presumable_Functions.length; i++) {

				switch (info.presumable_Functions[i]) {

					case "A":
						fun.push("Aposematism");
						break;
					case 'C':
						fun.push("Crypsis");
						break;
					case 'S':
						fun.push("Sexual");
						break;
					case 'O':
						fun.push("Other");
						break;

					default:
						eco = null;
					}
			}

			for (i = 0; i < info.invisable_Signals.length; i++) {

				switch (info.invisable_Signals[i]) {

					case "I":
						inv.push("Infrared");
						break;
					case 'U':
						inv.push("Ultraviolet");
						break;
					default:
						eco = null;
					}
			}

			if (info.tunable == "A") {
				tun = "Active"
			} else if (info.tunable == "P") {
				tun = "Passive"
			} else {
				tun = ""
			}


			datalist = [info.description, "Wavelength = " + info.wavelength, "Structure = " + info.structure + "D",
			"Ecosystem: " + eco, "Geography: " + geo, "Mechanism: " + mec,
			"Presumable function: " + fun, "Tunable: " + tun, "Invisable Signals: " + inv]

			var data = datalist.map(function(data,index) {
				return (<li key={index}>{data}</li>);
			});

			return (
				<div>
					<center>
					<h1>
					{this.props.detail.common_name}
					</h1>
          			<WordCloud id = {this.props.picture.species}/>
					<Card className={this.props.card} style = {{width: '550px'}}>
						<CardContent>
							<Typography type="headline" component="h3">
								{this.props.detail.family},
								{this.props.detail.species}
      				</Typography>
              <p>
                <img src = {this.props.detail.sillouette}/>
                <img src = {this.props.picture.picture}/>
              </p>
      			</CardContent>
						<ul style = {{listStyleType: 'none', textAlign:'Left'}} >
							<CardContent>
								 <Typography>
									{data}
								</Typography>
	        				</CardContent>
	        			</ul>
	        		</Card>
					</center>
				</div>
			)
		} else if(this.props.dfetched) {
			return(
				<div>
					<LinearProgress mode="indeterminate" color="primary"/>
				</div>
			);
		}
    else if (this.props.pfetched) {
			return (
				<div>
					<LinearProgress mode="indeterminate" color="primary"/>
				</div>
			);
		}
    else {
			return (
				<div>
					<LinearProgress mode="indeterminate" color="primary"/>
				</div>
			);
		}
	}
}
