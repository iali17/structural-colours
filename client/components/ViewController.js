import React, { Component } from 'react';
import MainView from './MainView';
import ProfilePage from './ProfilePage';

export default class View extends Component {
	constructor(props) {
    	super(props);
	}
	
    
  	
	render(){
		var page= this.props.page;
		console.log("State: ", this.state);
		if (page == 'main'){
			return (<MainView colour={this.props.colour} updateColour={this.props.updateColour.bind(this)}/>)
		} else {
			return (<ProfilePage/>)
		}
	}

}