// import ReactDOM from 'react-dom';
// import React from 'react';
// import App from './Containers/App.jsx';
// // import Routes from './routes';

// // import { default as Web3} from 'web3';
// var web3 = new Web3();
// import { default as contract } from 'truffle-contract'


// // var web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
// web3.setProvider(new web3.providers.HttpProvider('http://localhost:8545'));
// web3.isConnected()

// console.log('web3', web3);
// console.log('web3.eth.accoounts', web3.eth.accounts);

// var coinbase = web3.eth.coinbase;
// console.log('coinbase', coinbase);
// // JSON.parse(web3.fromWei(web3.eth.getBalance(account)), "ether");
// // console.log(JSON.parse(web3));
// var balance = JSON.parse(web3.fromWei(web3.eth.getBalance(coinbase)), "ether");
// console.log('balance', balance);

// ReactDOM.render(<App coinbase={coinbase} balance={balance}/>, document.getElementById('app'));

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
<<<<<<< 73d51d58cdc2aedc76cd9559d80f9f586c158ad1
// web3.eth.getAccounts(function(err, accs) {
//   if (err != null) {
//     alert("There was an error fetching your accounts.");
//     return;
//   }

//   if (accs.length == 0) {
//     alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
//     return;
//   }

  let coinbase = web3.eth.coinbase;
  let balance = JSON.parse(web3.fromWei(web3.eth.getBalance(coinbase)), "ether");

  ReactDOM.render(<App account={coinbase} Instrument={Instrument} web3={web3}/>, document.getElementById('app'));
// })
=======
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



>>>>>>> Frontend stuff
