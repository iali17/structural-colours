import React, { Component } from 'react'
import ReactDOM from 'react-dom'

//https://reactjs.org/docs/conditional-rendering.html
//https://appendto.com/2017/01/react-events-101/
//this.state = { big: null};
const size1 = 60;
const size2 = 80;

class ColorBar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			red: size1,
			orange: size1,
			yellow: size1,
			greenyellow: size1,
			dodgerblue: size1,
			fuchsia: size1,
			darkviolet: size1,
		};
	}

	mouseOver(e) {
		var change = e.target.attributes.fill.value;

		switch(change) {
			case "red":
        this.setState({red: size2});
        break;
			case "orange":
				this.setState({orange: size2});
				break;
			case "yellow":
        this.setState({yellow: size2});
        break;
			case "greenyellow":
				this.setState({greenyellow: size2});
				break;
			case "dodgerblue":
				this.setState({dodgerblue: size2});
				break;
			case "fuchsia":
				this.setState({fuchsia: size2});
				break;
			case "darkviolet":
				this.setState({darkviolet: size2});
				break;
			}
		}

	mouseOut(e) {
		var change = e.target.attributes.fill.value;

		switch(change) {
			case "red":
				this.setState({red: size1});
				break;
			case "orange":
				this.setState({orange: size1});
				break;
			case "yellow":
				this.setState({yellow: size1});
				break;
			case "greenyellow":
				this.setState({greenyellow: size1});
				break;
			case "dodgerblue":
				this.setState({dodgerblue: size1});
				break;
			case "fuchsia":
				this.setState({fuchsia: size1});
				break;
			case "darkviolet":
				this.setState({darkviolet: size1});
				break;
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
			<svg /*style={{position: 'fixed'}}*/ width="1.5cm" height="5cm" viewBox="0 0 350 1200">
				<rect x="1" y="1" height="1198" width="348" fill="grey" />
				<text x="40" y="70" fontFamily="Verdana" fontSize="75" fill="white"> Choose </text>
				<circle cx = "175" cy= "200" r= {this.state.red} fill = "red" onMouseOver= {this.mouseOver.bind(this)} onMouseOut = {this.mouseOut.bind(this)} onClick = {this.setColour.bind(this)}/>
				<circle cx = "175" cy= "350" r= {this.state.orange} fill = "orange" onMouseOver= {this.mouseOver.bind(this)} onMouseOut = {this.mouseOut.bind(this)} onClick = {this.setColour.bind(this)}/>
				<circle cx = "175" cy= "500" r= {this.state.yellow} fill = "yellow" onMouseOver= {this.mouseOver.bind(this)} onMouseOut = {this.mouseOut.bind(this)} onClick = {this.setColour.bind(this)}/>
				<circle cx = "175" cy= "650" r= {this.state.greenyellow} fill = "greenyellow" onMouseOver= {this.mouseOver.bind(this)} onMouseOut = {this.mouseOut.bind(this)} onClick = {this.setColour.bind(this)}/>
				<circle cx = "175" cy= "800" r= {this.state.dodgerblue} fill = "dodgerblue" onMouseOver= {this.mouseOver.bind(this)} onMouseOut = {this.mouseOut.bind(this)} onClick = {this.setColour.bind(this)}/>
				<circle cx = "175" cy= "950" r= {this.state.fuchsia} fill = "fuchsia" onMouseOver= {this.mouseOver.bind(this)} onMouseOut = {this.mouseOut.bind(this)} onClick = {this.setColour.bind(this)}/>
				<circle cx = "175" cy= "1100" r= {this.state.darkviolet} fill = "darkviolet" onMouseOver= {this.mouseOver.bind(this)} onMouseOut = {this.mouseOut.bind(this)} onClick = {this.setColour.bind(this)}/>
			</svg>
		);
	}
}

export default ColorBar
