import React, { Component } from 'react';

const Label = (props) => (
  <div className="label">
    <div className={props.class}>
      <p className="title">{props.title}</p>
      <p className="detail">{props.detail}</p>
    </div>
  </div>
);

module.exports = Label;