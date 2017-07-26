module.exports = {
  'development': {
    url: 'mongodb://will:will@ds147882.mlab.com:47882/gennuity',
    coinBaseAPIKEY: '',
    coinBaseAPISECRET: '',
    MG_KEY: process.env.MG_KEY,
    MG_DOMAIN: process.env.MG_DOMAIN
  },
  'production': {
    url: process.env.DB_URL,
    coinBaseAPIKEY: process.env.CB_KEY,
    coinBaseAPISECRET: process.env.CB_SECRET,
    MG_KEY: process.env.MG_KEY,
    MG_DOMAIN: process.env.MG_DOMAIN
  }
}