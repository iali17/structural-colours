import React, { Component } from 'react'
import ReactDOM from 'react-dom'

//https://reactjs.org/docs/conditional-rendering.html
//https://appendto.com/2017/01/react-events-101/
//this.state = { big: null};
class ColorBar extends Component {
	constructor(props){
		super(props);
		this.state = {red: "20", orange: "20",  yellow: "20", greenyellow: "20", dodgerblue: "20", fuchsia: "20", darkviolet: "20" }
	}
	
	mouseOver(e) {
		var change = e.target.attributes.fill.value;

		if (change == "red"){
			this.setState({red: "30"});
		}else if (change == "orange"){
			this.setState({orange: "30"});
		}else if (change == "yellow"){
			this.setState({yellow: "30"});
		}else if (change == "greenyellow"){
			this.setState({greenyellow: "30"});
		}else if (change == "dodgerblue"){
			this.setState({dodgerblue: "30"});
		}else if (change == "fuchsia"){
			this.setState({fuchsia: "30"});
		}else if (change == "darkviolet"){
			this.setState({darkviolet: "30"});
		}
		
	}

	mouseOut(e) {
		var change = e.target.attributes.fill.value;
		
    
		if (change == "red"){
			this.setState({red: "20"});
		}else if (change == "orange"){
			this.setState({orange: "20"});
		}else if (change == "yellow"){
			this.setState({yellow: "20"});
		}else if (change == "greenyellow"){
			this.setState({greenyellow: "20"});
		}else if (change == "dodgerblue"){
			this.setState({dodgerblue: "20"});
		}else if (change == "fuchsia"){
			this.setState({fuchsia: "20"});
		}else if (change == "darkviolet"){
			this.setState({darkviolet: "20"});
		}
	}

	setColour(e){
		
		var newcolour = e.target.attributes.fill.value
		//Set colour to be readable by API
		var c;
		switch(newcolour){
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
			<svg width="1.5cm" height="5cm" viewBox="0 0 150 500">
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
