import React, { Component } from 'react';
import './logo.scss';

const Headline = (props) => (
  <div className="headline">
    <div className="logo">
      <h1 className="title">Gennuity</h1>
      <div className="d-logo">
        <div className="side left"></div>
        <div className="side front"></div>
        <div className="side right"></div>
        <div className="side back"></div>

        <div className="side-bottom back-bottom"></div>
        <div className="side-bottom right-bottom"></div>
        <div className="side-bottom left-bottom"></div>
        <div className="side-bottom top-bottom"></div>
      </div>
    </div>
    <h1>Social Security <br/> for the 21st Century</h1>
  </div>
);

module.exports = Headline;