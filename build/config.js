const path = require('path');
const aliases = require('./alias');
const webpack = require('webpack');
const version = process.env.VERSION || require('../package.json').version;
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const banner =
  ' Avue.js v' +
  version +
  '\n' +
  ' (c) 2017-' +
  new Date().getFullYear() +
  ' Smallwei\n' +
  ' Released under the MIT License.\n';
const externals = {
  'vue': 'Vue',
  'vant': 'vant',
  'mockjs': 'Mock',
  'ant-design-vue': 'antd',
  'file-saver': 'file-saver',
  'xlsx': 'xlsx',
  'axios': 'axios',
  'element-ui': 'ELEMENT'
};
const resolve = p => {
  const base = p.split('/')[0];
  if (aliases[base]) {
    return path.resolve(aliases[base], p.slice(base.length + 1));
  } else {
    return path.resolve(__dirname, '../', p);
  }
};

const builds = {
  prod: {
    entry: resolve('src/index.js'),
    dest: resolve('lib'),
    filename: 'avue.min.js',
    env: 'production',
    externals: externals
  },
  dev: {
    entry: resolve('src/index.js'),
    dest: resolve('lib'),
    filename: 'avue.js',
    env: 'development',
    externals: externals
  },
  'prod-vant': {
    entry: resolve('src/index.js'),
    dest: resolve('lib'),
    filename: 'avue-mobile.min.js',
    env: 'production',
    externals: externals
  },
  'dev-vant': {
    entry: resolve('src/index.js'),
    dest: resolve('lib'),
    filename: 'avue-mobile.js',
    env: 'development',
    externals: externals
  },
  'prod-antd': {
    entry: resolve('src/index.js'),
    dest: resolve('lib'),
    filename: 'avue-antd.min.js',
    env: 'production',
    externals: externals
  },
  'dev-antd': {
    entry: resolve('src/index.js'),
    dest: resolve('lib'),
    filename: 'avue-antd.js',
    env: 'development',
    externals: externals
  }
};
function genConfig(name) {
  const opts = builds[name];
  const config = {
    entry: {
      app: [opts.entry]
    },
    output: {
      filename: opts.filename,
      path: opts.dest,
      chunkFilename: '[id].js',
      libraryTarget: 'umd',
      library: 'AVUE',
      umdNamedDefine: true
    },
    externals: opts.externals,
    plugins: [
      new webpack.BannerPlugin(banner)
    ]
  };
  if (opts.env) {
    config.plugins.push(
      new webpack.DefinePlugin({
        __ENV__: JSON.stringify(opts.env || 'production'),
        __UINAME__: JSON.stringify(process.env.UINAME || 'element-ui')
      })
    );
  }
  const isProd = /min\.js$/.test(opts.filename);
  if (isProd) {
    config.plugins.push(
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        },
        sourceMap: false
      })
    );
    // config.plugins.push(new BundleAnalyzerPlugin())
  }
  return config;
}

module.exports = genConfig(process.env.TARGET || 'prod');
