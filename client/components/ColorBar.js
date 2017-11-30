import React, { Component } from 'react'
import ReactDOM from 'react-dom'

//https://reactjs.org/docs/conditional-rendering.html
//https://appendto.com/2017/01/react-events-101/
class ColorBar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			red: "20",
			orange: "20",
			yellow: "20",
			greenyellow: "20",
			dodgerblue: "20",
			fuchsia: "20",
			darkviolet: "20",
		};
	}

	mouseOver(e) {
		var change = e.target.attributes.fill.value;

		switch(change) {
			case "red":
        this.setState({red: "30"});
        break;
			case "orange":
				this.setState({orange: "30"});
				break;
			case "yellow":
        this.setState({yellow: "30"});
        break;
			case "greenyellow":
				this.setState({greenyellow: "30"});
				break;
			case "dodgerblue":
				this.setState({dodgerblue: "30"});
				break;
			case "fuchsia":
				this.setState({fuchsia: "30"});
				break;
			case "darkviolet":
				this.setState({darkviolet: "30"});
				break;
			}
		}

	mouseOut(e) {
		var change = e.target.attributes.fill.value;

		switch(change) {
			case "red":
				this.setState({red: "20"});
				break;
			case "orange":
				this.setState({orange: "20"});
				break;
			case "yellow":
				this.setState({yellow: "20"});
				break;
			case "greenyellow":
				this.setState({greenyellow: "20"});
				break;
			case "dodgerblue":
				this.setState({dodgerblue: "20"});
				break;
			case "fuchsia":
				this.setState({fuchsia: "20"});
				break;
			case "darkviolet":
				this.setState({darkviolet: "20"});
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
			<svg style={{position: 'fixed'}} width="1.5cm" height="5cm" viewBox="0 0 150 500">
				<rect x="1" y="1" height="498" width="148" fill="grey" />
				<text x="15" y="70" fontFamily="Verdana" fontSize="35" fill="white"> Choose </text>
				<circle cx = "75" cy= "100" r= {this.state.red} fill = "red" onMouseOver= {this.mouseOver.bind(this)} onMouseOut = {this.mouseOut.bind(this)} onClick = {this.setColour.bind(this)}/>
				<circle cx = "75" cy= "150" r= {this.state.orange} fill = "orange" onMouseOver= {this.mouseOver.bind(this)} onMouseOut = {this.mouseOut.bind(this)} onClick = {this.setColour.bind(this)}/>
				<circle cx = "75" cy= "200" r= {this.state.yellow} fill = "yellow" onMouseOver= {this.mouseOver.bind(this)} onMouseOut = {this.mouseOut.bind(this)} onClick = {this.setColour.bind(this)}/>
				<circle cx = "75" cy= "250" r= {this.state.greenyellow} fill = "greenyellow" onMouseOver= {this.mouseOver.bind(this)} onMouseOut = {this.mouseOut.bind(this)} onClick = {this.setColour.bind(this)}/>
				<circle cx = "75" cy= "300" r= {this.state.dodgerblue} fill = "dodgerblue" onMouseOver= {this.mouseOver.bind(this)} onMouseOut = {this.mouseOut.bind(this)} onClick = {this.setColour.bind(this)}/>
				<circle cx = "75" cy= "350" r= {this.state.fuchsia} fill = "fuchsia" onMouseOver= {this.mouseOver.bind(this)} onMouseOut = {this.mouseOut.bind(this)} onClick = {this.setColour.bind(this)}/>
				<circle cx = "75" cy= "400" r= {this.state.darkviolet} fill = "darkviolet" onMouseOver= {this.mouseOver.bind(this)} onMouseOut = {this.mouseOut.bind(this)} onClick = {this.setColour.bind(this)}/>
			</svg>
		);
	}
}

export default ColorBar
