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
    detail: store.detailView.detail,
    fetching: store.detailView.fetching,
    fetched: store.detailView.fetched
  };
})

export default class Icicle extends Component {

	constructor(props){
		super(props);
	}

	

	render(){
		//var jsonObj = this.props.detail;
		//https://bl.ocks.org/tophtucker/a35c0f4f32400755a6a9b976be834ab3

		console.log("here", readme);
		var width = 960;
		var height = 500;

		var x = d3.scaleLinear().range([0, width]);
		var y = d3.scaleLinear().range([0, height]);

		var color = d3.scaleOrdinal(d3.schemeCategory20c);

		var partition = d3.partition().size([width, height]).padding(0).round(true);

		var svg = d3.select("body").append("svg")
			.attr("width", width)
			.attr("height", height);

		var rect = svg.selectAll("rect");

		// My problem is here daniel. I'll post a screenshot of what the error is,
		//var icicle = d3.json("no", function(root) {

			//console.log("root?", d3.entries(root))

		console.log("entries:", d3.entries(readme)[0])
		var root = d3.hierarchy(d3.entries(readme)[0], function(d) {
			console.log("d3entries", d3.entries(d.value))
			return d3.entries(d.value)
		}) 
		.sum(function(d) {return d.value})
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

	   	function clicked(d) {
			x.domain([d.x, d.x + d.dx]);
			y.domain([d.y, 1]).range([d.y ? 20 : 0, height]);

			rect.transition()
			    .duration(750)
			    .attr("x", function(d) { return x(d.x); })
			    .attr("y", function(d) { return y(d.y); })
			    .attr("width", function(d) { return x(d.x + d.dx) - x(d.x); })
			    .attr("height", function(d) { return y(d.y + d.dy) - y(d.y); });
		}	

		console.log("rect", rect)

		/* rect = rect.data(partition(d3.entries(readme)[0]))
			   .enter().append("rect")
			   .attr("x", function(d) { return x(d.x); })
			   .attr("y", function(d) { return y(d.y); })s
			   .attr("width", function(d) { return x(d.dx); })
			   .attr("height", function(d) { return y(d.dy); })
			   .attr("fill", function(d) { return color((d.children ? d : d.parent).key); }) */
		//});

		console.log("rect",{rect})
		//console.log("icicle", {icicle})

		return(
			<p>p</p>
		)

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