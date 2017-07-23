const DivTimer= require('../database/divTimerModel')

module.exports = {  

  divCall: (req, res) => {
        DivTimer.findOne({ admin: "userDiv"}, 'createdAt', (err, date) => {
          if(err) return console.log(err)
          if(date === null) {
            const divTimer = new DivTimer({ admin: "Admin"})
            divTimer.save((err, timer) => {
            if (err) return console.log(err)
            res.json({success: true, message: 'Dividend timer intiated', timer: timer.createdAt});
          })
          } else {
            res.json({success: false, message: 'Dividend cannot be release till a year has passed since last call', date: date.createdAt})
          }
        })
  },
  displayDivTimer: (req, res) => {
    DivTimer.findOne({admin: "userDiv"}, 'createdAt', (err, date) => {
      if(err) return console.log(err)
      if(date === null) {
        res.json({success: true, message: 'Can release dividends'})
      } else {
        res.json({success: false, message: 'Cannot release dividends', date: date.createdAt})
      }
    })
  }
}