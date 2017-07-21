const DivTimer= require('../database/divTimerModel')

module.exports = {  

divCall: (req, res) => {
//     const divTimer = new DivTimer({ admin: "admin" });
      DivTimer.findOne({ admin: 'admin1'}, 'admin createdAt', (err, date) => {
        if(err) return console.log(err)
        if(date === null) {
          new DivTimer({ admin: 'admin1'}).save(function(err, divTimer) {
          console.log(divTimer)
          if (!divTimer) return res.json({success: false, message: 'Dividend cannot be release till a year has passed since last call', divTimer: divTimer})
          if (err) return console.log(err)
          res.json({success: true, message: 'Dividend timer intiated', divTimer: divTimer});
        })
        }
        res.json({success: false, message: 'Dividend cannot be release till a year has passed since last call', date: date})
      })
//     divTimer.save(function(err, divTimer) {
//       console.log(divTimer)
//       if (!divTimer) return res.json({success: false, message: 'Dividend cannot be release till a year has passed since last call', divTimer: divTimer})
//       if (err) return console.log(err)
//       res.json({success: true, message: 'Dividend timer intiated', divTimer: divTimer});
//     })
}

}