import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { Provider, connect } from 'react-redux';
import Landing from '../Components/User/LandingPage.jsx';
import ApprovalPage from '../Components/User/ApprovalPage/ApprovalPage.jsx';
import Contributing from '../Containers/User/Contributing';
import About from '../Components/User/About.jsx';
import FAQ from '../Containers/User/FAQ.jsx';
import TokenDetail from '../Components/User/TokenDetail.jsx';
import Admin from '../Containers/Admin/Admin';
import NavBar from '../Containers/NavBar';
import ContactUs from '../Components/User/ContactUs/ContactUs.jsx';
import Home from '../Components/Home/Home.jsx'
import UserPoolInfo from '../Containers/User/UserPoolInfo';
import SmartContract from '../Containers/User/SmartContract.jsx';
import { getEthPrice, getPoolInfo, isVerified } from '../Actions/User/UserActions.js';
import { isAdmin } from '../Actions/Admin/AdminActions.js';
import Footer from '../Components/Footer/Footer.jsx'
import Navbar from '../Components/Navbar/Navbar.jsx'

class App extends Component {
  constructor(props) {
    super(props);

  }

  componentDidMount() {
    const { getEthPrice, isVerified, web3Instance, isAdmin } = this.props;
    console.log('this is the web3 account', web3Instance.Account)
    isAdmin(web3Instance.Account)
    getEthPrice()
    isVerified(web3Instance.Account)
    this.props.getPoolInfo(web3Instance.Instrument, web3Instance.Account);
   
  }

 render() {
   const { store } = this.props;
   
   return (
    <Provider store={store}>
    <HashRouter>
      <div>
        <Navbar admin={this.props.admin.isAdmin}/>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route path="/approval" component={ApprovalPage}/>
          <Route path="/contributing" component={Contributing}/>
          <Route path="/tokenDetail" component={TokenDetail}/>
          <Route path="/faq" component={FAQ}/>
          <Route path="/about" component={About}/>
          <Route path="/admin" component={Admin}/>
          <Route path="/userPoolInfo" component={UserPoolInfo}/>
          <Route path="/smartContract" component={SmartContract}/>
          <Route path="/contact" component={ContactUs}/>
        </Switch>
        <Footer />
      </div>
    </HashRouter>
    </Provider>
  );
 }
}

const mapStateToProps = state => {
  return {
    web3Instance: state.Web3Instance,
    userPool: state.UserPool,
    admin: state.Admin
  };
}

export default connect(mapStateToProps, { getEthPrice, getPoolInfo, isVerified, isAdmin })(App);