import React, { Component } from 'react';
import NavItem from './NavItem.jsx';

const NavItemList = (props) => {

  let items = [
    {
      title: 'More Info',
      link: '/about'
    },
    {
      title: 'Sign Up',
      link: '/approval'
    },
    {
      title: 'Documentation',
      link: '/smartContract'
    },
    {
      title: 'Contact',
      link: '/contact'
    }
  ];

  // if (props.isAdmin) {
    items.push({
      title: 'Admin',
      link: '/admin'
    });
  // } else {
    items.push({
      title: 'My Pool',
      link: '/userPoolInfo'
    });
  // }

  let navItems = items.map((item, idx) => (
    <NavItem 
      key={idx}
      title={item.title}
      link={item.link}
    /> 
  ));
  
  return (
    <ul id="nav-item-list">
      {navItems}
    </ul>
  );
}



module.exports = NavItemList;