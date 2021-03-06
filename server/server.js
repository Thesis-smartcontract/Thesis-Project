const express = require('express'),
      parser = require('body-parser'),
      PORT = process.env.PORT || 3000,
      morgan = require('morgan'),
      mongoose = require('mongoose'),
      userRoutes = require('./userRoutes'),
      adminRoutes = require('./adminRoutes'),
      dotenv = require('dotenv'),
      env = process.env.NODE_ENV || 'development',
      config = require('../config')[env];

const result = dotenv.config()

if (result.error) {
  throw result.error
}

mongoose.connect(config.url);
var db = mongoose.connection;


db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to DB')
});

const app = express()
  .use(parser.json())
  .use(parser.urlencoded({ extended: true }))
  .use(express.static('public'))
  .use(morgan('dev'))
  .use('/api/user', userRoutes)
  .use('/api/admin', adminRoutes)
  .listen(PORT, 'localhost', () => {
    console.log(`Successfully connected to server on PORT: ${PORT}`)
  });

// app.listen(PORT, err => {
//   if(err){
//     console.log('Err in connecting to the server');
//   } else {
//     console.log(`Successfully connected to server on PORT: ${PORT}`);
//   }
// })