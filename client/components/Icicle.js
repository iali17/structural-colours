import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import * as d3 from 'd3';
import { connect } from 'react-redux';

import {
  fetchTax,
} from '../actions/taxonomyActions';

import {
  fetchDetail,
} from '../actions/detailActions';

import {
	fetchOnePicture,
} from '../actions/pictureActions';


@connect((store) => {
  return {
    taxonomy: store.icicleView.taxonomy,
    Tfetching: store.icicleView.Tfetching,
    Tfetched: store.icicleView.Tfetched,
  };
})

export default class Icicle extends Component {
	constructor(props) {
		super(props);
		this.createIcicle = this.createIcicle.bind(this)
		this.state = {phylum: false, family: false, order: false, species: false, building: true,
					 vertabrates: null, invertebrates: null, info: null, 
					 json: {
					 	Taxonomy:{
					 		Animals:{
					 			Vertabrates:{},
					 			Invertebrates:{}
					 		},
					 		Bacteria:{
					 			Eubacteria:{ FakeEuBacteria: 1},
					 			Archaebacteria:{FakeArBacteria: 1}
					 		},
					 		Fungi:{},
					 		Plants:{}
					 	}
					 }, windowWidth: window.innerWidth - 20
					}
	}

	componentDidMount() {
		window.addEventListener("resize", this.updateDimensions.bind(this));
		this.createIcicle()
	}

	getProfile(t) {
	    this.props.getProfile(t);
  	}
    
	componentWillMount() {
		this.props.dispatch(fetchTax());
	}

	componentDidUpdate() {
		this.createIcicle()
	}

	componentWillUnmount(){
		window.removeEventListener("resize", this.updateDimensions.bind(this));
	}

	updateDimensions() {
		this.setState({windowWidth: window.innerWidth - 20})
	}

	//https://www.sitepoint.com/javascript-generate-lighter-darker-color/
	colorLuminance(hex, lum) {
		// validate hex string
		hex = String(hex).replace(/[^0-9a-f]/gi, '');
		if (hex.length < 6) {
			hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];
		}
		lum = lum || 0;
		
		// convert to decimal and change luminosity
		var rgb = "#", c, i;
		for (i = 0; i < 3; i++) {
			c = parseInt(hex.substr(i*2,2), 16);
			c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
			rgb += ("00"+c).substr(c.length);
		}

