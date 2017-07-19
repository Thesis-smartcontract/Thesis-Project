import { default as Web3} from 'web3';
import { default as contract } from 'truffle-contract'
import instrument_artifacts from '../contract/build/contracts/Instrument.json'
var Instrument = contract(instrument_artifacts);

var instrument;

let web3 = window.web3

if(window.web3 !== undefined) {
  web3 = new Web3(window.web3.currentProvider)
} else {
  web3 = new Web3(new Web3.providers.HttpProvider(`http://${window.location.hostname}:8545`))
}

Instrument.setProvider(web3.currentProvider)

const account = web3.eth.coinbase

export {account, web3, Instrument}
