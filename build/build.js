const merge = require('webpack-merge');
const webpack = require('webpack');
const { VueLoaderPlugin } = require('vue-loader');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const alias = require('./alias');
const config = require('./config');

/**
 * Webpack构建配置
 * 合并基础配置和开发/生产环境特定配置
 *
 * 功能:
 * - 配置模块解析规则和别名
 * - 设置JavaScript和Vue文件的loader
 * - 添加构建进度条和必要插件
 */
module.exports = merge(config, {
  // 模块解析配置
  resolve: {
    // 自动解析的文件扩展名
    extensions: ['.js', '.vue', '.json'],
    // 路径别名配置，简化导入路径
    alias: alias
  },

  // 模块处理规则
  module: {
    rules: [
      {
        // JavaScript文件处理
        test: /\.js$/,
        include: process.cwd(), // 仅处理当前工作目录下的文件
        exclude: /node_modules/, // 排除node_modules目录
        loader: 'babel-loader', // 使用babel进行ES6+转换
        options: {
          // 启用缓存以提升构建性能
          cacheDirectory: true
        }
      },
      {
        // Vue单文件组件处理
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          // 移除模板中的空白字符以减小体积
          preserveWhitespace: false,
          // 启用缓存以提升构建性能
          cacheDirectory: true
        }
      }
    ]
  },

  // 插件配置
  plugins: [
    // Vue Loader插件，必须包含以处理.vue文件
    new VueLoaderPlugin(),

    // 构建进度条插件，显示构建进度
    new ProgressBarPlugin({
      format: '构建中 [:bar] :percent (:elapsed秒)',
      clear: false,
      width: 60
    }),

    // Loader选项插件，用于设置全局loader选项
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    })
  ],

  // 性能配置
  performance: {
    // 关闭性能提示，避免构建时的警告
    hints: false
  },

  // 统计信息配置
  stats: {
    // 简化输出信息
    children: false,
    modules: false
  }
});
