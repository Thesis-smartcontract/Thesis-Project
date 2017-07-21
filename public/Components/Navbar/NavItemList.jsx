import React, { Component } from 'react';
import NavItem from './NavItem.jsx';

const NavItemList = (props) => {

  let items = [
    {
      title: 'More Info',
      link: '/moreinfo',
      isAdmin: false
    },
    {
      title: 'Sign Up',
      link: '/get-approved',
      isAdmin: false
    },
    {
      title: 'Documentation',
      link: '/documentation',
      isAdmin: false
    },
    {
      title: 'Contact',
      link: '/contact',
      isAdmin: false
    },
    {
      title: 'My Pool',
      link: '/moreinfo',
      isAdmin: false,
    },
    {
      title: 'Admin',
      link: '/admin',
      isAdmin: true
    },
  ];

  let navItems = items.map((item, idx) => (
    <NavItem 
      key={idx}
      title={item.title}
      link={item.link}
      isAdmin={item.isAdmin}
    /> 
  ));
  
  return (
    <ul id="nav-item-list">
      {navItems}
    </ul>
  );
}



module.exports = NavItemList;