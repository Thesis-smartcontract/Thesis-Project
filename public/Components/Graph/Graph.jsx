import React, { Component } from 'react';
import * as d3 from 'd3';
import './graph.css';
import lifeExpectancy from './lifeExpectancy.js';

export default class Graph extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: lifeExpectancy
    };
  }

  componentDidMount() {
    const width = 700,
          height = 500;
    
    const drawLine = d3.line()
      .x(d => x(d.age))
      .y(d => y(d.survival));

    const x = d3.scaleLinear()
      .domain([70, 90])
      .range([height, 0]);

    const y = d3.scaleLinear()
      .domain([70, 90])
      .range([0, width]);

    const chart = d3.select('line-chart')
      .attr('width', width)
      .attr('height', height)
      .append('g')
        .attr('transform', 'translate(100, 0)');

    chart.append('path')
      .style('stroke', 'whitesmoke')
      .attr('d', drawLine(this.state.data));
    debugger;
  }

  render() {
    return (
      <svg width={700} height={500}>
        <g transform='translate(100, 0)'>
          <path/>
        </g>
      </svg>
    );
  };
};
