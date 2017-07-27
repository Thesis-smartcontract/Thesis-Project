import React, { Component } from 'react';
import Graph from './Graph.jsx';
import Label from './Label.jsx';
import './stats.css';

const Stats = (props) => (
  <div className="stats">
    <div className="graph-labels">
      <div className="y-axis-col">
        <Label class="y-axis" title="ROI" detail="%, normalized"/>
        <Label class="invisible" title="Age" detail="years"/>
      </div>
      <div className="graph-col">
        <Graph/>
        <Label class="x-axis" title="Age" detail="years"/>
      </div>
    </div>
    <div className="graph-detail">
      <h1>How do we compare?</h1>
      <p>
        On the left are expected cumulative returns at different ages. As a pool ages,
        fewer participants are left to collect the dividend. This means participants
        would recieve twice the rate of natural returns over the full dividend period.
        It is useful to keep in mind that these are approximations based on 
        life-expectancies among U.S. residents as a whole. The percents are 
        approximations based on Social Security life-expectancy
        <a href="https://www.ssa.gov/oact/NOTES/as120/images/LD_fig5.html"
        > tables</a> for 2100, and are normalized such that
        these fail to account for any market changes or inflation.
      </p>
    </div>
  </div>
);

module.exports = Stats;