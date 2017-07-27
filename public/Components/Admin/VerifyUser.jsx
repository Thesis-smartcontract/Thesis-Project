import React, { Component } from 'react';
import './adminNavbar.css'

class VerifyUser extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLiving: ''
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const inputName = event.target.name;
    if(inputName === 'walletAddress') {
      this.props.changeInputValue(event.target.value)
    } else {
      this.setState({
        [inputName]: event.target.value
      });
    }
  }

  handleSubmit(event) {
    console.log(this.props.inputValue, this.state.userAge, this.state.isLiving)
    event.preventDefault()
    const { handleVerifySubmit } = this.props;
    if(this.state.userAge >= 20 && this.props.inputValue !== '' && this.state.isLiving !== undefined) {
      handleVerifySubmit(this.props.inputValue, this.state.userAge, this.state.isLiving)
      this.setState({
        userAge: undefined,
        isLiving: undefined
      })
      this.props.changeInputValue('')
    }
    else {
      alert('Please completely fill out form')
    }
    
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <table>
            <tbody>
              <tr><td><label>User's Wallet Address:</label></td><td><input className="field" name="walletAddress" type="text" value={this.props.inputValue} onChange={this.handleChange}/></td></tr>
              <tr><td><label>User's Verified Age:</label></td><td><input className="field" name="userAge" type="number" value={this.state.userAge} onChange={this.handleChange}/></td></tr>
              <tr><td><label>Deceased?:</label></td><td><select name="isLiving" value={this.state.isLiving} onChange={this.handleChange}>
              <option value=""></option>
              <option value="false">Yes</option>
              <option value="true">No</option>
            </select></td></tr>
            </tbody>
          </table>
          <br />
          <input type="submit" value="Submit"/>
        </form>
      </div>
    )
  }
}

export default VerifyUser