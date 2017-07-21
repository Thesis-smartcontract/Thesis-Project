import React, { Component } from 'react';
import Button from './Button.jsx';
import Features from './Features.jsx';
import Headline from './Headline.jsx';
import Home from './Home.jsx';
import Mission from './Mission.jsx';
import Strategy from './Strategy.jsx';
import Subhead from './Subhead.jsx';
import './home.css';
// import EthIcon from 'public/Components/Home/eth_icon.png';

module.exports = class Home extends Component {

  render() {
    return (
      <div className="home">
        <Headline/>
        <Subhead/>
        <Features/>
        <Strategy/>
        <Mission/>
        <div>
          <Button title="More Info" to="/about"/>
          <Button title="Sign Up" to="/approval"/>
        </div>
      </div>
    )
  }
};
