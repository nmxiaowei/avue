const path = require('path');

const resolve = p => path.resolve(__dirname, '../', p);

const uiname = process.env.UINAME;
module.exports = {
  src: resolve('src'),
  core: resolve('src/core'),
  locale: resolve('src/locale'),
  global: resolve('src/global'),
  plugin: resolve('src/plugin'),
  utils: resolve('src/utils'),
  mixins: resolve('packages/mixins'),
  common: resolve('packages/core'),
  packages: resolve('packages')
};
