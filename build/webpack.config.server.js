const path = require('path')
const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
const baseConfig = require('./webpack.base')
const isDev = process.env.NODE_ENV === 'development'

module.exports = webpackMerge(baseConfig, {
  target: 'node',
  entry: {
    app: path.join(__dirname, '../client/server-entry.tsx')
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../client/'),
    },
    extensions: ['.ts', '.tsx', '.js', 'jsx']
  },

  externals: Object.keys(require('../package.json').dependencies),
  output: {
    filename: 'server-entry.js',
    path: path.join(__dirname, '../dist'),
    publicPath: '/',
    libraryTarget: 'commonjs2'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env':{
        'NODE_ENV': JSON.stringify(isDev?'development':'production'),
        // 本地模拟和线上配置不同
        'API_BASE': JSON.stringify(process.env.NODE_ENV === 'production1' ?'http://127.0.0.1:3333':'http://music.daxierhao.com')
      },
    })
  ]
})
