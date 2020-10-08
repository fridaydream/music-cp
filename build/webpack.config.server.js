const path = require('path')
const webpackMerge = require('webpack-merge')
const baseConfig = require('./webpack.base')

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
})
