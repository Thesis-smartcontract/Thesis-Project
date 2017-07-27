import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import DateAndTimeClock from './DateAndTimeClock'
import './poolInfo.css'
import PoolTile from './PoolTile'
import PriceChart from './PriceChart'

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
    this.props.web3.Instrument.deployed().then(instance => {
      return instance.collectDividend({from: this.props.web3.Account })
    })
    .then((res) => {
      if(res) {
        this.setState({
          currentDiv: 0
        })
      }
    })
  }

  render() {
    let row1 = [
      {
        title: 'Pool Mid-Age',
        glyph: 'fa fa-calendar',
        detail: this.state.poolMidAge
      },
      {
        title: 'Pool Participants',
        glyph: 'fa fa-users',
        detail: this.state.numPoolPart
      },
      {
        title: 'Pool Total Amount',
        glyph: 'fa fa-university',
        detail: `${this.state.ethAmount} ETH`
      }
    ]

    let row2 = [
      {
        title: 'Current ETH Price',
        glyph: 'fa fa-line-chart',
        detail: `$${this.state.ethPrice}`
      },
      {
        title: 'Your Dividend',
        glyph: 'fa fa-money',
        detail: `${this.state.currentDiv} ETH`
      }
    ]

    let getDivButton = null;

    if(this.state.currentDiv > 0) {
      getDivButton = <button onClick={this.handleGetDivClick}>Get Your Dividend</button>
    }
    return (
      <div className="poolInfo">
        <div className="poolheader">
          <h1>{this.props.web3.Account}'s Profile</h1>
          <DateAndTimeClock />
        </div>
        <div className="row1">
          {
            row1.map((feat, idx) =>
              < PoolTile
                key={idx}
                glyph={feat.glyph}
                title={feat.title} 
                detail={feat.detail}
                rowNum={"row1"}
              />
            )
          }
          {/* <span className="row1-item">Pool Mid-Age: {this.state.poolMidAge} years</span>
          <span className="row1-item">Number of Participants: {this.state.numPoolPart}</span>
          <span className="row1-item">Total Eth In Pool: {this.state.ethAmount} ETH</span> */}
        </div>
        <div className="row2">
          {
            row2.map((feat, idx) => 
              < PoolTile
                key={idx}
                glyph={feat.glyph}
                title={feat.title} 
                detail={feat.detail}
                rowNum={"row2"}
                getDiv={this.props.getDiv}
              />
            )
          }
        </div>

      </div>
    )
  }
}
export default PoolInfo


{/* <ul>
  <li>Pool Mid-Age: {this.state.poolMidAge} years</li>
  <li>Number of Participants: {this.state.numPoolPart}</li>
  <li>Total Eth In Pool: {this.state.ethAmount} ETH</li>
  <li>Current Eth Price: ${this.state.ethPrice}</li>
  <li>Current Dividend: {this.state.currentDiv} ETH</li>
</ul>
  {getDivButton} */}

