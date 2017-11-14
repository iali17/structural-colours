import React, { Component } from 'react';
import MainView from './MainView';
import ProfilePage from './ProfilePage';
import LandingPage from './LandingView';
import ColorBar from './ColorBar';

export default class View extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		var page= this.props.page;

		if (page == 'main') {
			return (
				<div>
					<ColorBar colour={this.props.colour} updateColour={this.props.updateColour.bind(this)}/>
					<MainView colour={this.props.colour} updateColour={this.props.updateColour.bind(this)} id={this.props.id} getProfile={this.props.getProfile.bind(this)}/>
				</div>
			);
		}
		else if (page == 'landing') {
			return (<LandingPage/>);
		}
		else {
			return (<ProfilePage id={this.props.id} getProfile={this.props.getProfile.bind(this)}/>);
		}
	}
}
