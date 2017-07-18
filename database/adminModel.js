const mongoose = require('mongoose')

const adminSchema = mongoose.Schema({
  walletId: { type: String, unique: true }
})

const Admin = mongoose.model('Admin', adminSchema)

module.exports = Admin