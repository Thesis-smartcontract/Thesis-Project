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
    this.props.web3Instance.Instrument.deployed().then(instance => {
      return instance.sendTransaction({ from: account, value: 10 * (10 ** 18) })
    })
    .then((transObj) => {
      console.log('youre in here')
      console.log('transaction obj', transObj)
    })
  }

  getDividend() {
    
  }
  render() {
    let isInDatabaseButton = null;

    let { userPool } = this.props;
    if( this.state.showPoolInfo === true ) {
      isInDatabaseButton = <PoolInfo userPoolInfoObj={userPool}/> 
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
      <div>
        <button onClick={this.togglePoolInfo}>Get Your Pool Info</button>
        {isInDatabaseButton}
        {/* delete this later only here for testing purposes */}
        <Admin />
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
