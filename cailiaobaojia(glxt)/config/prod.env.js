'use strict'

const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"production"',
  VUE_APP_IMAGE_URL: '"https://offer.gdweihu.com/storage"',
  VUE_URL: '"https://offer.gdweihu.com"',
  VUE_API_URL: '"https://offer.gdweihu.com/api/"'
})
