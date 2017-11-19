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
		this.state = {phylum: false, family: false, order: false, species: false}
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
		var info = this.props.taxonomy;

		//console.log("info", info)

		//since there are no families or anything in these we just get the values where family = fungi or plant respectively.
		var fungi = {"FunPH": 1}
		var plants = {"PlaPH": 1}

		var eubacteria = "";// = {"EuPH": 3}
		var archaebacteria = "";// = {"ArPH": 2};

		var vertabrates;

		//console.log("vert len", vertabrates)

		// if (this.props.Pfetched && !this.props.Pfetching){
		// 	if(!vertabrates) {
		// 		vertabrates = this.props.phylum;
		// 	}
		// 	this.setState({phylum: false})
		// }

		if (!this.state.phylum && !vertabrates){
			console.log("Tried to fetch Vertabrates", vertabrates);
			this.getPhylum("Ve");
			//vertabrates = "should fetch"
		}

		if (!this.props.Pfetching && this.props.Pfetched && this.state.phylum) {
			//this.setState({phylum: false})
			if (!vertabrates) {
				vertabrates = this.props.phylum
				console.log("We do get here when its done fetching.", vertabrates.length)
			}
		}

		//vertabrates = this.props.phylum



		//vertabrates = this.props.phylum;
		// if ( (archaebacteria=="") && !this.props.Sfetching){
		// 	console.log("Tried to fetch archaebacteria");
		// 	this.getSpecies("Ar");
		// 	archaebacteria = "should fetch"
		// }

		archaebacteria = {"ArPH": 3}; // this.props.species; Nothing here yet

		// if (!eubacteria && !this.props.Sfetching) {
		// 	console.log("Tried to fetch eubacteria");
		// 	this.getSpecies("Eu");
		// 	eubacteria = {"EuPH": 2}; // this.props.species; Nothing here yet
		// }

		
		var invertebrates = this.props.phylum; // {"InvertPh": 4};

		// if (!invertebrates && !this.props.Pfetching && this.props.Pfetched){
		// 	console.log("Tried to fetch Invertabrates");
		// 	this.getPhylum("In");
		// 	//vertabrates = "should fetch"
		// }

		console.log("info", info);
		console.log("Invertabrates", invertebrates);

		// need to get order, family and species

		readme2.Kingdom = {};
		readme2.Kingdom.Bacteria = {};
		readme2.Kingdom.Bacteria.Eubacteria = eubacteria;
		readme2.Kingdom.Bacteria.Archaebacteria = archaebacteria;
		readme2.Kingdom.Fungi = fungi;
		readme2.Kingdom.Plants = plants;
		readme2.Kingdom.Animals = {};
		readme2.Kingdom.Animals.Vertabrates ={};
		readme2.Kingdom.Animals.Vertabrates.Mammals = {};
		readme2.Kingdom.Animals.Vertabrates.Avian = {};
		readme2.Kingdom.Animals.Vertabrates.Reptiles = {};
		readme2.Kingdom.Animals.Vertabrates.Amphibians = {};
		readme2.Kingdom.Animals.Vertabrates.Fish = {};
		readme2.Kingdom.Animals.Invertebrates = {};
		readme2.Kingdom.Animals.Invertebrates.Arthropods = {};
		readme2.Kingdom.Animals.Invertebrates.Molluscs = {};
		readme2.Kingdom.Animals.Invertebrates.Other = {};

		console.log("readme", readme);
		console.log("readme2", readme2);

		var x = d3.scaleLinear().range([0, width]);
		var y = d3.scaleLinear().range([0, height]);

		var color = d3.scaleOrdinal(d3.schemeCategory20c);
		var partition = d3.partition().size([width, height]).padding(0).round(true);

		var svg = d3.select(this.node);

		console.log("svg", svg);

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

	   	function clicked(d) {
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
      			// this is the direct way to do it, we can use hash history or whatever we use here instead
      			window.location.href = "/api/species/" + d.data.value;

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