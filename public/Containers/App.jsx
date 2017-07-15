import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import ReduxPromise from 'redux-promise';
import reducers from '../Reducers/RootReducer';
import Landing from '../Components/User/LandingPage.jsx';
import ApprovalPage from '../Components/User/ApprovalPage.jsx';
import Contributing from '../Containers/User/Contributing';
import About from '../Components/User/About.jsx';
import FAQ from '../Containers/User/FAQ.jsx';
import TokenDetail from '../Components/User/TokenDetail.jsx';
import Admin from '../Containers/Admin/Admin';
import NavBar from '../Containers/NavBar';
import UserPoolInfo from '../Containers/User/UserPoolInfo'

const store = createStore(reducers, applyMiddleware(ReduxThunk, ReduxPromise));


import { default as Web3} from 'web3';
import { default as contract } from 'truffle-contract'
// import instrument_artifacts from '../../contract/build/contracts/Instrument.json'
// var Instrument = contract(instrument_artifacts);

// var accounts;
// var account;
// var instrument;
// let web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
// import { Route, HashRouter, NavLink } from 'react-router-dom';

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      account: this.props.account,
      Instrument: this.props.Instrument
    }
  }

  componentDidMount() {
    var instrument;
    var poolIdx;
    var midAgeForPool = 72;
    var age = 69;
    var price = 10;
    var web3 = this.props.web3
    var account = this.props.account
    console.log('props',this.props)


    this.props.Instrument.deployed().then(instance => {
      instrument = instance;
      return instrument.verify(account, age, { from: account });
    })
    .then(() => {
      return instrument.poolForAge.call(age);
    })
    .then((pool) => {
      poolIdx = pool.c[0];
      return instrument.pool.call(poolIdx);
    })
    .then(pool => {
      pool.forEach((p,i) => {
        console.log('this is the pool info midage?', JSON.parse(p))
      })

      console.log('the pool',pool)
      console.log("balance before signup", instrument);
    })
    .catch(e => { 
      console.log(e);
    });
  }

 render() {
  console.log(this.state)
   return (
  <Provider store={store}>
  <HashRouter>
    <div>
      <NavBar />
      <Switch>
        <Route exact path="/" component={Landing}/>
        <Route path="/approval" component={ApprovalPage}/>
        <Route path="/contributing" component={Contributing}/>
        <Route path="/tokenDetail" component={TokenDetail}/>
        <Route path="/faq" component={FAQ}/>
        <Route path="/about" component={About}/>
        <Route path="/admin" component={Admin}/>
        <Route path="/userPoolInfo" component={UserPoolInfo}/>
      </Switch>
    </div>
   </HashRouter>
   </Provider>
  ) 
 }
}

export default App;