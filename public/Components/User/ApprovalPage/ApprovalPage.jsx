import React, { Component } from 'react';
import axios from 'axios';
import './approvalpage.css';
import { Link } from 'react-router-dom';
// import downArrow from './downArrow.png';


class ApprovalPage extends Component {
  constructor(){
    super();
    this.state= {
      walletId: '',
      email: '',
      startAge: null
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmitClick = this.handleSubmitClick.bind(this);
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
        <div className="page-header">
          <h1 className="page-title">Get Age Verified</h1>
          <h2 className="page-subtitle">Submit your mouth swab and fill out our general form. <br/> We will verify you within 3 business days</h2>
        </div>

          <div className="page-anchors">
             <div className="anchor-containers"> 
              <a className="link-route" onClick={() => {document.getElementById('swab-instructions').scrollIntoView(true)}}><li className="swab-route">Swab Instructions</li>
              <img src='Components/User/ApprovalPage/downArrow.png' className="down-arw-swab"/></a>
             </div>
            <div className="verification-containers"> 
              <a className="link-route" onClick={() => {document.getElementById('verification-form').scrollIntoView(true)}}><li className="verification-route">Verification Form</li>
              <img src='Components/User/ApprovalPage/downArrow.png' className="down-arw-verification"/></a>
             </div> 
          </div>


        <div id="verification-form" className="container">
          <h1>Verification Form</h1>
            <section id="content">
              <form>
                <div>
                  <input 
                    className="field"
                    name="walletId" 
                    type="text" 
                    placeholder="Enter Ethereum Wallet" 
                    required="" 
                    onChange={this.handleInputChange}/>
                </div>
              <div>
                <input 
                  className="field"
                  name="email" 
                  type="email" 
                  placeholder="Enter Email" 
                  required="" 
                  onChange={this.handleInputChange}/>
              </div>
              <div>
                <input 
                  className="field"
                  name="startAge" 
                  type="number" 
                  placeholder="Enter Age" 
                  required="" 
                  onChange={this.handleInputChange}/>
              </div>
              <div>
                <button type="submit" className="submit-btn" onClick={events => {events.preventDefault(); this.handleSubmitClick(this.state)}}>Submit</button>
              </div>
            </form>
              <br />
              <br />
          </section>
              <div className="swab">
              <h2 id="swab-instructions">MOUTH SWAB INSTRUCTIONS:</h2>
              <br/>
              <h5 className="important-warning">IMPORTANT: Donors should not place anything (including food, drink, gum or tobacco products) in their mouth for at least 10 minutes prior to the procedure. DO NOT BITE, SUCH OR CHEW ON THE SPONGE! Refrain from talking while collection swab is in the mouth.</h5>
              <br/>
              <br/>
              <ol className="swab-inst">
                <li className="inst-list">With the swab, sweep the inside of mouth several times, then hold swab in closed mouth until the color on the saturation indicator strip appears in the indicator window.</li>
                <li className="inst-list">Remove collection swab from mouth and insert sponge, pushing until the locking flange locks in place in the bottom of the device. </li>
                <li className="inst-list">Once locked in place, the device is airtight, tamper evident, and ready to dispose of after use or send to lab for confirmation (on non-negative results)</li>
                <li className="inst-list">Send sample to 6060 Center Drive, Los Angeles CA 90025</li>
              </ol>
              </div>
        </div>
      </div>
    )
  }
}

{/* 
<div>
  <form action="">
    <input type="text" name="name" class="field" placeholder="Name (required)" required />
    <input type="email" name="email" class="formStyle" placeholder="Email (required)" required />
    <a href="#" class="formButton">Subscribe</a>
  </form>
</div> */}

export default ApprovalPage;