		return rgb;

	}

	createIcicle() {
		var width = this.state.windowWidth;
		var height = 500;

		if (this.props.Tfetched) {
			this.state.info = this.props.taxonomy;
		}
		
		if (this.state.info != null && this.state.building) {
			console.log("info2", this.state.info)
			for (var i = this.state.info.length-1; i >= 0; i--) {
				var tempOrder = this.state.info[i].order;
				var tempClass = this.state.info[i].speciesClass;
				var tempPhylum = this.state.info[i].phylum;
				var tempFamily = this.state.info[i].family;
				var tempSpecies = this.state.info[i].species;
				var tempSpeciesId = this.state.info[i].speciesId;
				if(this.state.info[i].kingdom == "Ve"){
					if (!this.state.json.Taxonomy.Animals.Vertabrates[tempPhylum]){
						this.state.json.Taxonomy.Animals.Vertabrates[tempPhylum] = {};
					}
					if (!this.state.json.Taxonomy.Animals.Vertabrates[tempPhylum][tempClass]){
						this.state.json.Taxonomy.Animals.Vertabrates[tempPhylum][tempClass]= {} 
					}					
					if (!this.state.json.Taxonomy.Animals.Vertabrates[tempPhylum][tempClass][tempOrder]){
						this.state.json.Taxonomy.Animals.Vertabrates[tempPhylum][tempClass][tempOrder]= {} 
					}
					if (!this.state.json.Taxonomy.Animals.Vertabrates[tempPhylum][tempClass][tempOrder][tempFamily]){
						this.state.json.Taxonomy.Animals.Vertabrates[tempPhylum][tempClass][tempOrder][tempFamily]= {}
					}
					if (!this.state.json.Taxonomy.Animals.Vertabrates[tempPhylum][tempClass][tempOrder][tempFamily][tempSpecies]){
						this.state.json.Taxonomy.Animals.Vertabrates[tempPhylum][tempClass][tempOrder][tempFamily][tempSpecies] = tempSpeciesId;
					}
				} else if(this.state.info[i].kingdom == "In"){
					if (!this.state.json.Taxonomy.Animals.Invertebrates[tempPhylum]){
						this.state.json.Taxonomy.Animals.Invertebrates[tempPhylum] = {};
					}
					if (!this.state.json.Taxonomy.Animals.Invertebrates[tempPhylum][tempClass]){
						this.state.json.Taxonomy.Animals.Invertebrates[tempPhylum][tempClass]= {} 
					}					
					if (!this.state.json.Taxonomy.Animals.Invertebrates[tempPhylum][tempClass][tempOrder]){
						this.state.json.Taxonomy.Animals.Invertebrates[tempPhylum][tempClass][tempOrder]= {} 
					}
					if (!this.state.json.Taxonomy.Animals.Invertebrates[tempPhylum][tempClass][tempOrder][tempFamily]){
						this.state.json.Taxonomy.Animals.Invertebrates[tempPhylum][tempClass][tempOrder][tempFamily]= {}
					}
					if (!this.state.json.Taxonomy.Animals.Invertebrates[tempPhylum][tempClass][tempOrder][tempFamily][tempSpecies]){
						this.state.json.Taxonomy.Animals.Invertebrates[tempPhylum][tempClass][tempOrder][tempFamily][tempSpecies] = tempSpeciesId;
					}
				} else if (this.state.info[i].kingdom == "Eu"){
					if (!this.state.json.Taxonomy.Bacteria.Eubacteria[tempPhylum]){
						this.state.json.Taxonomy.Bacteria.Eubacteria[tempPhylum] = {};
					}
					if (!this.state.json.Taxonomy.Bacteria.Eubacteria[tempPhylum][tempClass]){
						this.state.json.Taxonomy.Bacteria.Eubacteria[tempPhylum][tempClass]= {} 
					}					
					if (!this.state.json.Taxonomy.Bacteria.Eubacteria[tempPhylum][tempClass][tempOrder]){
						this.state.json.Taxonomy.Bacteria.Eubacteria[tempPhylum][tempClass][tempOrder]= {} 
					}
					if (!this.state.json.Taxonomy.Bacteria.Eubacteria[tempPhylum][tempClass][tempOrder][tempFamily]){
						this.state.json.Taxonomy.Bacteria.Eubacteria[tempPhylum][tempClass][tempOrder][tempFamily]= {}
					}
					if (!this.state.json.Taxonomy.Bacteria.Eubacteria[tempPhylum][tempClass][tempOrder][tempFamily][tempSpecies]){
						this.state.json.Taxonomy.Bacteria.Eubacteria[tempPhylum][tempClass][tempOrder][tempFamily][tempSpecies] = tempSpeciesId;
					}
				} else if (this.state.info[i].kingdom == "Pl") {
					if (!this.state.json.Taxonomy.Plants[tempPhylum]){
						this.state.json.Taxonomy.Plants[tempPhylum] = {};
					}
					if (!this.state.json.Taxonomy.Plants[tempPhylum][tempClass]){
						this.state.json.Taxonomy.Plants[tempPhylum][tempClass]= {} 
					}					
					if (!this.state.json.Taxonomy.Plants[tempPhylum][tempClass][tempOrder]){
						this.state.json.Taxonomy.Plants[tempPhylum][tempClass][tempOrder]= {} 
					}
					if (!this.state.json.Taxonomy.Plants[tempPhylum][tempClass][tempOrder][tempFamily]){
						this.state.json.Taxonomy.Plants[tempPhylum][tempClass][tempOrder][tempFamily]= {}
					}
					if (!this.state.json.Taxonomy.Plants[tempPhylum][tempClass][tempOrder][tempFamily][tempSpecies]){
						this.state.json.Taxonomy.Plants[tempPhylum][tempClass][tempOrder][tempFamily][tempSpecies] = tempSpeciesId;
					}
				} else if (this.state.info[i].kingdom == "Fu") {
					if (!this.state.json.Taxonomy.Fungi[tempPhylum]){
						this.state.json.Taxonomy.Fungi[tempPhylum] = {};
					}
					if (!this.state.json.Taxonomy.Fungi[tempPhylum][tempClass]){
						this.state.json.Taxonomy.Fungi[tempPhylum][tempClass]= {} 
					}					
					if (!this.state.json.Taxonomy.Fungi[tempPhylum][tempClass][tempOrder]){
						this.state.json.Taxonomy.Fungi[tempPhylum][tempClass][tempOrder]= {} 
					}
					if (!this.state.json.Taxonomy.Fungi[tempPhylum][tempClass][tempOrder][tempFamily]){
						this.state.json.Taxonomy.Fungi[tempPhylum][tempClass][tempOrder][tempFamily]= {}
					}
					if (!this.state.json.Taxonomy.Fungi[tempPhylum][tempClass][tempOrder][tempFamily][tempSpecies]){
						this.state.json.Taxonomy.Fungi[tempPhylum][tempClass][tempOrder][tempFamily][tempSpecies] = tempSpeciesId;
					}
				}
			}
			this.state.building = false;
		}

		var colorLum = this.colorLuminance.bind(this);

		var x = d3.scaleLinear().range([0, this.state.windowWidth]);
		var y = d3.scaleLinear().range([0, height]);

		var color = d3.scaleOrdinal(d3.schemeCategory20c);
		var partition = d3.partition().size([this.state.windowWidth, height]).padding(0).round(true);

		var svg = d3.select(this.node);
		svg.selectAll("*").remove();

		var rect = svg.selectAll("rect")
		var fo  = svg.selectAll("foreignObject")

		var root = d3.hierarchy(d3.entries(this.state.json)[0], function(d) {
			return d3.entries(d.value)
		})
		.sum(function(d) {return d.value / d.value})
		//.sort(function(a,b) { return b.value - a.value; });

		partition(root);
		rect = rect
	   		.data(root.descendants())
	   		.enter().append("rect")
	   		.attr("x", function(d) { return d.x0; })
	   		.attr("y", function(d) { 
	   			if (d.depth == 0){
	   				return d.y0; 
	   			} else {
	   				return d.y0 - 45;
	   			}
	   		})
	   		.attr("width", function(d) { return d.x1 - d.x0; })
	   		.attr("height", function(d) {
	   			if (d.depth == 0) {
	   				return 20;
	   			} else {
	   				return d.y1 - d.y0;
	   			}
	   		})
	   		.attr("fill", function(d) { 
	   			if (d.depth ==0) {
	   				return "#E5E5E5"
	   			} else if (d.depth == 1 && d.data.key == "Animals") {
	   				return "#EAB536"
	   			} else if (d.depth == 1 && d.data.key == "Fungi"){
	   				return "#6B00F9";
	   			} else if (d.depth == 1 && d.data.key == "Plants") {
	   				return "#7DDD78";
	   			} else if (d.depth == 1 && d.data.key == "Bacteria") {
	   				return "#8EC0FC";
	   			} else if (d.depth == 2 && d.parent.data.key == "Animals") {
	   				return "#FAF0C9";
	   			} else if (d.depth == 2 && d.parent.data.key == "Fungi") {
	   				return "#AA88EF";
	   			} else if (d.depth == 2 && d.parent.data.key == "Plants") {
	   				return "#A7DDBF";
	   			} else if (d.depth == 2 && d.parent.data.key == "Bacteria") {
	   				return "#66CDE9";
	   			} else if (d.depth == 3) {
	   			 	return "#E5E5E5";
	   			}else {
	   				var newColor = colorLum("#E5E5E5", -0.15 * (d.depth - 3));
	   				return newColor;
	   			}
	   		})
	   		.on("click", clicked)
	   		.attr("stroke-width", 0.5)
	   		.attr("stroke", 'white');

	 	fo = fo
			.data(root.descendants())
			.enter().append("foreignObject")
	      	.attr("x", function(d) { return d.x0; })
	      	.attr("y", function(d) { 
	      		if (d.depth == 0){
	   				return d.y0; 
	   			} else {
	   				return d.y0 - 45;
	   			} 
	      	})
	      	.attr("width", function(d) { return d.x1 - d.x0; })
	      	.attr("height", function(d) { return d.y1 - d.y0; })
	     	.style("cursor", "pointer")
	     	.text(function(d) { 
	     		if((10 * d.data.key.length) >= (d.x1 - d.x0)){
	     			var upTo = ((10* d.data.key.length) - (d.x1 - d.x0)) / 10;
	     			upTo = d.data.key.length - upTo;
	     		 	return d.data.key.slice(0, upTo) + "...";
	     		}
	     		return d.data.key
	     	})
	     	.on("click", clicked);

	    var needProfile = this.getProfile.bind(this);
	    var dispatch = this.props.dispatch.bind(this);

	   	function clicked(d) {
			x.domain([d.x0, d.x1]);
			y.domain([d.y0, height]).range([d.depth ? 20 : 0, height]);

			var clickedDep = d.depth;
			var flag = false;
			var rectX;

			rect.transition()
			    .duration(750)
			    .attr("x", function(d) { return x(d.x0); })
			    .attr("y", function(d) {
			    	if (clickedDep == 0) {
			   			if(d.depth == 0){
			   				return y(d.y0); 
			   			}
			    		return y(d.y0) - 45
			    	}
			    	return y(d.y0); 
			 	})
			    .attr("width", function(d) {
			    	return x(d.x1) - x(d.x0); 
			    })
			    .attr("height", function(d) {
			    	if (clickedDep == 0 && !flag){
			    		flag = true;
	   					return 20;
		   			} else {
		   				return y(d.y1) - y(d.y0);
		   			} 
			    	return y(d.y1) - y(d.y0); 
			    });

   			fo.transition()
        		.duration(750)
      			.attr("x", function(d) { return x(d.x0); })
      			.attr("y", function(d) {
      				if (clickedDep == 0) {
      					if(d.depth == 0){
			   				return y(d.y0); 
			   			}
			    		return y(d.y0) - 45
			    	} 
      				return y(d.y0); 
      			})
      			.attr("width", function(d) { return x(d.x1) - x(d.x0); })
      			.attr("height", function(d) { return y(d.y1) - y(d.y0);})
      			.text(function(d) { 
		     		var dataX = Math.ceil(x(d.x1) - x(d.x0))
		     		if((10 * d.data.key.length) >= dataX){
		     			var upTo = Math.ceil(((10* d.data.key.length) - dataX) / 10);
		     			upTo = d.data.key.length - upTo;
		     		 	return d.data.key.slice(0, upTo) + "...";
		     		}
		     		return d.data.key
	     		});

      		if (d.data.value % 1 == 0){
      			needProfile(d.data.value);
      			dispatch(fetchDetail(d.data.value))
				dispatch(fetchOnePicture(d.data.value))
      		}

		}
	}

	render(){
		if (this.props.Tfetching) {
	      	return <h2>The icicle view is loading please wait.</h2>
	    } else if (this.props.Tfetched) {
	      	return( <svg ref={node => this.node = node}
	    			width={this.state.windowWidth} height={500}> </svg>)
	    }else {
	    	return <h2>Icicle fetching failed.</h2>
	    }
	}
}
