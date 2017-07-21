import React, { Component } from 'react';
import { Link } from 'react-router-dom';

const Mission = (props) => (
  <div className="mission">
    <h1 className="mission-title">Mission</h1>
    <hr/>
    <div className="mission-detail">
      <p>
        Gennuity smart contracts represent the next generation 
        of personal finance for retirement. Instead of depending on
        younger generations to foot bills, or perennial stock market
        record highs, money can be co-invested among similarly-aged individuals
        and distributed after retirement to those still living and paying bills.
      </p>
      <p>
        At sign up, and after retirement, DNA methylation tests from lip 
        swabs are used to verify both the age and livelihood of participants.
        This allows participants to identify themselves anonymously while 
        simulataneously preventing fraud. The source code for the contract is freely 
        available and self-executing, so investors can be guarenteed of simple and
        easy to verify agreement terms. Best practice fail safes are built-in to
        the system to allow for flexibility in contract protection.
      </p>
    </div>
    <div className="home-buttons">
      <Link to="/about">
        <button type="submit" name="learn-more" value="Learn More" className="submit-btn">Learn More</button>
      </Link>
      <Link to="/approval">
        <button type="submit" name="learn-more" value="Sign Up" className="submit-btn">Sign Up</button>
      </Link>
    </div>
  </div> 
);

module.exports = Mission;