const userRouter = require('express').Router()

const UserController = require('./userController')

userRouter.post('/', UserController.create)
userRouter.get('/allUsers', UserController.getAllUsers)
userRouter.get('/find/:walletAddress', UserController.getUserInfo)
userRouter.get('/ethPrice', UserController.getEthPrice)
userRouter.post('/contact', UserController.contact)

module.exports = userRouter