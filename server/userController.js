const User = require('../database/userModel');
const Client = require('coinbase').Client;
const Mailgun = require('mailgun-js');
const dotenv = require('dotenv');
// const env = process.env.NODE_ENV || 'development';
// const config = require('../config')[env];
const result = dotenv.config()
console.log(result);
const client = new Client({
  apiKey: 'L3KYRril1zRuwQeS',
  apiSecret: '0FK9juFD0mr5wW0sb0o6sCyb6sS4inZ5'
});

const mailgun = new Mailgun({
  apiKey: process.env.MG_KEY,
  domain: process.env.MG_DOMAIN
});

module.exports = {
  getAllUsers: (req, res) => {
    User
      .find({})
      .exec( function(err, users) {
        if (err) return console.log(err)
        res.json({ success: true, message: 'all users', users: users })
      });
  },
  getUserInfo: (req, res) => {
    User
      .findOne({
        walletId: req.params.walletAddress
      })
      .exec( function(err, user) {
        if (err) return console.log(err)
        if (!user) return res.json({ success: false, message: "user doesn't exist", user: user })
        res.json({ success: true, message: 'user', user: user })
      });
  },
  create: (req, res) => {
    const newUser = new User(req.body);
    newUser.save(function(err, user) {
      if (!user) return res.json({success: false, message: 'user already exists'})
      if (err) return console.log(err)

      var data = {
        from: 'verify.gennuity@gmail.com',
        to: req.body.email,
        subject: 'Welcome to Gennuity!',
        html: `
          <p>Hi,</p>
          <p>
            Thank you for choosing Gennuity Technologies. Passing our 
            genetic test with a mailed-in lip swab is the only task required to
            complete sing-up. This measure allows us to place you in the correct
            pool of participants based on age. Following that verification, you are
            free to sign our Ethereum contract within one year of the verification 
            date.
          <p>
   
          <p>
            If you have any questions, feel free to reach out.
          </p>
   
          <p>Best,<br/>Gennuity Team</p>
        `
      };
      console.log('data', data);
      mailgun.messages().send(data, (err, body) => {
          if (err) {
              console.log("got an error: ", err);
          }
          else {
              console.log(body);
          }
      });

      res.json({success: true, message: 'user created', user: user});
    });
  },
  getEthPrice: (req, res) => {
    client.getSellPrice({'currencyPair': 'ETH-USD'}, (err, price) => {
      return res.send(price)
    });
  }
};
