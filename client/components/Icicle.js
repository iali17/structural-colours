import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import * as d3 from 'd3';
import { connect } from 'react-redux';
import { LinearProgress } from 'material-ui/Progress';

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


/**
* The icicle component is a taxonomy of all the species that are
* currently in the database. It provies a clickable interface for you to be
* able to scroll through the taxonomy.
*
* The highest levels of the taxonomy the kingdom and it becomes more specific
* as you delve deeper into the taxonomy. To go back up in the taxa, please click the
* top bar above the thing you are currently viewing and it will push it up.
**/
export default class Icicle extends Component {
	// The constructor class initializes all the props and all the states we will need.
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
					 			Eubacteria:{},
					 			Archaebacteria:{}
					 		},
					 		Fungi:{},
					 		Plants:{}
					 	}
					 }, windowWidth: window.innerWidth
					}
	}

	// This function is automatically called by react when after the component has mounted.
	// It also creates an event listener if, so if the browser is resized the updateDimensions
	// function will be called.
	componentDidMount() {
		window.addEventListener("resize", this.updateDimensions.bind(this));
		this.createIcicle()
	}


	// This function is used to load the profile page.
	// Please see profile page to see the implimentation
	getProfile(t) {
	    this.props.getProfile(t);
  	}
    
    // this function is automatically called by react before the component has mounted
    // but this component has been called.
    // It dispatches a call to get the taxonomy so we can use it within the component.
    // This is a good place to call it because this will only happen once.
	componentWillMount() {
		this.props.dispatch(fetchTax());
	}

	// this function is automatically called by react as soon as something in the component
	// would cause it to change.
	componentDidUpdate() {
		this.createIcicle()
	}

	// this function is automatically called by react when the component is no longer in use.
	// It also removes the event listener that was added when the component mounted.
	componentWillUnmount(){
		window.removeEventListener("resize", this.updateDimensions.bind(this));
	}

	updateDimensions() {
		this.setState({windowWidth: window.innerWidth })
	}

	// https://www.sitepoint.com/javascript-generate-lighter-darker-color/
	// Taken off the website above, this function takes in a hex value and will
	// return it "lum" amounts darker.
	// Ex: If you give if "#ffffffff", 0.l0 it will return the hec value
	// of the color but 10 percent lighter.
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

	/**
	* This is where the icicle is created. This function will take the taxonomy
	* returned from the dispatch and convert that value into a json friendly 
	* variable we can use. After it is done creating this variable, it will
	* take it and create rect's and foriegnObjects(the object that holds the text)
	* and display them on the screen. There is an implict function that handles the 
	* click events.
	*
	* References:
	* https://bl.ocks.org/tophtucker/a35c0f4f32400755a6a9b976be834ab3
	* http://blockbuilder.org/lorenzopub/4a0c57efdc65cfd532e88d83c10b1737
	**/
	createIcicle() {
		var width = this.state.windowWidth;
		var height = 250;

		if (this.props.Tfetched) {
			this.state.info = this.props.taxonomy;
		}

		if (this.state.info != null && this.state.building) {
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
				} else if (this.state.info[i].kingdom == "Ar"){
					if (!this.state.json.Taxonomy.Bacteria.Archaebacteria[tempPhylum]){
						this.state.json.Taxonomy.Bacteria.Archaebacteria[tempPhylum] = {};
					}
					if (!this.state.json.Taxonomy.Bacteria.Archaebacteria[tempPhylum][tempClass]){
						this.state.json.Taxonomy.Bacteria.Archaebacteria[tempPhylum][tempClass]= {}
					}
					if (!this.state.json.Taxonomy.Bacteria.Archaebacteria[tempPhylum][tempClass][tempOrder]){
						this.state.json.Taxonomy.Bacteria.Archaebacteria[tempPhylum][tempClass][tempOrder]= {}
					}
					if (!this.state.json.Taxonomy.Bacteria.Archaebacteria[tempPhylum][tempClass][tempOrder][tempFamily]){
						this.state.json.Taxonomy.Bacteria.Archaebacteria[tempPhylum][tempClass][tempOrder][tempFamily]= {}
					}
					if (!this.state.json.Taxonomy.Bacteria.Archaebacteria[tempPhylum][tempClass][tempOrder][tempFamily][tempSpecies]){
						this.state.json.Taxonomy.Bacteria.Archaebacteria[tempPhylum][tempClass][tempOrder][tempFamily][tempSpecies] = tempSpeciesId;
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

		var toolDiv = d3.select("body").append("div")
					.style("position", "absolute")
					.style("text-align", "center")
					.style("padding", "2px")
					.style("font", "12px sans-serif")
					.style("background", "lightsteelblue")
					.style("border", "0px")
					.style("border-radius", "8px")
					.style("pointer-events", "none")
					.style("opacity", 0);

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
	   				return d.y0 - 15;
	   			} 
	   		})
	   		.attr("width", function(d) { return d.x1 - d.x0; })
	   		.attr("height", function(d) {
	   			if (d.depth == 0) {
	   				return 20;
	   			} else {
	   				return 35;
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
	   				var newColor = colorLum("#E5E5E5", -0.10 * (d.depth - 3));
	   				return newColor;
	   			}
	   		})
	   		.on("click", clicked)
	   		.attr("stroke-width", 0.5)
	   		.attr("stroke", 'white')
	   		.on("mouseover", function(d) {
	   			var data = d.data.key;
	   			toolDiv.transition()
	   				   .duration(200)
	   				   .style("opacity", .9)
	   				   .attr("x", d.x0)
	   				   .attr("y", d.y0);
	   			toolDiv.html(function(d){
	   				return "<span>" + data + "</span>"
	   			}).style("left", (d3.event.pageX) + "px")
                .style("top", (d3.event.pageY - 28) + "px");
	   		})
	   		.on("mouseout", function(d){
	   			toolDiv.transition()
	   				   .duration(500)
	   				   .style("opacity", 0);
	   		});

	 	fo = fo
			.data(root.descendants())
			.enter().append("foreignObject")
	      	.attr("x", function(d) { return d.x0; })
	      	.attr("y", function(d) {
	      		if (d.depth == 0){
	   				return d.y0;
	   			} else {
	   				return d.y0 - 15;
	   			}
	      	})
	      	.attr("width", function(d) { return d.x1 - d.x0; })
	      	.attr("height", function(d) { return d.y1 - d.y0; })
	     	.style("cursor", "pointer")
	     	.text(function(d) { 

	     		if (d.depth > 3) {
	     			return ""
	     		}

	     		if((11 * d.data.key.length) >= (d.x1 - d.x0)) {

	     			var upTo = Math.ceil(((11* d.data.key.length) - (d.x1 - d.x0)) / 11);
	     			upTo = d.data.key.length - upTo;
	     		 	return d.data.key.slice(0, upTo) + "...";
	     		}
	     		return d.data.key
	     	})
	     	.on("click", clicked)
	     	.style("font", "15px 'Helvetica Neue'")
	     	.style("color", function(d){
	     		if (d.data.key == "Fungi"){
	     			return "#ffffff"
	     		} //else if (d.depth == 2 && d.parent.data.key == "Fungi"){
	     		//	return "#ffffff"
	     		//}
	     		return "#302f2f"
	     		//return "#0000d8"
	     		//return "#000000"
	     	})
	     	.on("mouseover", function(d) {
	   			var data = d.data.key;
	   			toolDiv.transition()
	   				   .duration(200)
	   				   .style("opacity", .9)
	   				   .attr("x", d.x0)
	   				   .attr("y", d.y0);
	   			toolDiv.html(function(d){
	   				return "<span>" + data + "</span>"
	   			}).style("left", (d3.event.pageX) + "px")		
                .style("top", (d3.event.pageY - 28) + "px");
	   		})
	   		.on("mouseout", function(d){
	   			toolDiv.transition()
	   				   .duration(500)
	   				   .style("opacity", 0);
	   		});

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
			    		return y(d.y0) - 15
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
			    		return y(d.y0) - 15
			    	} 
      				return y(d.y0); 
      			})
      			.attr("width", function(d) { return x(d.x1) - x(d.x0); })
      			.attr("height", function(d) { return y(d.y1) - y(d.y0);})
      			.text(function(d) { 
          
      				if (clickedDep > d.depth ) {
      					return ""
      				}
      				if (d.depth > 3 && clickedDep < 2) {
	     				return ""
	     			}

		     		var dataX = Math.ceil(x(d.x1) - x(d.x0))
		     		if((11 * d.data.key.length) >= dataX){
		     			var upTo = Math.ceil(((11* d.data.key.length) - dataX) / 11);
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
	      	return <LinearProgress color="primary" />
	    } else if (this.props.Tfetched) {
	      	return( <svg ref={node => this.node = node}
	    			width={this.state.windowWidth} height={250}> </svg>)
	    }else {
	    	return <h2>Icicle fetching failed.</h2>
	    }
	}
}
