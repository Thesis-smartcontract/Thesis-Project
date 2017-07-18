import React, { Component } from 'react';
import './logo.scss';

const Headline = (props) => (
  <div className="headline">
    <div className="logo">
      <div className="active-logo">
        <div className="side left"></div>
        <div className="side front"></div>
        <div className="side right"></div>
        <div className="side back"></div>
        <div className="shadow"></div>
      </div>
      <h1 className="title">Gennuity</h1>
    </div>
    <h1>Social Security for the 21st Century</h1>
    <div className="eth-icon">
      <img src='Components/Home/eth_icon.png'></img>
    </div>
    <h2>Use Ethereum Smart Contracts to secure your future.</h2>
  </div>
);

module.exports = Headline;