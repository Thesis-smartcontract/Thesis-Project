import React, { Component } from 'react';
import { getEthPrice, getPoolEthAmount } from '../../Actions/User/UserActions.js'
import { connect } from 'react-redux'

class UserPoolInfo extends Component {
  constructor(props) {
    super(props)
  }

  async componentDidMount() {
    const { getEthPrice } = this.props;
    await getEthPrice();
  }

  render() {
    let { userPool, getPoolEthAmount } = this.props;
    return (
    <div>
    <ul>
      <li>{userPool.ethAmount}</li>
      <li>{userPool.poolAge}</li>
      <li>{userPool.poolPart}</li>
      <li>{userPool.ethPrice}</li>
    </ul>
      <button onClick={getPoolEthAmount.bind(null, 5)}>Increment</button>
    </div>
    )
  }

}

const mapStateToProps = state => ({
  userPool: state.UserPool
})


export default connect(mapStateToProps, { getEthPrice, getPoolEthAmount })(UserPoolInfo);
