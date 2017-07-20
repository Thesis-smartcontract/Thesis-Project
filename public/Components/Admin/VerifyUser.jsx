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
    event.preventDefault()
    const { handleVerifySubmit } = this.props;
    if(this.state.userAge >= 20 && this.state.walletAddress !== '' && this.state.isLiving !== undefined) {
      handleVerifySubmit(this.state.walletAddress, this.state.userAge, this.state.isLiving)
      this.setState({
        userAge: undefined,
        walletAddress: '',
        isLiving: undefined
      })
    }
    else {
      event.preventDefault()
      alert('Please completely fill out form')
    }
  }

  render() {
    return (
      <div>
        <p>Verify A User</p>
        <form onSubmit={this.handleSubmit}>
          <label>
            User's Wallet Address:  
            <input name="walletAddress" type="text" value={this.state.walletAddress} onChange={this.handleChange} />
          </label>
          <br />
          <label>
            User's Age:
            <input name="userAge" type="number" value={this.state.userAge} onChange={this.handleChange} />
          </label>
          <br />
          <label>
            Deceased?:
            <select name="isLiving" value={this.state.isLiving} onChange={this.handleChange}>
              <option value=""></option>
              <option value="false">Yes</option>
              <option value="true">No</option>
            </select>
          </label>
          <br />
          <input type="submit" value="Submit" />
        </form>
      </div>
    )
  }
}

export default VerifyUser