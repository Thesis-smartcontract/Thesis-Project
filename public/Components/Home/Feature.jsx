import React, { Component } from 'react';

const Feature = (props) => (
  <div className="feature">
    <img src={props.url} className="feature-image"></img>
    <h1 className="feature-title">{props.title}</h1>
    <p className="feature-detail">{props.detail}</p>
  </div>
);

module.exports = Feature;
