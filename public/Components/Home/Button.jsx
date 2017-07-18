import { Link } from 'react-router-dom';
import React, { Component } from 'react';

const Button = (props) => (
  <Link 
    className="home-button"
    role="button"
    value={props.title}
    name={props.title}
    to={props.to}>
  </Link>
);

module.exports = Button;