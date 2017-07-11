const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
  walletId: { type: String, unique: true },
  email: String,
  startAge: { type: Number, min: 20 },
  verified: { type: Boolean, default: null },
  testResults: {type: [{isLiving: Boolean, date: Date, age: Number}], default: [{ isLiving: false, date: null, age: null}]}
})

const User = mongoose.model('User', userSchema)

module.exports = User 