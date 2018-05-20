const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const baseWebpackConfig = require('./webpack.base.conf')
module.exports = {
  //入口文件的配置项
  entry: {
    entry: './packages/index.js'
  },
  //出口文件的配置项
  output: {
    //输出的路径，用了Node语法
    path: path.resolve(__dirname, '../lib'),
    //输出的文件名称
    filename: 'avue.js'
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'avue': path.resolve('packages'),
    }
  },
  //模块：例如解读CSS,图片如何转换，压缩
  module: {
    rules: [{
        test: /\.vue$/,
        loader: 'vue-loader',
        exclude: /node_modules/
      }, {
        test: /\.js$/, //是一个正则，代表js或者jsx后缀的文件要使用 下面的loader
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(css|scss)$/,
        loader: "style-loader!css-loader!sass-loader",
        exclude: /node_modules/
      }
    ]
  },
  //插件，用于生产模版和各项功能
  plugins: [
    new CleanWebpackPlugin([path.resolve(__dirname, '../lib')]),
    new ExtractTextPlugin(path.resolve('../lib/avue.css')),
    new UglifyJSPlugin({
      uglifyOptions: {
        compress: {
          warnings: false
        }
      },
      sourceMap: false,
      parallel: true
    })
  ],
  devServer: {}
}
