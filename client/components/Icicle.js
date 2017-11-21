import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import * as d3 from 'd3';
import { connect } from 'react-redux';
//import * as readme from './readme.json'

import {
  fetchTax,
  fetchPhylum,
  fetchOrder,
  fetchFamily,
  fetchSpecies,
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
	constructor(props) {
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
					 			Eubacteria:{ FakeEuBacteria: 1},
					 			Archaebacteria:{FakeArBacteria: 1}
					 		},
					 		Fungi:{FakeFungi: 1},
					 		Plants:{FakePlant: 1}
					 	}
					 }
					}
	}

	componentDidMount() {
		this.createIcicle()
	}

	getProfile(t) {
	  	console.log("icicle getProfile");
	    //var id2 = t
	    this.props.getProfile(t);
  	}
    
	componentWillMount() {
		this.props.dispatch(fetchTax());
	}

	componentDidUpdate() {
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
				var tempOrder = this.state.info[i].order;
				var tempClass = this.state.info[i].speciesClass;
				var tempPhylum = this.state.info[i].phylum;
				var tempFamily = this.state.info[i].family;
				var tempSpecies = this.state.info[i].species;
				var tempSpeciesId = this.state.info[i].speciesId;
				if(this.state.info[i].kingdom == "Ve"){
					if (!this.state.json.Kingdom.Animals.Vertabrates[tempPhylum]){
						this.state.json.Kingdom.Animals.Vertabrates[tempPhylum] = {};
					}
					if (!this.state.json.Kingdom.Animals.Vertabrates[tempPhylum][tempClass]){
						this.state.json.Kingdom.Animals.Vertabrates[tempPhylum][tempClass]= {} 
					}					
					if (!this.state.json.Kingdom.Animals.Vertabrates[tempPhylum][tempClass][tempOrder]){
						this.state.json.Kingdom.Animals.Vertabrates[tempPhylum][tempClass][tempOrder]= {} 
					}
					if (!this.state.json.Kingdom.Animals.Vertabrates[tempPhylum][tempClass][tempOrder][tempFamily]){
						this.state.json.Kingdom.Animals.Vertabrates[tempPhylum][tempClass][tempOrder][tempFamily]= {}
					}
					if (!this.state.json.Kingdom.Animals.Vertabrates[tempPhylum][tempClass][tempOrder][tempFamily][tempSpecies]){
						this.state.json.Kingdom.Animals.Vertabrates[tempPhylum][tempClass][tempOrder][tempFamily][tempSpecies] = tempSpeciesId;
					}
				} else if(this.state.info[i].kingdom == "In"){
					//var tempSpecies;// = this.getSpecies(tempFamily)
					//if (Sfetched && ! Sfetching){
					if (!this.state.json.Kingdom.Animals.Invertebrates[tempPhylum]){
						this.state.json.Kingdom.Animals.Invertebrates[tempPhylum] = {};
					}
					if (!this.state.json.Kingdom.Animals.Invertebrates[tempPhylum][tempClass]){
						this.state.json.Kingdom.Animals.Invertebrates[tempPhylum][tempClass]= {} 
					}					
					if (!this.state.json.Kingdom.Animals.Invertebrates[tempPhylum][tempClass][tempOrder]){
						this.state.json.Kingdom.Animals.Invertebrates[tempPhylum][tempClass][tempOrder]= {} 
					}
					if (!this.state.json.Kingdom.Animals.Invertebrates[tempPhylum][tempClass][tempOrder][tempFamily]){
						this.state.json.Kingdom.Animals.Invertebrates[tempPhylum][tempClass][tempOrder][tempFamily]= {}
					}
					if (!this.state.json.Kingdom.Animals.Invertebrates[tempPhylum][tempClass][tempOrder][tempFamily][tempSpecies]){
						this.state.json.Kingdom.Animals.Invertebrates[tempPhylum][tempClass][tempOrder][tempFamily][tempSpecies] = tempSpeciesId;
					}
					// this.state.json.Kingdom.Animals.Invertebrates[tempPhylum] = {};
					// this.state.json.Kingdom.Animals.Invertebrates[tempPhylum][tempOrder]= {} 
					// this.state.json.Kingdom.Animals.Invertebrates[tempPhylum][tempOrder][tempFamily]= {};
					// this.state.json.Kingdom.Animals.Invertebrates[tempPhylum][tempOrder][tempFamily][tempSpecies] = tempSpeciesId;			
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
				} else if (this.state.info[i].kingdom == "Eu"){
					if (!this.state.json.Kingdom.Bacteria.Eubacteria[tempPhylum]){
						this.state.json.Kingdom.Bacteria.Eubacteria[tempPhylum] = {};
					}
					if (!this.state.json.Kingdom.Bacteria.Eubacteria[tempPhylum][tempClass]){
						this.state.json.Kingdom.Bacteria.Eubacteria[tempPhylum][tempClass]= {} 
					}					
					if (!this.state.json.Kingdom.Bacteria.Eubacteria[tempPhylum][tempClass][tempOrder]){
						this.state.json.Kingdom.Bacteria.Eubacteria[tempPhylum][tempClass][tempOrder]= {} 
					}
					if (!this.state.json.Kingdom.Bacteria.Eubacteria[tempPhylum][tempClass][tempOrder][tempFamily]){
						this.state.json.Kingdom.Bacteria.Eubacteria[tempPhylum][tempClass][tempOrder][tempFamily]= {}
					}
					if (!this.state.json.Kingdom.Bacteria.Eubacteria[tempPhylum][tempClass][tempOrder][tempFamily][tempSpecies]){
						this.state.json.Kingdom.Bacteria.Eubacteria[tempPhylum][tempClass][tempOrder][tempFamily][tempSpecies] = tempSpeciesId;
					}
				} else if (this.state.info[i].kingdom == "Pl") {
					if (!this.state.json.Kingdom.Plants[tempPhylum]){
						this.state.json.Kingdom.Plants[tempPhylum] = {};
					}
					if (!this.state.json.Kingdom.Plants[tempPhylum][tempClass]){
						this.state.json.Kingdom.Plants[tempPhylum][tempClass]= {} 
					}					
					if (!this.state.json.Kingdom.Plants[tempPhylum][tempClass][tempOrder]){
						this.state.json.Kingdom.Plants[tempPhylum][tempClass][tempOrder]= {} 
					}
					if (!this.state.json.Kingdom.Plants[tempPhylum][tempClass][tempOrder][tempFamily]){
						this.state.json.Kingdom.Plants[tempPhylum][tempClass][tempOrder][tempFamily]= {}
					}
					if (!this.state.json.Kingdom.Plants[tempPhylum][tempClass][tempOrder][tempFamily][tempSpecies]){
						this.state.json.Kingdom.Plants[tempPhylum][tempClass][tempOrder][tempFamily][tempSpecies] = tempSpeciesId;
					}
				} else if (this.state.info[i].kingdom == "Fu") {
					if (!this.state.json.Kingdom.Fungi[tempPhylum]){
						this.state.json.Kingdom.Fungi[tempPhylum] = {};
					}
					if (!this.state.json.Kingdom.Fungi[tempPhylum][tempClass]){
						this.state.json.Kingdom.Fungi[tempPhylum][tempClass]= {} 
					}					
					if (!this.state.json.Kingdom.Fungi[tempPhylum][tempClass][tempOrder]){
						this.state.json.Kingdom.Fungi[tempPhylum][tempClass][tempOrder]= {} 
					}
					if (!this.state.json.Kingdom.Fungi[tempPhylum][tempClass][tempOrder][tempFamily]){
						this.state.json.Kingdom.Fungi[tempPhylum][tempClass][tempOrder][tempFamily]= {}
					}
					if (!this.state.json.Kingdom.Fungi[tempPhylum][tempClass][tempOrder][tempFamily][tempSpecies]){
						this.state.json.Kingdom.Fungi[tempPhylum][tempClass][tempOrder][tempFamily][tempSpecies] = tempSpeciesId;
					}
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

		var rect = svg.selectAll("rect");
		var fo  = svg.selectAll("foreignObject");

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
	     	.text(function(d) { 
	     		// console.log(d.data.key, (8* d.data.key.length), (d.x1-d.x0))
	     		// if((8 * d.data.key.length) > (d.x1 - d.x0)){
	     		// 	return ""
	     		// }else {
	     		// 	return d.data.key
	     		// }
	     		return d.data.key
	     	})
	     	.on("click", clicked);

	    var needProfile = this.getProfile.bind(this);
	    var dispatch = this.props.dispatch.bind(this);

	   	function clicked(d) {
	   		//console.log("because its in a function?", needProfile);
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
      			});//.text(function(d) { 
		     		// console.log(d.data.key, (8* d.data.key.length), x(d.x1-d.x0))
		     		// if((8 * d.data.key.length) > x(d.x1 - d.x0)){
		     		// 	return ""
		     		// }else {
		     		// 	return d.data.key
		     		// }
	     		//});

      		if (d.data.value % 1 == 0){
      			console.log("We want to go to a profile page ", d.data.value)
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
	      return(<svg ref={node => this.node = node}
				width={960} height={500}>
				</svg>)
	    }else {
	    	return <h2>Icicle fetching failed.</h2>
	    }
	}
}
