import React, { Component } from 'react';

const Paragraph = (props) => (
  <div className="paragraph">
    <h1 className="title">{props.title}</h1>
    <p className="text">{props.text}</p>
  </div>
);

module.exports = Paragraph;
