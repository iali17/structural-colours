import React, { Component } from 'react'
import ReactDOM from 'react-dom'

class Hues extends Component {
	constructor(props){
		super(props);
	}
	
	render() {
		return (
			<svg width="1.5cm" height="5cm" viewBox="0 0 150 500">
				<rect x="1" y="1" height="498" width="148" fill="grey" />
				<text x="25" y="70" fontFamily="Verdana" fontSize="25" fill="white"> Choose </text>
				<circle cx = "75" cy= "100" r= "20" fill = "red" /> 
				<circle cx = "75" cy= "150" r= "20" fill = "orange" /> 
				<circle cx = "75" cy= "200" r= "20" fill = "yellow" /> 
				<circle cx = "75" cy= "250" r= "20" fill = "greenyellow" /> 
				<circle cx = "75" cy= "300" r= "20" fill = "dodgerblue" /> 
				<circle cx = "75" cy= "350" r= "20" fill = "fuchsia" />
				<circle cx = "75" cy= "400" r= "20" fill = "darkviolet" /> 
			</svg>
		)

	}
}

export default Hues
