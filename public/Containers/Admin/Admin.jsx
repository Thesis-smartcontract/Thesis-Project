import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux'
import Sidebar from './Sidebar.jsx';
import Portal from './Portal.jsx';
import { account, web3, Instrument } from '../../web3.js';
import VerifyUser from '../../Components/Admin/VerifyUser';
import DeleteUser from '../../Components/Admin/DeleteUser';

class Admin extends Component {
  constructor(props) {
    super(props);

    this.handleVerifySubmit = this.handleVerifySubmit.bind(this);
    this.handleDeleteSubmit = this.handleDeleteSubmit.bind(this);
  }

  handleVerifySubmit(userAddress, userAge, isLiving) {
    alert('verify submit in parent component Admin!')

    // let instrument;
    // Instrument.deployed().then(instance => {
    //   instrument = instance;
    //   instrument.verify(userAddress, userAge, { from: account })
    // })
    axios.put('http://localhost:3000/api/admin/addTestResult', {
      walletId: userAddress,
      isLiving: isLiving,
      age: userAge,
    })
  }

  handleDeleteSubmit(userAddress) {
    // let instrument;
    // Instrument.deployed().then(instance => {
    //   instrument = instance;
    //   return instrument.removeFromPool(userAddress, { from: account });
    // })
    axios.put('http://localhost:3000/api/admin/deleteUser', {
      walletId: userAddress
    })
  }

  render(){
    return(
      <div>
        <VerifyUser 
          handleVerifySubmit={this.handleVerifySubmit}
        />
        {/* <DeleteUser
          handleDeleteSubmit={this.handleVerifySubmit}
        /> */}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  admin: state.Admin
})

export default connect(mapStateToProps, {})(Admin);