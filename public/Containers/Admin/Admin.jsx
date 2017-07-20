import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux'
import Sidebar from './Sidebar.jsx';
import Portal from './Portal.jsx';
import { account, web3, Instrument } from '../../web3.js';
import VerifyUser from '../../Components/Admin/VerifyUser';
import DeleteUser from '../../Components/Admin/DeleteUser';
import GetDividend from '../../Components/Admin/GetDividend'
import ReleaseDividend from '../../Components/Admin/ReleaseDividend'
import AdminNavBar from '../../Components/Admin/AdminNavBar'

class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: ''
    }

    this.navBarClick = this.navBarClick.bind(this);
    this.handleVerifySubmit = this.handleVerifySubmit.bind(this);
    this.handleDeleteSubmit = this.handleDeleteSubmit.bind(this);
    this.handleReleaseDivClick = this.handleReleaseDivClick.bind(this);
    this.handleGetDivClick = this.handleGetDivClick.bind(this);
  }

  componentDidMount() {
    // let instrument;

    // this.props.web3.Instrument.deployed().then(instance => {
    //   instrument = instance;
    //   return instrument.pendingDividends.call(this.props.web3.account);
    // })
    // .then(amount => {
    //    this.setState({
    //      adminDividend: amount
    //    })
    // })
  }
  handleVerifySubmit(userAddress, userAge, isLiving) {
    alert('verify submit in parent component Admin!')
    let instrument;
    userAge = parseInt(userAge)
    isLiving = (isLiving === 'true')

    axios.put('http://localhost:3000/api/admin/addTestResult', {
      walletId: userAddress,
      isLiving: isLiving,
      age: userAge,
    })
    .then(updatedUser => {
      if(updatedUser.data.success) {
        alert(updatedUser.data.user)
        this.props.web3.Instrument.deployed().then(instance => {
          instrument = instance;
          instrument.verify(userAddress, userAge, { from: account })
        })
      } else {
        alert(updatedUser.data.message)
      }
    })
  }

  handleDeleteSubmit(userAddress) {
    // let instrument;
    // this.props.web3.Instrument.deployed().then(instance => {
    //   instrument = instance;
    //   return instrument.removeFromPool(userAddress, { from: account });
    // })
    axios.put('http://localhost:3000/api/admin/deleteUser', {
      walletId: userAddress
    })
    .then(user => {
      if(!user) {
        alert('User does not exist')
      } else {
        alert(user)
      }
    })
  }
  
  handleReleaseDivClick() {
    //let instrument;
    // this.props.web3.Instrument.deplayed().then(instance => {
    //   instrument.instance;
    //   return instrument.releaseDividends()
    // }).then((res) => {
    //   console.log(res)
    //   axios.put('http://localhost:3000/api/admin/updateDivDate')
    // })
  }

  handleGetDivClick() {
    // this.props.web3.Instrument.deplayed().then(instance => {
    //   instrument.instance;
    //   return instrument.collectDividend()
    // }).then((res) => {
    //   console.log(res)
    //   axios.put('http://localhost:3000/api/admin/updateDivDate')
    // })
  }

  navBarClick(clicked) {
    this.setState({
      clicked: clicked
    })
  }

  render(){
    let currentAdminView = null;

    if(this.state.clicked === 'verifyUser') {
      currentAdminView = <VerifyUser 
                          handleVerifySubmit={this.handleVerifySubmit}
                        />;
    } else if(this.state.clicked === 'deleteUser') {
      currentAdminView = <DeleteUser
                          handleDeleteSubmit={this.handleVerifySubmit}
                        />
    } else if(this.state.clicked === 'releaseDiv') {
      currentAdminView = <GetDividend
                          handleGetDivClick={this.handleGetDivClick}
                          adminDividend={this.state.adminDividend}
                        />
    } else if(this.state.clicked === 'getDiv') {
      currentAdminView = <ReleaseDividend
                          handleReleaseDivClick={this.handleReleaseDivClick}
                        />
    }

    return(
      <div>
        <AdminNavBar navBarClick={this.navBarClick}/>
        {currentAdminView}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  admin: state.Admin,
  web3: state.Web3Instance
})

export default connect(mapStateToProps, {})(Admin);