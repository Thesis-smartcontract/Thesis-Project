const mongoose = require('mongoose')

const divTimerSchema = mongoose.Schema({
  admin: { type: String, unique: true },
  createdAt: {type: Date, default: Date.now, expires: 60 }
})

const DivTimer = mongoose.model('DivTimer', divTimerSchema)

module.exports = DivTimer