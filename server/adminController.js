const User = require('../database/userModel')

module.exports = {
  addTestResultToUser: (req, res) => {
    const testResults = req.body
    console.log(req.body)
    User.findOneAndUpdate({walletId: testResults.walletId}, 
                          { $push: {
                              testResults: {
                                isLiving: testResults.isLiving,
                                date: new Date(),
                                age: testResults.age 
                              }
                            }
                          },
                          { new: true },
                          (err, updatedUser) => {
                            if(err) return console.log('err', err)
                            if (!updatedUser) return res.json({ success: false, message: "user doesn't exist", user: updatedUser })
                            res.json({ success: true, message: 'updated user', updatedUser: updatedUser })
                          })
  },
  verifyUser: (req, res) => {
    User.findOneAndUpdate({walletId: testResults.walletId}, 
                          { $set: {
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
                          { new: true },
                          (err, updatedUser) => {
                            if(err) return console.log('err', err)
                            if (!updatedUser) return res.json({ success: false, message: "user doesn't exist", user: updatedUser })
                            res.json({ success: true, message: 'updated user', updatedUser: updatedUser })
                          })
  },
  deleteUser: (req, res) => {
    User.findOneAndUpdate({walletId: req.body.walletId}, 
                      { $set: {
                          isDeleted: true,
                        }
                      },
                      { new: false },
                      (err, updatedUser) => {
                        if(err) return console.log('err', err)
                        if (!updatedUser) return res.json({ success: false, message: "user doesn't exist", user: updatedUser })
                        res.json({ success: true, message: 'updated user', updatedUser: updatedUser })
                      })
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
<<<<<<< HEAD
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
=======
>>>>>>> a292b58cdb368fe36530d5471ae0caf6bc235168
  }
}