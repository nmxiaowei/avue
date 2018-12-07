import util from './util';

export default {
  install(Vue, options) {
    // 快速打印 log
    Vue.prototype.$log = util;
  }
};
