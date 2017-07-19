const User = require('../database/userModel')

module.exports = {
  addTestResultToUser: (req, res) => {
    const testResults = req.body.testResults
    User.findOneAndUpdate({walletId: req.body.walletId}, 
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
                      { new: true },
                      (err, updatedUser) => {
                        if(err) return console.log('err', err)
                        if (!updatedUser) return res.json({ success: false, message: "user doesn't exist", user: updatedUser })
                        res.json({ success: true, message: 'updated user', updatedUser: updatedUser })
                      })
  }
}