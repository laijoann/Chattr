const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const config = require('./webpack.config')

//const IP = 'localhost'//'172.46.3.111'

new WebpackDevServer(webpack(config), {
    publicPath: config.output.publicPath,
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000
    }
  })
  .listen('wss://joann-chattr.herokuapp.com/')
