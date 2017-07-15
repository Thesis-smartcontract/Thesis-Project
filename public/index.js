import ReactDOM from 'react-dom';
import React from 'react';
import App from './Containers/App.jsx';
// import Routes from './routes';

import { default as Web3} from 'web3';
import { default as contract } from 'truffle-contract'
import instrument_artifacts from '../contract/build/contracts/Instrument.json'
var Instrument = contract(instrument_artifacts);

var accounts;
var account;
var instrument;
let web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

Instrument.setProvider(web3.currentProvider)
    web3.eth.getAccounts(function(err, accs) {
      if (err != null) {
        alert("There was an error fetching your accounts.");
        return;
      }

      if (accs.length == 0) {
        alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
        return;
      }
      accounts = accs;
      account = accs[0];

      ReactDOM.render(<App account={account} Instrument={Instrument}/>, document.getElementById('app'));
    })



