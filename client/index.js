import React from 'react'
import ReactDOM from 'react-dom'


var DATA = {    
    name: 'Frog',
    imgURL: 'https://ichef-1.bbci.co.uk/news/624/cpsprodpb/AA04/production/_87842534_bbc_biswas_7.jpg',
    datalist: ['Structure', 'wavelength', 'Factor', 'Location']
}

var App = React.createClass({
	render: function(){
		return (
			<div>
				<Profile
					name={this.props.profileData.name}
					imgURL={this.props.profileData.imgURL}/>
				<Data
					dataList={this,props.profileData.dataList} />
			</div>
		);
	}
});

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

var Data = React.createClass({
	render:function(){
		var data = this.props.dataList.map(function(data,index){
			return (<li key={index}>{data}</li>);
	});

	return (
		<div>
			<ul>
				{data}
			</ul>
		</div>
		);
	}
});


ReactDOM.render(<App profileData={DATA} />, document.getElementById('content'));

