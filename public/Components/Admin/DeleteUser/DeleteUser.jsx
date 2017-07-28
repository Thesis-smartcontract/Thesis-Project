import React, { Component } from 'react';
import swal from 'sweetalert2';
import '../../../../node_modules/sweetalert2/src/colors.scss';
import '../../../../node_modules/sweetalert2/src/sweetalert2.scss';
import './DeleteUser.css'
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
    const { handleDeleteSubmit } = this.props;
    if(this.state.walletAddress !== '') {
      handleDeleteSubmit(this.state.walletAddress)
      this.setState({
        walletAddress: ''
      })
      
    }
    else {
      swal({
        title: 'Error',
        text: 'Address must be filled',
        type: 'error',
        confirmButtonText: 'Dismiss'
      })
    }
  }

  render() {
    return (
      <div className="deleteUserAdmin">
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