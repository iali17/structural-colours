import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import {
	COLOR_BAR_SIZE_1,
	COLOR_BAR_SIZE_2,
} from '../constants';

//https://reactjs.org/docs/conditional-rendering.html
//https://appendto.com/2017/01/react-events-101/

/**
* Renders a colorbar with the 8 different colors.
* When moused over one of the circles, it becomes bigger(COLOR_BAR_SIZE_2)
* when the mouse goes out it will go back to COLOR_BAR_SIZE_1
**/
class ColorBar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			red: COLOR_BAR_SIZE_1,
			orange: COLOR_BAR_SIZE_1,
			yellow: COLOR_BAR_SIZE_1,
			greenyellow: COLOR_BAR_SIZE_1,
			dodgerblue: COLOR_BAR_SIZE_1,
			fuchsia: COLOR_BAR_SIZE_1,
			darkviolet: COLOR_BAR_SIZE_1,
			white: COLOR_BAR_SIZE_1,
		};
	}

	mouseOver(e) {
		var change = e.target.attributes.fill.value;

		switch(change) {
			case "red":
        this.setState({red: COLOR_BAR_SIZE_2});
        break;
			case "orange":
				this.setState({orange: COLOR_BAR_SIZE_2});
				break;
			case "yellow":
        this.setState({yellow: COLOR_BAR_SIZE_2});
        break;
			case "greenyellow":
				this.setState({greenyellow: COLOR_BAR_SIZE_2});
				break;
			case "dodgerblue":
				this.setState({dodgerblue: COLOR_BAR_SIZE_2});
				break;
			case "fuchsia":
				this.setState({fuchsia: COLOR_BAR_SIZE_2});
				break;
			case "darkviolet":
				this.setState({darkviolet: COLOR_BAR_SIZE_2});
				break;
			case "white":
				this.setState({white: COLOR_BAR_SIZE_2})
				break;
			}
		}

	mouseOut(e) {
		var change = e.target.attributes.fill.value;

		switch(change) {
			case "red":
				this.setState({red: COLOR_BAR_SIZE_1});
				break;
			case "orange":
				this.setState({orange: COLOR_BAR_SIZE_1});
				break;
			case "yellow":
				this.setState({yellow: COLOR_BAR_SIZE_1});
				break;
			case "greenyellow":
				this.setState({greenyellow: COLOR_BAR_SIZE_1});
				break;
			case "dodgerblue":
				this.setState({dodgerblue: COLOR_BAR_SIZE_1});
				break;
			case "fuchsia":
				this.setState({fuchsia: COLOR_BAR_SIZE_1});
				break;
			case "darkviolet":
				this.setState({darkviolet: COLOR_BAR_SIZE_1});
				break;
			case "white":
				this.setState({white: COLOR_BAR_SIZE_1});
		}
	}

	setColour(e) {
		var newcolour = e.target.attributes.fill.value

		//Set colour to be readable by API
		var c;
		switch(newcolour) {
			case 'red':
				c = 'R';
				break;
			case 'orange':
				c = 'O';
				break;
			case 'yellow':
				c = 'Y';
				break;
			case 'greenyellow':
				c = 'G'
				break;
			case 'dodgerblue':
				c = 'B'
				break;
			case 'fuchsia':
				c = 'I'
				break;
			case 'darkviolet':
				c = 'V'
				break;
			default:
				c = null;
		}

		this.props.updateColour(c)
	}

	render() {
		return (
			<svg width="1.23cm" height="4.9cm" viewBox="0 0 350 1400">
				<rect x="1" y="1" height="1398" width="348" fill="grey" />
				<text x="40" y="70" fontFamily="Roboto" fontSize="75" fill="white"> Choose </text>
				<circle cx="175" cy="200" r={this.state.red} fill="red" onMouseOver={this.mouseOver.bind(this)} onMouseOut={this.mouseOut.bind(this)} onClick={this.setColour.bind(this)}/>
				<circle cx="175" cy="350" r={this.state.orange} fill="orange" onMouseOver={this.mouseOver.bind(this)} onMouseOut={this.mouseOut.bind(this)} onClick={this.setColour.bind(this)}/>
				<circle cx="175" cy="500" r={this.state.yellow} fill="yellow" onMouseOver={this.mouseOver.bind(this)} onMouseOut={this.mouseOut.bind(this)} onClick={this.setColour.bind(this)}/>
				<circle cx="175" cy="650" r={this.state.greenyellow} fill="greenyellow" onMouseOver={this.mouseOver.bind(this)} onMouseOut={this.mouseOut.bind(this)} onClick={this.setColour.bind(this)}/>
				<circle cx="175" cy="800" r={this.state.dodgerblue} fill="dodgerblue" onMouseOver={this.mouseOver.bind(this)} onMouseOut={this.mouseOut.bind(this)} onClick={this.setColour.bind(this)}/>
				<circle cx="175" cy="950" r={this.state.fuchsia} fill="fuchsia" onMouseOver={this.mouseOver.bind(this)} onMouseOut={this.mouseOut.bind(this)} onClick={this.setColour.bind(this)}/>
				<circle cx="175" cy="1100" r={this.state.darkviolet} fill="darkviolet" onMouseOver={this.mouseOver.bind(this)} onMouseOut={this.mouseOut.bind(this)} onClick={this.setColour.bind(this)}/>
				<circle cx="175" cy="1250" r={this.state.white} fill="white" onMouseOver={this.mouseOver.bind(this)} onMouseOut={this.mouseOut.bind(this)}/>
			</svg>
		);
	}
}

export default ColorBar
