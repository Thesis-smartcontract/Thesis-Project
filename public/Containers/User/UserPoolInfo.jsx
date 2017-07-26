import React, { Component } from 'react';
import { getEthPrice, getPoolInfo, isVerified } from '../../Actions/User/UserActions.js'
import { connect } from 'react-redux'
import PoolInfo from '../../Components/User/PoolInfo.js'
// delete this after only here for testing purposes
import Admin from '../Admin/Admin'

class UserPoolInfo extends Component {
  constructor(props) {
    super(props)

    this.state = {
      showPoolInfo: false
    }
    
    this.togglePoolInfo = this.togglePoolInfo.bind(this)
    this.verifyButton = this.verifyButton.bind(this)
  }

  togglePoolInfo() {
    let { userPool } = this.props;
    this.setState({
      showPoolInfo: true
    })
  }

  verifyButton() {
    let { web3 } = this.props;
    
    if(!this.props.userPool.isInPool) {
      web3.Instrument.deployed().then(instance => {
        return instance.sendTransaction({ from: web3.Account, value: 10 * (Math.pow(10, 18)) })
      })
      .then((transObj) => {
        this.props.getPoolInfo(web3.Instrument, web3.Account)
        console.log('transaction obj', transObj)
      })
      .catch(err => {
        alert('Please use metamask to interact with contract!')
        console.log(err);
      })
    }

  }

  getDividend() {
    
  }
  
  render() {
    let userView = null;
    let { userPool, web3 } = this.props;
    
    // if( this.state.showPoolInfo === true ) {
    //   userView = <PoolInfo userPoolInfoObj={userPool} web3={web3}/> 
    // } else if(userPool.isInPool) {
    //   userView = <button onClick={this.togglePoolInfo}>Get Your Pool Info</button>
    // } 
    
    if (userPool.isInPool) {
      userView = <PoolInfo userPoolInfoObj={userPool} web3={web3}/> 
    } else if(userPool.isVerified === true && userPool.isInPool === false) {
      userView = <div><p>Your DNA has been verified!</p><button onClick={this.verifyButton}>Sign Contract</button></div>
    } else if(userPool.isVerified === false) {
      userView = <p>Awaiting to verify your DNA Sample</p>
    } else if (userPool.isVerified === null) {
      userView = <p>Please Sign Up!</p>
    }

    return (
      <div id="pool-info" className="top-of-page">
        {userView}
      </div>
    )
  }

}

const mapStateToProps = state => {
  return {
    userPool: state.UserPool,
    web3: state.Web3Instance
  }
}


export default connect(mapStateToProps, { getEthPrice, getPoolInfo, isVerified })(UserPoolInfo);
