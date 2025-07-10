const path = require('path');
const aliases = require('./alias');
const webpack = require('webpack');
const version = process.env.VERSION || require('../package.json').version;
const prd = process.env.TARGET;
const banner =
  ' Avue.js v' +
  version +
  '\n' +
  ' (c) 2017-' +
  new Date().getFullYear() +
  ' Smallwei\n' +
  ' Released under the MIT License.\n';

// 外部依赖配置
const externals = {
  vue: {
    root: 'Vue',
    commonjs2: 'vue',
    commonjs: 'vue',
    amd: 'vue'
  },
  'element-plus': {
    root: 'ElementPlus',
    commonjs2: 'element-plus',
    commonjs: 'element-plus',
    amd: 'element-plus'
  },
  'axios': 'axios'
};

/**
 * 解析路径
 * @param {string} p - 路径字符串
 * @returns {string} 解析后的绝对路径
 */
const resolve = p => {
  const base = p.split('/')[0];
  if (aliases[base]) {
    return path.resolve(aliases[base], p.slice(base.length + 1));
  } else {
    return path.resolve(__dirname, '../', p);
  }
};

// 构建配置
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

/**
 * 生成webpack配置
 * @param {string} name - 构建名称 (dev|prod)
 * @returns {object} webpack配置对象
 */
function genConfig(name) {
  const opts = builds[name];
  const config = {
    entry: {
      app: [opts.entry]
    },
    output: {
      filename: opts.filename,
      path: opts.dest,
      libraryExport: 'default',
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
        __UINAME__: JSON.stringify(process.env.UINAME || 'element-plus')
      })
    );
  }

  const isProd = /min\.js$/.test(opts.filename);
  config.mode = isProd ? 'production' : 'development';

  return config;
}

// 输出构建信息和配置提示
if (prd === 'dev') {
  console.log('\x1b[42;30m 开发模式 \x1b[40;32m 启用实时编译，生成调试版本供开发调试使用\x1b[0m');
  console.log('\x1b[36m📁 输出目录: lib/avue.js\x1b[0m');
  console.log('\x1b[36m🔧 编译模式: development\x1b[0m');
  console.log('\x1b[90m   💡 提示: 可运行 examples 目录下的示例进行调试\x1b[0m');
} else if (prd === 'prod') {
  console.log('\x1b[42;30m 生产模式 \x1b[40;32m 生成压缩优化的生产版本\x1b[0m');
  console.log('\x1b[36m📦 输出目录: lib/avue.min.js\x1b[0m');
  console.log('\x1b[36m🚀 编译模式: production\x1b[0m');
  console.log('\x1b[90m   ⚡ 特性: 代码压缩、性能优化、体积最小化\x1b[0m');
} else {
  console.log('\x1b[43;30m 注意 \x1b[40;33m 未指定构建目标，将使用默认的生产模式\x1b[0m');
  console.log('\x1b[36m💡 正确用法: npm run build:dev 或 npm run build:prod\x1b[0m');
  console.log('\x1b[36m   环境变量: TARGET=dev 或 TARGET=prod\x1b[0m');
}

console.log(`\x1b[32m✨ Avue.js v${version} 构建配置初始化完成\x1b[0m`);
console.log('\x1b[90m' + '─'.repeat(50) + '\x1b[0m');

module.exports = genConfig(prd || 'prod');
