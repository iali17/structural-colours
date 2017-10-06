import React from 'react'
import ReactDOM from 'react-dom'

var DATA = {    
    name: 'Frog',
    imgURL: 'https://ichef-1.bbci.co.uk/news/624/cpsprodpb/AA04/production/_87842534_bbc_biswas_7.jpg'
}
var Profile = React.createClass({
	render: function(){
		return (
			<div>
				<h3>{this.props.name}</h3>
				<img src={this.props.imgURL}/>
			</div>
		);
	}
});
ReactDOM.render(<Profile />, document.getElementById('content'));

