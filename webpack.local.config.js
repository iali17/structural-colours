var path = require('path')
var webpack = require('webpack')
var BundleTracker = require('webpack-bundle-tracker')

var config = require('./webpack.base.config.js')

config.entry = [
       'webpack-dev-server/client?http://localhost:3000',
       './client/index',
]

config.plugins = config.plugins.concat([
    new BundleTracker({filename: './webpack-stats.json'}),
])

config.output.publicPath = 'http://localhost:3000/assets/bundles/'

module.exports = config
