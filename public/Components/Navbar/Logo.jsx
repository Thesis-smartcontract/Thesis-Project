import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

const Logo = (props) => (
  <div className="logo">
    <NavLink to='/'>
      <img src="../../assets/favicon-96x96.png"></img>
    </NavLink>
    <NavLink to='/'>
      <h1>Gennuity</h1>
    </NavLink>
  </div>
);

module.exports = Logo;