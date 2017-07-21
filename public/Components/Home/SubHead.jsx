import React, { Component } from 'react';

const Subhead = (props) => (
  <div className="subhead">
    <div className="eth-icon">
      <img src='Components/Home/eth_icon.png'></img>
    <h1>Use Ethereum Smart Contracts to secure your future.</h1>
    </div>
    <div className="quick-info">
      <div className="about">
        <h1>About</h1>
        <hr/>
        <ul>
          <li>Self-sustained pension</li>
          <li>Money distributed to those alive</li>
          <li>Twice the return of tranditional investment</li>
          <li>Genetic proof of identity/life (mail-in lip swab)</li>
          <li>Easy signup with aged-based cost</li>
          <li>Easy collection with aged-based dividends</li>
          <li>Ethereum blockchain self-enforces contract</li>
        </ul>
      </div>
      <div className="next-steps">
        <h1>How To Join</h1>
        <hr/>
        <ol>
          <li>Get an Ethereum Wallet</li>
          <li>Install Metamask chrome plugin</li>
          <li>Connect wallet to Metamask</li>
          <li>Sign up with minimal personal info</li>
          <li>Verify age with mail-in lip swap</li>
          <li>Sign the contract in-app or in your wallet</li>
          <li>Collect dividends at retirement age</li>
        </ol>
      </div>
    </div>
  </div>
);

module.exports = Subhead;
