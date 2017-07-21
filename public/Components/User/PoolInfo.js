import React, { Component } from 'react';

// const PoolInfo = ({ userPoolInfoObj, web3 }) => {

//   return (
//   <div>
//     <ul>
//       <li>Pool Mid-Age: {userPoolInfoObj.poolMidAge}</li>
//       <li>Number of Participants: {userPoolInfoObj.numPoolPart}</li>
//       <li>Total Eth In Pool: {(userPoolInfoObj.ethAmount / Math.pow(10, 18))}</li>
//       <li>Current Eth Price: {userPoolInfoObj.ethPrice}</li>
//     </ul>
//   </div>
//   )
// }

class PoolInfo extends Component {
  constructor(props) {
    super(props)

    this.state = {
      poolMidAge: this.props.userPoolInfoObj.poolMidAge,
      numPoolPart: this.props.userPoolInfoObj.numPoolPart,
      ethAmount: (this.props.userPoolInfoObj.ethAmount / Math.pow(10, 18)),
      ethPrice: this.props.userPoolInfoObj.ethPrice
    }
    this.handleGetDivClick = this.handleGetDivClick.bind(this)
  }

  componentDidMount() {
    const { web3 } = this.props;

    web3.Instrument.deployed().then(instance => {
      return instance.pendingDividends.call(web3.Account)
    })
    .then(res => {
      this.setState({
        currentDiv: (JSON.parse(res) / Math.pow(10, 18))
      })
    })
  }

  handleGetDivClick() {
    const { web3 } = this.props;
    
    web3.Instrument.deployed().then(instance => {
      return instance.collectDividend({from: web3.Account})
    })
    .then(res => {
      console.log(res)
    })
  }

  render() {
    return (
      <div>
        <ul>
          <li>Pool Mid-Age: {this.state.poolMidAge} years</li>
          <li>Number of Participants: {this.state.numPoolPart}</li>
          <li>Total Eth In Pool: {this.state.ethAmount} ETH</li>
          <li>Current Eth Price: ${this.state.ethPrice}</li>
          <li>Current Dividend: {this.state.currentDiv} ETH</li>
        </ul>
        <button onClick={this.handleGetDivClick}>Get Your Dividend</button>
      </div>
    )
  }
}
export default PoolInfo