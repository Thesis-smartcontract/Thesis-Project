import React, { Component } from 'react';
import './contactus.css';
import axios from 'axios';

class ContactUs extends Component {
  constructor(){
    super();
    this.state = {
      ethPrice: null
    }
  }

  componentDidMount() {
    const addCommas = str => {
      return (str + "").replace(/\b(\d+)((\.\d+)*)\b/g, function(a, b, c) {
        return (b.charAt(0) > 0 && !(c || ".").lastIndexOf(".") ? b.replace(/(\d)(?=(\d{3})+$)/g, "$1,") : b) + c;
        });
      }
    axios.get("https://api.etherscan.io/api?module=account&action=balance&address=0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe&tag=latest&apikey=IUKZ7J9R48Z4EZAE6XG6VGAYIWU36RPZYQ")
      .then(price => {
        console.log('this is the price', addCommas(price.data.result / Math.pow(10,18)));
        let priceOfEth = addCommas(price.data.result / Math.pow(10,18));
        this.setState({ethPrice: priceOfEth});
      })
      .catch(err => {
        console.log(err);
      })
  }

  render(){
    return(
  <div className="container" id="contact">
    <section id="content">      
          <h1>Talk to Support</h1>
          <h4>Gennuity is always here. Complete the form below to reach out to our customer support team.</h4>
        <form>
          <div>
            <input 
              className="field"
              type="text" 
              name="name" 
              placeholder="Name" 
              required/>
          </div>
          <div>
            <input 
              className="field"
              type="email" 
              name="email" 
              placeholder="Email" 
              required/>
          </div>
          <div>
            <textarea 
              className="field"
              type="text" 
              name="comments" 
              placeholder="Message" 
              required 
              style={{marginTop: 0 + 'em', height: 22 + 'em'}}></textarea>
          </div>
          <button type="submit" className="submit-btn">Submit</button>
        </form>
    </section>
      <div className="donation">
          <h1 className="donation-title">Donate to support Development</h1>
            <p><b>Gennuity's mission</b> is to provide individual's income and help accumulate assests during retirement.</p>
            <p>All funds received and any proposal to spend it are visible on the blockchain for anyone to see.</p>
            <p>The process is fully transparent and governed by fraud-proof rules programmed on the blockchain, </p>
            <p>so you'll know your donations will be well taken care of.</p>
            <div className="donation-address">
              <h3>Donation Address</h3>
              <div><h5>Wallet Address:</h5><h6 className="eth-wallet"> 0xfB6916095ca1df60bB79Ce92cE3Ea74c37c5d359</h6></div>
            </div>
            <div>
              <div><h5>Amount Received:</h5><h6 className="eth-amount"> {this.state.ethPrice} Ether </h6></div>
            </div>
      </div>
  </div>
    )
  }
}

export default ContactUs;