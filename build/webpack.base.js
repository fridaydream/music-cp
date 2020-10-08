const { resolve } = require('path')
const webpack = require('webpack')

let isDev = process.env.NODE_ENV === 'development'

module.exports = {
  mode: isDev ? 'development': 'production',
  resolve: {
    alias: {
      '@': resolve(__dirname, '../client/'),
    }
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test:  /\.tsx?$/,
        exclude: [
          resolve(__dirname, '../node_modules')
        ]
      },
      {
        test: /\.tsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
    ]
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, '../client/'),
      'react-dom': '@hot-loader/react-dom',
    },
    extensions: ['.ts', '.tsx', '.js', 'jsx']
  },
  plugins: [new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV':  isDev ? '"development"': '"production"'
    }
  })]
}
