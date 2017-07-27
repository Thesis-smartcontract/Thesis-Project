import React, { Component } from 'react';
import {ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';
import roi from './data/roi.js';
import './tooltip.css';

roi.forEach(obj => obj.ROI = Math.round(obj.ROI * 100) / 100);
let ToolTipContent = (props) => {
  const { active } = props;
  if (active) {
    const { payload, label } = props;
    return (
      <div className="custom-tooltip">
        <p className="age">{`Age = ${label}`}</p>
        <p className="return">{`Return = ${payload[0].value}%`}</p>
      </div>
    );
  }

  return null;
}

const SimpleAreaChart = (props) => (
  <div id="graph">
    <ResponsiveContainer width="100%" minWidth={50} minHeight={50} aspect={1.3}>
      <AreaChart width={200} height={150} data={roi}
            margin={{top: 5, right: 30, left: 20, bottom: 5}}>
        <defs>
          <linearGradient id="colorROI" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#7fbb7f" stopOpacity={0.7}/>
            <stop offset="95%" stopColor="#7fbb7f" stopOpacity={.12}/>
          </linearGradient>
        </defs>
        <XAxis dataKey="age"/>
        <YAxis/>
        <CartesianGrid stoke="whitesmoke" vertical={false}/> 
        <Tooltip 
          content={<ToolTipContent/>}
          offset={15}
        />
        <Area 
          type="monotone"
          dataKey="ROI"
          fillOpacity={1}
          fill="url(#colorROI)"
          stroke="whitesmoke"
          activeDot={{r: 8}}
        />
      </AreaChart>
    </ResponsiveContainer>
  </div>
);

export default SimpleAreaChart;

  {/* <ResponsiveContainer> */}
  {/* </ResponsiveContainer> */}