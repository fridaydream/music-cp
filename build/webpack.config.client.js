const path = require('path')
const HTMLPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
const baseConfig = require('./webpack.base')
const isDev = process.env.NODE_ENV === 'development'

const config = webpackMerge(baseConfig, {
  mode: 'production',
  entry: {
    app: path.join(__dirname, '../client/index.tsx')
  },
  output: {
    filename: '[name].[hash:8].js',
    path: path.join(__dirname, '../dist'),
    publicPath: '/public/'
  },
  plugins: [
    new HTMLPlugin({
      template: path.join(__dirname, '../client/template.html'),
    }),
    new HTMLPlugin({
      template: '!!ejs-compiled-loader!' + path.join(__dirname, '../client/server.template.ejs'),
      filename: 'server.ejs'
    })
  ]
})

if (isDev) {
  config.devtool = '#cheap-module-eval-source-map'
  config.entry = {
    app: [
      'react-hot-loader/patch',
      path.join(__dirname, '../client/index.tsx')
    ]
  }
  config.mode = 'development'
  config.devServer = {
    host: '0.0.0.0',
    port: '8888',
    contentBase: path.join(__dirname, '../dist'),
    hot: true,
    overlay: {
      errors: true
    },
    publicPath: '/public/',
    historyApiFallback: {
      index: '/public/index.html'
    }
  }
  config.plugins.push(
    new webpack.HotModuleReplacementPlugin()
  );
  config.resolve.alias = {
    '@': path.resolve(__dirname, '../client/'),
    'react-dom': '@hot-loader/react-dom',
  }
  config.performance = {
    hints: false
  }
}

module.exports = config
