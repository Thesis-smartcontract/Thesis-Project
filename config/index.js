module.exports = {
  'development': {
    url: 'mongodb://will:will@ds147882.mlab.com:47882/gennuity',
    coinBaseAPIKEY: '',
    coinBaseAPISECRET: ''
  },
  'production': {
    url: process.env.DB_URL,
    coinBaseAPIKEY: process.env.CB_KEY,
    coinBaseAPISECRET: process.env.CB_SECRET
  }
}