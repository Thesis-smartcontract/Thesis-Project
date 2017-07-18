import React, { Component } from 'react';

const Mission = (props) => (
  <div className="mission">
    <h1 className="mission-title">Mission</h1>
    <p className="mission-detail">
       Gennuity smart contracts represent the next generation 
       of personal finance for retirement. Instead of depending on
       younger generations to foot bills, or perennial stock market
       record highs, money can be co-invested among similarly-aged individuals
       and distributed after retirement to those who still need the money.
    </p>
    <p className="mission-detail">
       At sign up, and after retirement, DNA methylation tests from lip 
       swabs are used to verify both the age and livelihood of participants.
       This allows participants to identify themselves completely anonymously,
       while preventing fraud. The source code for the contract is freely 
       available and self-executing, so investors can be guarenteed of simple and
       easy to verify agreement terms. Best practice fail safes are built-in to
       the system to allow for flexibility in contract protection.
    </p>
  </div> 
);

module.exports = Mission;