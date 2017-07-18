import ReactDOM from 'react-dom';
import React from 'react';
import App from './Containers/App.jsx';
import { coinbase, web3, Instrument } from './web3'
// import Routes from './routes';

// import { default as Web3} from 'web3';
// import { default as contract } from 'truffle-contract'
// import instrument_artifacts from '../contract/build/contracts/Instrument.json'
// var Instrument = contract(instrument_artifacts);

// var accounts;
// var account;
// var instrument;
// console.log('web3', window.web3)
// // let web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
// let web3 = window.web3
// Instrument.setProvider(web3.currentProvider)
// // web3.eth.getAccounts(function(err, accs) {
// //   if (err != null) {
// //     alert("There was an error fetching your accounts.");
// //     return;
// //   }

// //   if (accs.length == 0) {
// //     alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
// //     return;
// //   }
// //   accounts = accs;
// //   account = accs[0];
// var coinbase = web3.eth.coinbase;
// console.log('coinbase', coinbase);
// // JSON.parse(web3.fromWei(web3.eth.getBalance(account)), "ether");
// // console.log(JSON.parse(web3));
// // var balance = JSON.parse(web3.fromWei(web3.eth.getBalance(coinbase)), "ether");

  ReactDOM.render(<App account={coinbase} Instrument={Instrument} web3={web3}/>, document.getElementById('app'));
// })



