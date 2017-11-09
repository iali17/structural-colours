import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import * as d3 from 'd3';
import { connect } from 'react-redux';
import * as readme from './readme.json'
import {
	BrowserRouter as Router,
	Route,
	Link,
	Redirect,
	withRouter} from 'react-router-dom'

import {
  fetchTax,
} from '../actions/detailActions';

@connect((store) => {
  return {
    detail: store.detailView.detail,
    fetching: store.detailView.fetching,
    fetched: store.detailView.fetched
  };
})

export default class Icicle extends Component {

	constructor(props){
		super(props);
		this.createIcicle = this.createIcicle.bind(this)
	}

	componentDidMount(){
		this.createIcicle()
	}

	componentDidUpdate(){
		this.createIcicle()
	}

	createIcicle() {
		var width = 960;
		var height = 500;

		var x = d3.scaleLinear().range([0, width]);
		var y = d3.scaleLinear().range([0, height]);

		var color = d3.scaleOrdinal(d3.schemeCategory20c);
		var partition = d3.partition().size([width, height]).padding(0).round(true);

		var svg = d3.select(this.node);

		console.log("svg", svg);

		var rect = svg.selectAll("rect");
		var fo  = svg.selectAll("foreignObject");


		var root = d3.hierarchy(d3.entries(readme)[0], function(d) {
			console.log(d3.entries(d.value))
			return d3.entries(d.value)
		}) 
		.sum(function(d) {return d.value / d.value})
		.sort(function(a,b) { return b.value - a.value; }); 

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
      		console.log(d.data.key, d.depth)
      		if (d.data.value % 1 == 0){
      			console.log("We want to go to a profile page ", d.data.value)
      			// this is the direct way to do it, we can use hash history or whatever we use here instead
      			window.location.href = "/api/species/" + d.data.value;

      		}
		}
	}

	render(){

		return(<svg ref={node => this.node = node}
				width={960} height={500}>
				</svg>)

		/*
		if (this.props.fetching) {
	      return <h1>IM FETCHING</h1>
	    } else if (this.props.fetched) {
	      return <p>{this.props.detail}</p>
	    }else {
	      return (
	      	<button onClick={() => this.props.dispatch(fetchTax())}> Json </button>
	      )
	    }
	    */
	}
}