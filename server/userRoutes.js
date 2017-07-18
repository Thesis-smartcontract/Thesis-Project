const userRouter = require('express').Router()

const UserController = require('./userController')

userRouter.post('/', UserController.create)
userRouter.get('/allUsers', UserController.getAllUsers)
userRouter.get('/user/:walletAddress', UserController.getUserInfo)
userRouter.get('/ethPrice', UserController.getEthPrice)

module.exports = userRouter