const User = require('../database/userModel')
const Mailgun = require('mailgun-js');
const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));
const dotenv = require('dotenv');

const mailgun = new Mailgun({
  apiKey: process.env.MG_KEY,
  domain: process.env.MG_DOMAIN
});

module.exports = {
  addTestResultToUser: (req, res) => {
    const testResults = req.body;
    console.log(req.body)
    User.findOneAndUpdate(
      { walletId: testResults.walletId.toLowerCase() }, 
      { 
        $push: {
          testResults: {
            isLiving: testResults.isLiving,
            date: new Date(),
            age: testResults.age 
          }
        }
      },
      { new: false },
      (err, updatedUser) => {
        if(err) return console.log('err', err)
        if (!updatedUser) return res.json({ success: false, message: "user doesn't exist", user: updatedUser })
        res.json({ success: true, message: 'updated user', updatedUser: updatedUser })
      }
    );
  },
  verifyUser: (req, res) => {
    const testResults = req.body;
    User.findOneAndUpdate(
      { walletId: testResults.walletId.toLowerCase() }, 
      { 
        $set: {
          verified: true
        },
        $push: {
          testResults: {
            isLiving: testResults.isLiving,
            date: new Date(),
            age: testResults.age 
          }
        }
      },
      { new: false },
      (err, updatedUser) => {
        if(err) return console.log('err', err)
        if (!updatedUser) return res.json({ success: false, message: "user doesn't exist", user: updatedUser })
        
        fs.readFile('server/verify.html', 'utf8', (err, email) => {
          var data = {
            from: 'verify.gennuity@gmail.com',
            to: updatedUser.email,
            subject: 'Genetic test from Gennuity',
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

        res.json({ success: true, message: 'updated user', updatedUser: updatedUser })
      }
    );
  },
  deleteUser: (req, res) => {
    User.findOneAndUpdate(
      { walletId: req.body.walletId.toLowerCase() }, 
      {
        $set: {
          isDeleted: true,
        }
      },
      { new: false },
      (err, updatedUser) => {
        if(err) return console.log('err', err)
        if (!updatedUser) return res.json({ success: false, message: "user doesn't exist", user: updatedUser })
        res.json({ success: true, message: 'updated user', updatedUser: updatedUser })
      }
    );
  },
  getNonVerifiedUsers: (req, res) => {
    User.find({
      verified: false,
      isDeleted: false
    })
    .exec((err, users) => {
      if (err) return console.log(err)
      res.json({users: users})
    })
  },
  getVerifiedUsers: (req, res) => {
    User.find({
      verified: true,
      isDeleted: false
    })
    .exec((err, users) => {
      if (err) return console.log(err)
      res.json({users: users})
    })
  }
}