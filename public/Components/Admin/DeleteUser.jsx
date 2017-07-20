import React, { Component } from 'react';

class DeleteUser extends Component {
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
<<<<<<< HEAD
    const { handleDeleteSubmit } = this.props;
    if(this.state.walletAddress !== '') {
      handleVerifySubmit(this.state.walletAddress)
    }
    else {
      event.preventDefault()
      alert('Address must be filled')
=======
    console.log(this.state.walletAddress, this.state.userAge)
    const { handleDeleteSubmit } = this.props;
    if(this.state.userAge >= 20 && this.state.walletAddress !== '') {
      handleVerifySubmit(this.state.walletAddress, this.state.userAge)
    }
    else {
      event.preventDefault()
      alert('User must be 20 years or older or address must be filled')
>>>>>>> 4ec7f9aafc5322616ba403cc67e914840a6e4317
    }
  }

  render() {
    return (
      <div>
        <p>Delete A User</p>
        <form onSubmit={this.handleSubmit}>
          <label>
            User's Wallet Address:  
            <input name="walletAddress" type="text" value={this.walletAddress} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>
    )
  }
}

export default DeleteUser