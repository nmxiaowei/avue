const path = require('path');
const aliases = require('./alias');
const webpack = require('webpack');
const version = process.env.VERSION || require('../package.json').version;

const banner =
  '/*!\n' +
  ' * Avue.js v' +
  version +
  '\n' +
  ' * (c) 2017-' +
  new Date().getFullYear() +
  ' Smallwei\n' +
  ' * Released under the MIT License.\n' +
  ' */';

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
    externals: ['vue', 'axios', 'element-ui', 'mockjs', 'xlsx', 'file-saver']
  },
  dev: {
    entry: resolve('src/index.js'),
    dest: resolve('lib'),
    filename: 'avue.js',
    env: 'development',
    externals: ['vue', 'axios', 'element-ui', 'mockjs', 'xlsx', 'file-saver']
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
      libraryTarget: 'umd',
      library: opts.library || 'Avue'
    },
    externals: opts.externals,
    plugins: []
  };
  if (opts.env) {
    config.plugins.push(
      new webpack.DefinePlugin({
        __ENV__: JSON.stringify(opts.env || 'production')
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
        output: {
          comments: false
        },
        sourceMap: false
      })
    );
  }
  return config;
}

module.exports = genConfig(process.env.TARGET || 'prod');
