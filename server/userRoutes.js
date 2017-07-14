const userRouter = require('express').Router()

const UserController = require('./userController')

userRouter.post('/', UserController.create)
userRouter.get('/', UserController.getAllUsers)
userRouter.get('/ethPrice', UserController.getEthPrice)

module.exports = userRouter