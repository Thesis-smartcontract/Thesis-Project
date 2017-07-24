import React, { Component } from 'react';
import {AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';
import roi from './roi.js';
import './graph.css';

const SimpleAreaChart = (props) => (
  <div id="graph">
    <AreaChart width={600} height={500} data={roi}
          margin={{top: 5, right: 30, left: 20, bottom: 5}}>
      <defs>
        <linearGradient id="colorROI" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#7fbb7f" stopOpacity={0.6}/>
          <stop offset="95%" stopColor="#7fbb7f" stopOpacity={.1}/>
        </linearGradient>
      </defs>
      <XAxis dataKey="age"/>
      <YAxis label="ROI (normalized)" padding={{ right: 100 }}/>
       <CartesianGrid stoke="whitesmoke" vertical={false}/> 
      <Tooltip/>
      {/* <Legend /> */}
      <Area 
        type="monotone"
        dataKey="ROI"
        fillOpacity={1}
        fill="url(#colorROI)"
        stroke="whitesmoke"
        activeDot={{r: 8}}
      />
    </AreaChart>
  </div>
);

export default SimpleAreaChart;

  {/* <ResponsiveContainer> */}
  {/* </ResponsiveContainer> */}