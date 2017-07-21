import React, { Component } from 'react';
import Logo from './Logo.jsx';
import NavItemList from './NavItemList.jsx';
import './navbar.css';

const Navbar = (props) => (
  <div className="nav-bar">
    <Logo/>
    <NavItemList isAdmin={props.admin}/>
  </div>
);

module.exports = Navbar;