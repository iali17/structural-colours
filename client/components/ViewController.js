import React, { Component } from 'react';
import MainView from './MainView';
import ProfilePage from './ProfilePage';
import LandingPage from './LandingView';

export default class View extends Component {
	constructor(props) {
    	super(props);
	}
	
    
  	
	render(){
		var page= this.props.page;
		console.log("Page: ", page);
		if (page == 'main'){
			return (<MainView colour={this.props.colour} updateColour={this.props.updateColour.bind(this)}/>)
		}else if (page == 'landing'){
			return (<LandingPage/>)
		} else {
			return (<ProfilePage/>)
		}
	}

}