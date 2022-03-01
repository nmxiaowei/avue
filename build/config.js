const path = require('path');
const { copyFolder } = require('./util');
const aliases = require('./alias');
const webpack = require('webpack');
const version = process.env.VERSION || require('../package.json').version;
const prd = process.env.TARGET
const banner =
  ' Avue.js v' +
  version +
  '\n' +
  ' (c) 2017-' +
  new Date().getFullYear() +
  ' Smallwei\n' +
  ' Released under the MIT License.\n';
const externals = {
  'vue': {
    root: 'Vue',
    commonjs2: 'vue',
    commonjs: 'vue',
    amd: 'vue'
  },
  'element-ui': {
    root: 'ELEMENT',
    commonjs2: 'element-ui',
    commonjs: 'element-ui',
    amd: 'element-ui'
  },
  'axios': 'axios'
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
  }
};
function genConfig (name) {
  const opts = builds[name];
  const config = {
    entry: {
      app: [opts.entry]
    },
    output: {
      filename: opts.filename,
      path: opts.dest,
      chunkFilename: '[id].js',
      libraryExport: "default",
      libraryTarget: 'umd',
      library: 'AVUE',
      umdNamedDefine: true,
      globalObject: 'this'
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
  config.mode = isProd ? 'production' : 'development';
  return config;
}

if (prd == 'dev') {
  console.log('\033[42;30m 提示 \033[40;32m 没有可视化界面，实时打包生成调试包avue.js到lib目录，运行examples目录下例子即可调试\033[0m')
} else if (prd == 'prod') {
  // copyFolder('../src/locale', '../lib/locale')
  console.log('\033[42;30m 提示 \033[40;32m 打包生成生产包avue.min.js到lib目录\033[0m')
}
module.exports = genConfig(prd || 'prod');
