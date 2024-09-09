const path = require('path');
const resolve = p => path.resolve(__dirname, './', p);
const { defineConfig } = require('@vue/cli-service');
module.exports = defineConfig({
  transpileDependencies: true,
  chainWebpack: (config) => {
    config.plugin('define').tap((definitions) => {
      Object.assign(definitions[0], {
        __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: 'true'
      });
      return definitions;
    });
  },
  configureWebpack: {
    resolve: {
      alias: {
        src: resolve('src'),
        core: resolve('src/core'),
        locale: resolve('src/locale'),
        global: resolve('src/global'),
        plugin: resolve('src/plugin'),
        utils: resolve('src/utils'),
        mixins: resolve('packages/mixins'),
        common: resolve('packages/core'),
        packages: resolve('packages')
      }
    }
  }
});
