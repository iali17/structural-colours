import React from 'react'
import ReactDOM from 'react-dom'

var TitlePage = React.createClass({
	render: function(){
		return (
			//taken from https://bl.ocks.org/mbostock/45943c4af772e38b4f4e
			<!DOCTYPE html>
			<meta charset="utf-8">
			<svg width="960" height="960"></svg>
			<script src="//d3js.org/d3.v3.min.js"></script>
			<script>

			var π = Math.PI,
			    τ = 2 * π,
			    n = 500;

			var width = 300,
			    height = 300,
			    outerRadius = width / 2 - 20,
			    innerRadius = outerRadius - 80;

			d3.select("svg").append("g")
			    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")")
			  .selectAll("path")
			    .data(d3.range(0, τ, τ / n))
			  .enter().append("path")
			    .attr("d", d3.svg.arc()
			        .outerRadius(outerRadius)
			        .innerRadius(innerRadius)
			        .startAngle(function(d) { return d; })
			        .endAngle(function(d) { return d + τ / n * 1.1; }))
			    .style("fill", function(d) { return d3.hsl(d * 360 / τ, 1, .5); });

			d3.select(self.frameElement).style("height", height + "px");

			</script>
		);
	}
});

ReactDOM.render(<TitlePage />, document.getElementById('content'));
