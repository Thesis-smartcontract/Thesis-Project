import React, { Component } from 'react';
import LineChart from 'react-svg-line-chart';
import Tooltip from 'react-simple-tooltip';
import lifeExpectancyData from './lifeExpectancy.js';
import './graph.css';

export default class TooltipChart extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      activePoint: null,
      tooltipTrigger: null,
    };

    this.handlePointHover = this.handlePointHover.bind(this);
  }

  handlePointHover(point, trigger) {
    this.setState({
      activePoint: point,
      tooltipTrigger: trigger,
    });
  }

  render() {
    const data = []

    for (let x = 1; x <= 30; x++) {
      data.push({ x: x, y: Math.floor(Math.random() * (100)) })
    }

    return (
      <div id="graph">
        {/* { this.state.tooltipTrigger
          ? (
            <Tooltip placement="top" trigger={ this.state.tooltipTrigger }>
              <div>y : { this.state.activePoint.y }</div>
              <div>x : { this.state.activePoint.x }</div>
            </Tooltip>
          )
          : null
        } */}

        <LineChart
          activePoint={ this.state.activePoint }
          data={ data }
          onPointHover={ this.handlePointHover }
          nogrid
        />
      </div>
    )
  }
}