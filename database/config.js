exports.config = {
  development: {
    url: 'mongodb://will:will@ds147882.mlab.com:47882/gennuity'
  },
  production: {
    url: process.env.DB_URL
  }
}