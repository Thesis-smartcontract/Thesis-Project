import React, { Component } from 'react';

const Icon = (props) => (
  <div className="icon footer-content">
    <a href={props.href} target="_blank" className="nav-link">
      <i className={props.icon} aria-hidden="true"></i>
    </a>
  </div>
);

module.exports = Icon;
