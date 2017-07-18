import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { Provider, connect } from 'react-redux';
import Landing from '../Components/User/LandingPage.jsx';
import ApprovalPage from '../Components/User/ApprovalPage.jsx';
import Contributing from '../Containers/User/Contributing';
import About from '../Components/User/About.jsx';
import FAQ from '../Containers/User/FAQ.jsx';
import TokenDetail from '../Components/User/TokenDetail.jsx';
import Admin from '../Containers/Admin/Admin';
import NavBar from '../Containers/NavBar';
import Home from '../Components/Home/Home.jsx'
import UserPoolInfo from '../Containers/User/UserPoolInfo';
import { getEthPrice, getPoolInfo, isVerified } from '../Actions/User/UserActions.js';

class App extends Component {
  constructor(props) {
    super(props);

  }

  async componentDidMount() {
    console.log('app props',this.props)

    const { getEthPrice, isVerified, getPoolInfo, userPool, admin, web3Instance, } = this.props;
    // await isAdmin(web3Instance.account)
    // if(!admin.isAdmin) {
      await getEthPrice()
      await isVerified(web3Instance.Account)
      if(userPool.isVerified) {
        await getPoolInfo(web3Instance.Instrument);
      }
    // }
  }

 render() {
   const { store } = this.props;
   return (
  <Provider store={store}>
  <HashRouter>
    <div>
      <NavBar admin={false}/>
      <Switch>
        <Route exact path="/" component={Home}/>
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
  );
 }
};

const mapStateToProps = state => {
  return {
    web3Instance: state.Web3Instance,
    userPool: state.UserPool,
    admin: state.Admin
  };
}

export default connect(mapStateToProps, { getEthPrice, getPoolInfo, isVerified })(App);