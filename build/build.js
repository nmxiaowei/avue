const merge = require('webpack-merge');
const webpack = require('webpack');
const { VueLoaderPlugin } = require('vue-loader')
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const alias = require('./alias');
let config = require('./config');

module.exports = merge(config, {
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: alias
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: process.cwd(),
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          preserveWhitespace: false
        }
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new ProgressBarPlugin(),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ]
});
