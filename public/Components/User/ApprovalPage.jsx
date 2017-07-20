import React, { Component } from 'react';
import axios from 'axios';

class ApprovalPage extends Component {
  constructor(){
    super();
    this.state= {
      walletId: '',
      email: '',
      startAge: null
    }
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleSubmitClick(stateObj) {
    if(stateObj.startAge >= 20){
    axios.post('http://localhost:3000/api/user/', {
      walletId: stateObj.walletId,
      email: stateObj.email,
      startAge: stateObj.startAge
    })
      .then(userInfo => {
        if(userInfo.data.success){
          alert('You have been created');
        } else {
          alert('You already exist in the database');
        }
      })
      .catch(err => {
        console.log(err);
      })
    } else {
      alert('You have to be at least 20 years old');
    }
  }

  handleInputChange(event){
    let target = event.target;
    let name = event.target.name;
    this.setState({ [name] : target.value });
  }

  render(){
    return(
      <div>
        <form onSubmit={(event) => {
          event.preventDefault();
          this.handleSubmitClick(this.state);
          }}>
          <label>
            Ethereum Wallet:
            <input
              name="walletId"
              type="text"
              placeholder="Enter Ethereum Wallet"
              onChange={this.handleInputChange}
            />
          </label>
          <br />
          <label>
            Email:
            <input
              name="email"
              type="email"
              placeholder="Enter Email Address"
              onChange={this.handleInputChange}
            />
          </label>
          <br />
          <label>
            Age:
            <input
              name="startAge"
              type="number"
              placeholder="Enter Age"
              onChange={this.handleInputChange}
            />
          </label>
          <br />
          <label>
            Allow your anonymous genome to be donated to research?
            <input type="radio" name="donate" value="yes" checked={true} />
            Yes
            <input type="radio" name="donate" value="no" />
            No
          </label>
          <br />
          <input type="submit" value="Submit" />
          <br />
        </form>
        <div
          className="g-recaptcha"
          id="recaptcha"
          data-sitekey="6Le4VygUAAAAAIK3cg3y3t4aYrDcC1m2MoNKBPYU"
          >
        </div>
        <br />
        <br />
          <b>INSTRUCTIONS TO SEND IN MOUTH SWAB:</b>
          <ol>
            <li>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation </li>
            <li>ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum </li>
            <li>dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."</li>
          </ol>
      </div>
    )
  }
}


export default ApprovalPage;