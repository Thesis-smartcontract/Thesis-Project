import React, { Component } from 'react';
import Icon from './Icon.jsx';
import VertDiv from './VertDiv.jsx';
import './footer.css';

const Footer = (props) => (
  <div className="fixed-bottom">
    <div className="footer">
      <p className="footer-content">2017 Gennuity Inc</p>
      <VertDiv />
      <Icon href="https://twitter.com/" icon="fa fa-twitter"/>
      <VertDiv />
      <Icon href="https://github.com/Thesis-smartcontract/Thesis-Project.git" icon="fa fa-github"/>
    </div>
  </div>
);

module.exports = Footer;
