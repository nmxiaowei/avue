const merge = require('webpack-merge');
const webpack = require('webpack');
const { VueLoaderPlugin } = require('vue-loader');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const path = require('path');
const alias = require('./alias');
const config = require('./config');

// ============================================================
// 日志工具函数
// ============================================================

/**
 * 获取当前时间戳
 * @returns {string} 格式化的时间字符串
 */
function getTimestamp() {
  const now = new Date();
  return `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;
}

/**
 * 日志输出
 * @param {string} type - 日志类型
 * @param {string} message - 消息
 */
function log(type, message) {
  const timestamp = `\x1b[90m[${getTimestamp()}]\x1b[0m`;
  const types = {
    info: '\x1b[36mℹ\x1b[0m',
    success: '\x1b[32m✔\x1b[0m',
    config: '\x1b[35m⚙\x1b[0m',
    perf: '\x1b[33m⚡\x1b[0m'
  };
  const prefix = types[type] || types.info;
  console.log(`${timestamp} ${prefix} ${message}`);
}

// ============================================================
// Webpack 构建配置
// ============================================================

log('config', 'Webpack 配置加载中...');
log('info', `解析扩展名: ${['.js', '.vue', '.json'].join(', ')}`);

// 输出别名配置
log('info', '路径别名配置:');
Object.keys(alias).forEach(key => {
  console.log(`\x1b[90m       ${key} → ${alias[key]}\x1b[0m`);
});

// 判断是否是生产模式
const isProd = config.mode === 'production';

/**
 * Webpack构建配置
 * 合并基础配置和开发/生产环境特定配置
 *
 * 功能:
 * - 配置模块解析规则和别名
 * - 设置JavaScript和Vue文件的loader
 * - 添加构建进度条和必要插件
 */
const webpackConfig = merge(config, {
  // 模块解析配置
  resolve: {
    // 自动解析的文件扩展名（减少扩展名数量可加速解析）
    extensions: ['.js', '.vue', '.json'],
    // 路径别名配置，简化导入路径
    alias: alias,
    // 指定模块查找目录，减少查找范围
    modules: [
      path.resolve(__dirname, '../src'),
      path.resolve(__dirname, '../packages'),
      'node_modules'
    ],
    // 优化 symlinks 解析
    symlinks: false
  },

  // 模块处理规则
  module: {
    // 不解析的模块（已经打包好的库）
    noParse: /^(vue|vue-router|vuex|lodash)$/,
    rules: [
      {
        // JavaScript文件处理
        test: /\.js$/,
        include: [
          path.resolve(__dirname, '../src'),
          path.resolve(__dirname, '../packages')
        ],
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            // 启用缓存以提升构建性能
            cacheDirectory: true,
            // 缓存压缩，减小缓存文件体积
            cacheCompression: false
          }
        }
      },
      {
        // Vue单文件组件处理
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          // 移除模板中的空白字符以减小体积
          compilerOptions: {
            whitespace: 'condense'
          },
          // 启用缓存
          cacheDirectory: path.resolve(__dirname, '../node_modules/.cache/vue-loader'),
          cacheIdentifier: 'vue-loader-cache'
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
      format: `  \x1b[36m构建进度\x1b[0m [:bar] \x1b[32m:percent\x1b[0m (:elapsed秒)`,
      complete: '█',
      incomplete: '░',
      clear: false,
      width: 40,
      callback: () => {
        log('success', 'Webpack 编译阶段完成');
      }
    }),

    // Loader选项插件，用于设置全局loader选项
    new webpack.LoaderOptionsPlugin({
      minimize: isProd,
      debug: !isProd
    }),

    // 忽略 moment 的 locale 文件（如果项目中使用了 moment）
    new webpack.IgnorePlugin({
      resourceRegExp: /^\.\/locale$/,
      contextRegExp: /moment$/
    })
  ],

  // 性能配置
  performance: {
    // 关闭性能提示，避免构建时的警告
    hints: false,
    // 资源大小限制
    maxAssetSize: 500000,
    maxEntrypointSize: 500000
  },

  // 缓存配置 (Webpack 4 兼容)
  cache: true,

  // 统计信息配置
  stats: {
    colors: true,
    hash: true,
    version: true,
    timings: true,
    assets: true,
    assetsSort: 'size',
    chunks: false,
    chunkModules: false,
    modules: false,
    children: false,
    cached: false,
    reasons: false,
    source: false,
    errorDetails: true,
    chunkOrigins: false,
    builtAt: true
  }
});

// 输出配置信息
log('info', 'Loader 规则配置:');
console.log(`\x1b[90m       *.js  → babel-loader (缓存启用, 压缩缓存禁用)\x1b[0m`);
console.log(`\x1b[90m       *.vue → vue-loader (缓存启用)\x1b[0m`);

log('perf', '性能优化配置:');
console.log(`\x1b[90m       ├─ noParse: vue, vue-router, vuex, lodash\x1b[0m`);
console.log(`\x1b[90m       ├─ 限定 include 目录: src, packages\x1b[0m`);
console.log(`\x1b[90m       ├─ 缓存: babel-loader, vue-loader\x1b[0m`);
console.log(`\x1b[90m       └─ IgnorePlugin: moment/locale\x1b[0m`);

log('success', 'Webpack 配置加载完成');
console.log('\x1b[90m' + '─'.repeat(50) + '\x1b[0m');

module.exports = webpackConfig;
