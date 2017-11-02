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
		var fo  = svg.selectAll("foreignObject");

		// My problem is here daniel. I'll post a screenshot of what the error is,
		//var icicle = d3.json("no", function(root) {

			//console.log("root?", d3.entries(root))

		console.log("entries:", d3.entries(readme)[0])
		var root = d3.hierarchy(d3.entries(readme)[0], function(d) {
			console.log("d3entries", d3.entries(d.value))
			console.log("d3value", d.value)
			return d3.entries(d.value)
		}) 
		.sum(function(d) {return d.value})
		.sort(function(a,b) { return b.value - a.value; }); 

		partition(root);
		console.log("root", root);
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
      			.attr("width", function(d) { return x(d.x1-d.x0); })
      			.attr("height", function(d) { return y(d.y1-d.y0); });
		}	

		/* rect = rect.data(partition(d3.entries(readme)[0]))
			   .enter().append("rect")
			   .attr("x", function(d) { return x(d.x); })
			   .attr("y", function(d) { return y(d.y); })s
			   .attr("width", function(d) { return x(d.dx); })
			   .attr("height", function(d) { return y(d.dy); })
			   .attr("fill", function(d) { return color((d.children ? d : d.parent).key); }) */
		//});

		//console.log("icicle", {icicle})

		return(
			<p>Something</p>
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