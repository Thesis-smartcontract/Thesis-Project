import React, { Component } from 'react';
import './contactus.css';
import axios from 'axios';

// const ContactUs = () => (
//   <div className="bg10">
//       <form>
//         <input type="text" className="cont" id="name" name="firstname" placeholder="Name" required><span className="fa fa-user user"></span> <br/>
        
//         <input type="text" id="email" className="cont" name="email" placeholder="Email" required>
//         <span className="fa fa-envelope-o email_icon"></span>
//         <br/>
        
//         <input type="text" id="subjecting" className="cont" name="subject" placeholder="Subject" required> <span className="fa fa fa-pencil subject"></span> <br/>
        
//         <textarea rows="10" cols="40" id="boxing"  className="cont" placeholder="Message"></textarea> <span className="fa fa-comment-o comment"></span><br/>
        
//         <input type="submit" value="Send a message" id="submit_button">
//       </form>
//   </div>
// )

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
        <form>
          <h1>Contact Us</h1>
          <div>
            <input type="text" name="name" placeholder="Name" required/>
          </div>
          <div>
            <input  type="email" name="email" placeholder="Email" required/>
          </div>
          <div>
            <textarea type="text" name="comments" placeholder="Message" required style={{marginTop: 0 + 'em', height: 22 + 'em'}}></textarea>
          </div>
          <button type="submit" className="submit">Submit</button>
        </form>
    </section>
      <div className="donation">
        <br />
        <br />
          <h1>Donate to support Development</h1>
          <br/>
            <p><b>Gennuity's mission</b> is to provide individual's income and help accumulate assests during retirement.</p>
            <p></p>
            <p></p>
            <p>All funds received and any proposal to spend it are visible on the blockchain for anyone to see.</p>
            <p>The process is fully transparent and governed by fraud-proof rules programmed on the blockchain, </p>
            <p>so you'll know your donations will be well taken care of.</p>
            <br/>
            <br/>
            <br/>
            <div>
              <h3>Donation Address</h3>
              <br/>
              <h5>0xfB6916095ca1df60bB79Ce92cE3Ea74c37c5d359</h5>
              <br/>
            </div>
            <div>
              <h6>Amount Received: {this.state.ethPrice} Eth </h6>
            </div>
      </div>
  </div>
    )
  }
}

        // <div className="name">
        //   <input placeholder="Name" />
        //   <span className="fa fa-user user"></span>
        // </div>

        // <div className="email">
        //   <input placeholder="Email" />
        //   <span className="fa fa-envelope-o email_icon"></span>
        // </div>

        // <div className="comment">
        //   <input placeholder="Message" />
        //   <span className="fa fa-comment-o comment"></span>
        // </div>
export default ContactUs;