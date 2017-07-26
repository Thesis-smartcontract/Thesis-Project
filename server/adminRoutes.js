const adminRouter = require('express').Router()
const Admin = require('../database/adminModel')
const AdminController = require('./adminController')
const DivTimerController = require('./divTImerController')
let autho = true

adminRouter.put('/addTestResult',  (req, res, next) => {
  if(autho) {
    next()
  } else {
    res.sendStatus(401)
  }
},AdminController.addTestResultToUser)

adminRouter.put('/verifyUser', (req, res, next) => {
  if(autho) {
    next()
  } else {
    res.sendStatus(401)
  }
}, AdminController.verifyUser)

adminRouter.put('/deleteUser', (req, res, next) => {
  if(autho) {
    next()
  } else {
    res.sendStatus(401)
  }
},AdminController.deleteUser)

adminRouter.post('/releaseDiv', DivTimerController.divCall)

adminRouter.get('/getDivDate', DivTimerController.displayDivTimer)

adminRouter.get('/getNonVerifiedUsers', AdminController.getNonVerifiedUsers)

adminRouter.get('/getVerifiedUsers', AdminController.getVerifiedUsers)

adminRouter.get('/:walletAddress', (req, res) => {
  Admin.findOne({ walletId: req.params.walletAddress })
    .exec( function(err, admin) {
      if (err) return console.log(err);
      if (!admin) return res.json({ success: false, message: "admin doesn't exist", admin: admin });
      autho = true;
      res.json({ success: true, message: 'admin', admin: admin });
    })
})

adminRouter.post('/', (req, res) => {
    const newAdmin = new Admin(req.body);
    newAdmin.save(function(err, admin) {
      if (!admin) return res.json({success: false, message: 'admin already exists'})
      if (err) return console.log(err)
      res.json({success: true, message: 'admin created', admin: admin});
    })
})


module.exports = adminRouter