import React, { Component } from 'react';
import '../adminNavbar.css';
import swal from 'sweetalert2';
import '../../../../node_modules/sweetalert2/src/colors.scss';
import '../../../../node_modules/sweetalert2/src/sweetalert2.scss';

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
    const { handleAddTestResultSubmit } = this.props;
    if(this.state.userAge >= 20 && this.props.testInputValue !== '' && this.state.isLiving !== undefined) {
      handleAddTestResultSubmit(this.props.testInputValue, this.state.userAge, this.state.isLiving)
      this.setState({
        userAge: undefined,
        isLiving: undefined
      })
      this.props.changeTestInputValue('')
    }
    else {
      swal({
        title: 'Please completely fill out form',
        text: 'Please completely fill out form',
        type: 'error',
        confirmButtonText: 'Try Again!'
      })
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