import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

const NavItem = (props) => (
  <li className="nav-item">
    <NavLink to={props.link} title={props.title} activeClassName="active">
      {props.title}
    </NavLink>
  </li>
);

module.exports = NavItem;