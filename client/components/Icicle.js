import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import * as d3 from 'd3';
import { connect } from 'react-redux';
import * as readme from './readme.json'

import {
  fetchTax,
  fetchPhylum,
  fetchOrder,
  fetchFamily,
  fetchSpecies,
} from '../actions/taxonomyActions';

@connect((store) => {
  return {
    taxonomy: store.icicleView.taxonomy,
    Tfetching: store.icicleView.Tfetching,
    Tfetched: store.icicleView.Tfetched,

    phylum: store.icicleView.phylum,
    Pfetching: store.icicleView.Pfetching,
    Pfetched: store.icicleView.Pfetched,

    order: store.icicleView.order,
    Ofetching: store.icicleView.Ofetching,
    Ofetched: store.icicleView.Ofetched,

    family: store.icicleView.family,
    Ffetching: store.icicleView.Ffetching,
    Ffetched: store.icicleView.Ffetched,

    species: store.icicleView.species,
    Sfetching: store.icicleView.Sfetching,
    Sfetched: store.icicleView.Sfetched
  };
})

export default class Icicle extends Component {
	constructor(props){
		super(props);
		this.createIcicle = this.createIcicle.bind(this)
		this.state = {phylum: false, family: false, order: false, species: false, building: true,
					 vertabrates: null, invertebrates: null, info: null, 
					 json: {
					 	Kingdom:{
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
					 }
					}
	}

	componentDidMount(){
		this.createIcicle()
	}

	getPhylum(kingdom){
		this.props.dispatch(fetchPhylum(kingdom))
		this.setState({phylum: true})
	}

	getOrder(phylum){
		this.props.dispatch(fetchOrder(phylum))
		this.setState({order: true})
	}

	getFamily(order){
		this.props.dispatch(fetchFamily(order))
		this.setState({family: true})
	}

	getSpecies(family){
		this.props.dispatch(fetchSpecies(family))
		this.setState({species: true})
	}

	componentWillMount(){
		this.props.dispatch(fetchTax());
	}

	componentDidUpdate(){
		this.createIcicle()
	}

	createIcicle() {
		var width = 960;
		var height = 500;

		var readme2 = {}

		//var vertabrates;
		//console.log("resets vertabrates for some reason", vertabrates);

		//console.log("vert len", vertabrates)

		// if (this.props.Pfetched && !this.props.Pfetching){
		// 	if(!vertabrates) {
		// 		vertabrates = this.props.phylum;
		// 	}
		// 	this.setState({phylum: false})
		// }

		// if (!this.state.phylum && this.state.vertabrates == null){
		// 	console.log("Tried to fetch Vertabrates", this.state.vertabrates);
		// 	this.getPhylum("Ve");
		// } else if (!this.state.phylum && this.state.invertebrates == null) {
		// 	console.log("Tried to fetch Vertabrates", this.state.invertebrates);
		// 	this.getPhylum("In");
		// }

		// if (!this.props.Pfetching && this.props.Pfetched && this.state.phylum) {
		// 	this.setState({phylum: false})
		// 	if (this.state.vertabrates == null) {
		// 		this.state.vertabrates = this.props.phylum
		// 		console.log("We do get here when its done fetching ve.")
		// 	} else if (this.state.invertebrates == null) {
		// 		this.state.invertebrates = this.props.phylum
		// 		console.log("We do get here when its done fetching in.")
		// 	}
		// }

		// if (this.state.vertabrates != null){
		// 	for (var i = this.state.vertabrates.length - 1; i >= 0; i--) {
		// 		console.log(this.state.vertabrates[i].phylum);
		// 	}
		// }

		if (this.props.Tfetched) {
			this.state.info = this.props.taxonomy;
		}
		
		if (this.state.info != null && this.state.building) {
			console.log("info2", this.state.info)
			for (var i = this.state.info.length-1; i >= 0; i--) {
				var tempOrder = this.state.info[i].order.order;
				var tempPhylum = this.state.info[i].order.phylum.phylum;
				var tempFamily = this.state.info[i].family;
				if(this.state.info[i].order.phylum.kingdom.kingdom == "Ve"){					
					this.state.json.Kingdom.Animals.Vertabrates[tempPhylum] = {};
					this.state.json.Kingdom.Animals.Vertabrates[tempPhylum][tempOrder]= {} 
					this.state.json.Kingdom.Animals.Vertabrates[tempPhylum][tempOrder][tempFamily]= {}
				} else if(this.state.info[i].order.phylum.kingdom.kingdom == "In"){
					//var tempSpecies;// = this.getSpecies(tempFamily)
					//if (Sfetched && ! Sfetching){
					this.state.json.Kingdom.Animals.Invertebrates[tempPhylum] = {};
					this.state.json.Kingdom.Animals.Invertebrates[tempPhylum][tempOrder]= {} 
					this.state.json.Kingdom.Animals.Invertebrates[tempPhylum][tempOrder][tempFamily]= {};					
					// console.log("state of species", this.state.species,  this.state.json.Kingdom.Animals.Invertebrates[tempPhylum][tempOrder][tempFamily]);
					// if (!this.state.json.Kingdom.Animals.Invertebrates[tempPhylum][tempOrder][tempFamily]){
					// 	console.log("sees that its false");
					// }
					// if (!this.state.species && this.state.json.Kingdom.Animals.Invertebrates[tempPhylum][tempOrder][tempFamily] == null){
					// 	console.log("Tried to fetch ", tempFamily);
					// 	this.getSpecies(tempFamily);
					// }

					// if (!this.props.Sfetching && this.props.Sfetched && this.state.species) {
					// 	this.setState({species: false})
					// 	console.log("sets species state to true")
					// 	if (this.state.json.Kingdom.Animals.Invertebrates[tempPhylum][tempOrder][tempFamily] == null){
					// 		tempSpecies = this.props.species
					// 		//this.state.json.Kingdom.Animals.Invertebrates[tempPhylum][tempOrder][tempFamily][tempSpecies.species] = tempSpecies.Id
					// 	}
					// }
					//this.state.json.Kingdom.Animals.Invertebrates[te mpPhylum][tempOrder][tempFamily][tempSpecies.species] = tempSpecies.speciesId
					//}
				} else if (this.state.info[i].order.phylum.kingdom.kingdom == "Eu"){
					this.state.json.Kingdom.Bacteria.Eubacteria[tempPhylum] = {};
					this.state.json.Kingdom.Bacteria.Eubacteria[tempPhylum][tempOrder]= {} 
					this.state.json.Kingdom.Bacteria.Eubacteria[tempPhylum][tempOrder][tempFamily]= {};	
				} else if (this.state.info[i].order.phylum.kingdom.kingdom == "Pl") {
					this.state.json.Kingdom.Plants[tempPhylum] = {};
					this.state.json.Kingdom.Plants[tempPhylum][tempOrder]= {} 
					this.state.json.Kingdom.Plants[tempPhylum][tempOrder][tempFamily]= {};	
				} else if (this.state.info[i].order.phylum.kingdom.kingdom == "Fu") {
					this.state.json.Kingdom.Fungi[tempPhylum] = {};
					this.state.json.Kingdom.Fungi[tempPhylum][tempOrder]= {} 
					this.state.json.Kingdom.Fungi[tempPhylum][tempOrder][tempFamily]= {};
				}
				//this.state.json.Kingdom.Animals.Vertabrates[this.state.info[i].family.order.phylum.phylum] = {}//this.state.info[i].order.phylum.phylum;
				//console.log(this.state.info[i].order.phylum.kingdom.kingdom)//.family.order.phylum.kingdom.kingdom)
			}
			this.state.building = false;
			console.log("Json object so far", this.state.json)
		}


		//vertabrates = this.props.phylum;
		// if ( (archaebacteria=="") && !this.props.Sfetching){
		// 	console.log("Tried to fetch archaebacteria");
		// 	this.getSpecies("Ar");
		// 	archaebacteria = "should fetch"
		// }

		//archaebacteria = {"ArPH": 3}; // this.props.species; Nothing here yet

		// if (!eubacteria && !this.props.Sfetching) {
		// 	console.log("Tried to fetch eubacteria");
		// 	this.getSpecies("Eu");
		// 	eubacteria = {"EuPH": 2}; // this.props.species; Nothing here yet
		// }

		
		//var invertebrates = this.props.phylum; // {"InvertPh": 4};

		// if (!invertebrates && !this.props.Pfetching && this.props.Pfetched){
		// 	console.log("Tried to fetch Invertabrates");
		// 	this.getPhylum("In");
		// 	//vertabrates = "should fetch"
		// }


		var x = d3.scaleLinear().range([0, width]);
		var y = d3.scaleLinear().range([0, height]);

		var color = d3.scaleOrdinal(d3.schemeCategory20c);
		var partition = d3.partition().size([width, height]).padding(0).round(true);

		var svg = d3.select(this.node);

		//console.log("svg", svg);

		var rect = svg.selectAll("rect");
		var fo  = svg.selectAll("foreignObject");


		var root = d3.hierarchy(d3.entries(readme)[0], function(d) {
			return d3.entries(d.value)
		}) 
		.sum(function(d) {return d.value / d.value})
		//.sort(function(a,b) { return b.value - a.value; }); 

		partition(root);

		rect = rect
	   		.data(root.descendants())
	   		.enter().append("rect")
	   		.attr("x", function(d) { return d.x0; })
	   		.attr("y", function(d) { return d.y0; })
	   		.attr("width", function(d) { return d.x1 - d.x0; })
	   		.attr("height", function(d) { return d.y1 - d.y0; })
	   		.attr("fill", function(d) { return color((d.children ? d : d.parent).data.key); })
	   		.on("click", clicked);

	 	fo = fo
			.data(root.descendants())
			.enter().append("foreignObject")
	      	.attr("x", function(d) { return d.x0; })
	      	.attr("y", function(d) { return d.y0; })
	      	.attr("width", function(d) { return d.x1 - d.x0; })
	      	.attr("height", function(d) { return d.y1 - d.y0; })
	     	.style("cursor", "pointer")	
	     	.text(function(d) { return d.data.key})
	     	.on("click", clicked);

	    var needProfile = this.props.getProfile.bind(this);

	   	function clicked(d) {
	   		console.log("because its in a function?", needProfile);
			x.domain([d.x0, d.x1]);
			y.domain([d.y0, height]).range([d.depth ? 20 : 0, height]);

			rect.transition()
			    .duration(750)
			    .attr("x", function(d) { return x(d.x0); })
			    .attr("y", function(d) { return y(d.y0); })
			    .attr("width", function(d) { return x(d.x1) - x(d.x0); })
			    .attr("height", function(d) { return y(d.y1) - y(d.y0); });

   			fo.transition()
        		.duration(750)
      			.attr("x", function(d) { return x(d.x0); })
      			.attr("y", function(d) { return y(d.y0); })
      			.attr("width", function(d) { 
      				if (x(d.x1 - d.x0) < 0) {
      					return 0
      				}
      				return x(d.x1-d.x0); 
      			})
      			.attr("height", function(d) { 
      				if (y(d.y1 - d.y0) < 0) {
      					return 0
      				}
      				return y(d.y1-d.y0); 
      			});

      		if (d.data.value % 1 == 0){
      			console.log("We want to go to a profile page ", d.data.value)
      			needProfile(d.data.value);
      		}

		}
	}

	render(){
		if (this.props.Tfetching) {
	      return <h2>The icicle view is loading please wait.</h2>
	    } else if (this.props.Tfetched) {
	      return(<svg ref={node => this.node = node}
				width={960} height={500}>
				</svg>)
	    }else {
	    	return <h2>Icicle fetching failed.</h2>
	    }
	}
}