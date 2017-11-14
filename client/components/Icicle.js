import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import * as d3 from 'd3';
import { connect } from 'react-redux';
import * as readme from './readme.json'

import {
  fetchTax,
} from '../actions/detailActions';

@connect((store) => {
  return {
    taxonomy: store.icicleView.taxonomy,
    fetching: store.icicleView.fetching,
    fetched: store.icicleView.fetched
  };
})

export default class Icicle extends Component {
	constructor(props) {
		super(props);
		this.createIcicle = this.createIcicle.bind(this)
	}

	componentDidMount() {
		this.createIcicle()
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
		var info = this.props.taxonomy;

		//since there are no families or anything in these we just get the values where family = fungi or plant respectively.
		var fungi = {"FunPH": 1}
		var plants = {"PlaPH": 1}

		var eubacteria = {"EuPH": 3}
		var archaebacteria = {"ArPH": 2};
		var vertabrates = {"VertPH": 3};
		var invertebrates = {"InvertPh": 4};

		readme2.Kingdom = {};
		readme2.Kingdom.Bacteria = {};
		readme2.Kingdom.Bacteria.Eubacteria = eubacteria;
		readme2.Kingdom.Bacteria.Archaebacteria = archaebacteria;
		readme2.Kingdom.Fungi = fungi;
		readme2.Kingdom.Plants = plants;
		readme2.Kingdom.Animals = {};
		readme2.Kingdom.Animals.Vertabrates = vertabrates;
		readme2.Kingdom.Animals.Invertebrates = invertebrates;

		var x = d3.scaleLinear().range([0, width]);
		var y = d3.scaleLinear().range([0, height]);

		var color = d3.scaleOrdinal(d3.schemeCategory20c);
		var partition = d3.partition().size([width, height]).padding(0).round(true);

		var svg = d3.select(this.node);

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

      		if (d.data.value % 1 == 0) {
      			// this is the direct way to do it, we can use hash history or whatever we use here instead
      			//window.location.href = "/api/species/" + d.data.value;
      			//this.props.getProfile(1)
      		}
		}
	}

	render() {
		if (this.props.fetching) {
      return <h1>IM FETCHING</h1>
    }
    else if (this.props.fetched) {
      return (
        <svg ref={node => this.node = node}
          width={960} height={500}>
			  </svg>
      );
    }
    else {
    	return <h1> Imran failed to make this functional </h1>
    }
	}
}
