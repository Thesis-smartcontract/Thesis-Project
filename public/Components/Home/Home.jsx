import React, { Component } from 'react';
import Button from './Button.jsx';
import Features from './Features.jsx';
import Headline from './Headline.jsx';
import Home from './Home.jsx';
import Mission from './Mission.jsx';
import Stats from '../Stats/Stats.jsx';
import Subhead from './Subhead.jsx';
import './home.css';
// import EthIcon from 'public/Components/Home/eth_icon.png';

module.exports = class Home extends Component {

  render() {
    return (
      <div className="home top-of-page" id="home">
        <Headline/>
        <Subhead/>
        <Features/>
        <Stats/>
        <Mission/>
      </div>
    )
  }
};
