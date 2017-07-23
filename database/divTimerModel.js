const mongoose = require('mongoose')

const divTimerSchema = mongoose.Schema({
  admin: { type: String, unique: true },
  // change the expiration timer to 60*60*24*365 once ready for deployment
  createdAt: {type: Date, default: Date.now, expires: 60 }
})

const DivTimer = mongoose.model('DivTimer', divTimerSchema)

module.exports = DivTimer