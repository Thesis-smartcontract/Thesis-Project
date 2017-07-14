import React, { Component } from 'react';
<<<<<<< c7097bc165039605d5dd73943a87584a3335d5ff

const UserPoolInfo = () => (
  <div>
  Your Pool Info
  </div>
)

export default UserPoolInfo;
=======
import { getEthPrice } from '../../Actions/User/UserActions.js'
import { connect } from 'react-redux'

class UserPoolInfo extends Component {
  constructor(props) {
    super(props)
    console.log(props)
  }

  async componentDidMount() {
    const { getEthPrice } = this.props;
    await getEthPrice();
  }

  render() {
    let { userPool } = this.props;
    return (
    <div>
    <ul>
      <li>{userPool.ethAmount}</li>
      <li>{userPool.poolAge}</li>
      <li>{userPool.poolPart}</li>
      <li>{userPool.ethPrice}</li>
    </ul>
    </div>
    )
  }

}

const mapStateToProps = state => ({
  userPool: state.UserPool
})

export default connect(mapStateToProps, { getEthPrice })(UserPoolInfo);
>>>>>>> working with redux
