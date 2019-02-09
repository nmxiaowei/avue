const path = require('path');

const resolve = p => path.resolve(__dirname, '../', p);

const uiname = process.env.UINAME;
module.exports = {
  src: resolve('src'),
  core: resolve('src/core'),
  locale: resolve('src/locale'),
  global: resolve('src/global'),
  plugin: resolve('src/plugin'),
  components: resolve('packages/' + uiname),
  ui: resolve('src/ui/' + uiname),
  utils: resolve('src/utils'),
  mixins: resolve('packages/mixins'),
  packages: resolve('packages')
};
