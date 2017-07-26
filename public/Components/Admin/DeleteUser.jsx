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
    event.preventDefault()
    const { handleDeleteSubmit } = this.props;
    if(this.state.walletAddress !== '') {
      handleDeleteSubmit(this.state.walletAddress)
      this.setState({
        walletAddress: ''
      })
      
    }
    else {
      alert('Address must be filled')
    }
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            User's Wallet Address:  
            <input name="walletAddress" type="text" value={this.state.walletAddress} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>
    )
  }
}

export default DeleteUser