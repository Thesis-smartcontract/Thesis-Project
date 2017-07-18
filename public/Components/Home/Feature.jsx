import React, { Component } from 'react';

const Feature = (props) => (
  <div className="feature">
    <i className={props.glyph} aria-hidden="true"></i>
    <h1 className="feature-title">{props.title}</h1>
    <hr className="fancy-line"/>
    <p className="feature-detail">{props.detail}</p>
  </div>
);

module.exports = Feature;
