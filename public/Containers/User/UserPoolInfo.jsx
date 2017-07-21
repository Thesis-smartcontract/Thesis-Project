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
    let { web3Instance } = this.props;
    
    if(!this.props.userPool.isInPool) {
      this.props.web3Instance.Instrument.deployed().then(instance => {
        return instance.sendTransaction({ from: web3Instance.Account, value: 10 * (Math.pow(10, 18)) })
      })
      .then((transObj) => {
        this.props.getPoolInfo(web3Instance.Instrument, web3Instance.Account)
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
    let isInDatabaseButton = null;

    let { userPool, web3Instance } = this.props;
    if( this.state.showPoolInfo === true ) {
      isInDatabaseButton = <PoolInfo userPoolInfoObj={userPool} web3={web3Instance}/> 
    } else if(userPool.isInPool) {
      isInDatabaseButton = <button onClick={this.togglePoolInfo}>Get Your Pool Info</button>
    } else if(userPool.isVerified === true && userPool.isInPool === false) {
      isInDatabaseButton = <div><p>Your DNA has been verified!</p><button onClick={this.verifyButton}>Sign Contract</button></div>
    } else if(userPool.isVerified === false) {
      isInDatabaseButton = <p>Awaiting to verify your DNA Sample</p>
    } else if (userPool.isVerified === null) {
      isInDatabaseButton = <p>Please Sign Up!</p>
    }

    return (
      <div id="pool-info" className="top-of-page">
        {isInDatabaseButton}
      </div>
    )
  }

}

const mapStateToProps = state => {
  return {
    userPool: state.UserPool,
    web3Instance: state.Web3Instance
  }
}


export default connect(mapStateToProps, { getEthPrice, getPoolInfo, isVerified })(UserPoolInfo);
