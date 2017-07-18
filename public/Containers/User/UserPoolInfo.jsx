import React, { Component } from 'react';
import { getEthPrice, getPoolInfo, isVerified } from '../../Actions/User/UserActions.js'
import { connect } from 'react-redux'
import { account, web3, Instrument } from '../../web3.js'
import PoolInfo from '../../Components/User/PoolInfo.js'

class UserPoolInfo extends Component {
  constructor(props) {
    super(props)

    this.state = {
      showPoolInfo: false
    }
    
    this.togglePoolInfo = this.togglePoolInfo.bind(this)
    this.verifyButton = this.verifyButton.bind(this)
  }

  async componentWillMount() {
    // const { getEthPrice, isVerified } = this.props;
    // await getEthPrice();
    // await isVerified();
    // console.log('the user pool info after is verified line 23', this.props.userPool)
  }

  async componentDidMount() {
    const { getEthPrice, isVerified } = this.props;
    await getEthPrice();
    await isVerified();
    const { getPoolInfo, userPool } = this.props;
    if(userPool.isVerified) {
      await getPoolInfo();
    }
  }

  togglePoolInfo() {
    let { userPool } = this.props;
    this.setState({
      showPoolInfo: true
    })
  }

  verifyButton() {
    Instrument.deployed().then(instance => {
      return instance.sendTransaction({ from: account, value: 10 * (10 ** 18) })
    })
    .then((transObj) => {
      console.log('youre in here')
      console.log('transaction obj', transObj)
    })
  }
  render() {
    let isInDatabaseButton = null;

    let { userPool } = this.props;
    if( this.state.showPoolInfo === true ) {
      isInDatabaseButton = <PoolInfo userPoolInfoObj={userPool}/> 
    } else if(userPool.isVerified) {
      isInDatabaseButton = <button onClick={this.togglePoolInfo}>Get Your Pool Info</button>
    } else if(userPool.isVerified === false) {
      isInDatabaseButton = <button onClick={this.verifyButton}>Verify Your Acct</button>
    } else {
      isInDatabaseButton = <p>Please Sign Up!</p>
    }

    return (
      <div>
        {isInDatabaseButton}
      </div>
    )
  }

}

const mapStateToProps = state => ({
  userPool: state.UserPool
})


export default connect(mapStateToProps, { getEthPrice, getPoolInfo, isVerified })(UserPoolInfo);
