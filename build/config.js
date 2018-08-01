const path = require('path');
exports.alias = {
  packages: path.resolve(__dirname, '../packages'),
  avue: path.resolve(__dirname, '../')
};

exports.externals = {
  vue: {
    root: 'Vue',
    commonjs: 'vue',
    commonjs2: 'vue',
    amd: 'vue'
  },
  axios: {
    root: 'axios',
    commonjs: 'axios',
    commonjs2: 'axios',
    amd: 'axios'
  },
  'element-ui': {
    root: 'ELEMENT',
    commonjs: 'ELEMENT',
    commonjs2: 'ELEMENT',
    amd: 'ELEMENT'
  }
};

exports.jsexclude = /node_modules|utils\/popper\.js|utils\/date.\js/;
