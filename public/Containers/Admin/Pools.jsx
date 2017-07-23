import React, { Component } from 'react';

// import { default as Web3} from 'web3';
// import { default as contract } from 'truffle-contract'
// import instrument_artifacts from '../../build/contracts/Instrument.json'
// var Instrument = contract(instrument_artifacts);

var accounts;
var account;
var instrument;

export default class Pools extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pools: null
    };

    this.init();
  }
  
  render() {
    var pools = this.state.pools.map((pool, idx) => (
      < Pool 
        key={idx}
        midAge={pool.midAge}
        participants={pool.participants.length}
        totalEth={pool.participants.totalEth} 
      />
    )); 

    return (
      <ul>
        {pools}
      </ul>
    );
  }
};

var Pool = (props) => (
  <div>
    <h1>Pool Mean Age : { props.midAge }</h1>
    <h2>Participants : { props.participants }</h2>
    <h2>Total Eth : { props.totalEth }</h2>
  </div>
);
