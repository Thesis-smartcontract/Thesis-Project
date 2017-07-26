const User = require('../database/userModel');
const Client = require('coinbase').Client;
const Mailgun = require('mailgun-js');
const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));
const dotenv = require('dotenv');
const result = dotenv.config();

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
      
      fs.readFile('server/sign-up.html', 'utf8', (err, email) => {
        var data = {
          from: 'verify.gennuity@gmail.com',
          to: req.body.email,
          subject: 'Welcome to Gennuity!',
          html: email
        };

        mailgun.messages().send(data, (err, body) => {
            if (err) {
              console.log("got an error: ", err);
            }
            else {
              console.log(body);
            }
        });
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
