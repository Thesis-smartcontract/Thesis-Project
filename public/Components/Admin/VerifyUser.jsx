import React, { Component } from 'react';

class VerifyUser extends Component {
  constructor(props) {
    super(props)
    this.state = {
      walletAddress: ''
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const inputName = event.target.name;
    this.setState({
      [inputName]: event.target.value
    });
  }

  handleSubmit(event) {
    console.log(this.state.walletAddress, this.state.userAge, this.state.isLiving)
    const { handleVerifySubmit } = this.props;
    if(this.state.userAge >= 20 && this.state.walletAddress !== '' && this.state.isLiving !== undefined) {
      handleVerifySubmit(this.state.walletAddress, this.state.userAge)
    }
    else {
      event.preventDefault()
      alert('Please completely fill out form')
    }
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          User's Wallet Address:  
          <input name="walletAddress" type="text" value={this.walletAddress} onChange={this.handleChange} />
        </label>
        <br />
        <label>
          User's Age:
          <input name="userAge" type="number" value={this.userAge} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    )
  }
}

export default VerifyUser