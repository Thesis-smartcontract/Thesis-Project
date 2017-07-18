const adminRouter = require('express').Router()
const Admin = require('../database/adminModel')
const AdminController = require('./adminController')
let autho = true

adminRouter.put('/addTestResult',  (req, res, next) => {
  if(autho) {
    next()
  } else {
    res.sendStatus(401)
  }
},AdminController.addTestResultToUser)

adminRouter.put('/deleteUser', (req, res, next) => {
  if(autho) {
    next()
  } else {
    res.sendStatus(401)
  }
},AdminController.deleteUser)

adminRouter.get('/:walletAddress', (req, res) => {
  Admin.findOne({ walletId: req.params.walletAddress })
    .exec( function(err, admin) {
      if (err) return console.log(err);
      if (!admin) return res.json({ success: false, message: "admin doesn't exist", admin: admin });
      autho = true;
      res.json({ success: true, message: 'admin', admin: admin });
    })
})

module.exports = adminRouter