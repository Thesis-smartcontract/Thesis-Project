import React, { Component } from 'react';
import './adminNavbar.css'

class AddTestResults extends Component {
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
      this.props.changeTestInputValue(event.target.value)
    } else {
      this.setState({
        [inputName]: event.target.value
      });
    }
  }

  handleSubmit(event) {
    event.preventDefault()
    const { handleVerifySubmit } = this.props;
    if(this.state.userAge >= 20 && this.props.testInputValue !== '' && this.state.isLiving !== undefined) {
      handleVerifySubmit(this.props.testInputValue, this.state.userAge, this.state.isLiving)
      this.setState({
        userAge: undefined,
        isLiving: undefined
      })
      this.props.changeTestInputValue('')
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
              <tr><thead><label>User's Wallet Address:</label></thead><td><input className="field" name="walletAddress" type="text" value={this.props.testInputValue} onChange={this.handleChange}/></td></tr>
              <tr><thead><label>User's Verified Age:</label></thead><td><input className="field" name="userAge" type="number" value={this.state.userAge} onChange={this.handleChange}/></td></tr>
              <tr><thead><label>Deceased?:</label></thead><td><select name="isLiving" value={this.state.isLiving} onChange={this.handleChange}>
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

export default AddTestResults