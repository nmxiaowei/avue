import components from 'ui/index';
import { validatenull, asyncValidator } from 'utils/validate.js';
import { deepClone, vaildData, findArray } from 'utils/util';
import _export from 'plugin/export/';
import _logs from 'plugin/logs/';
const install = function (Vue, opts = {}) {
  Vue.use(_logs);
  Vue.use(_export);
  components.map(component => {
    Vue.component(component.name, component);
  });
  Vue.prototype.$httpajax = window.axios;
  Vue.prototype.deepClone = deepClone;
  Vue.prototype.vaildData = vaildData;
  Vue.prototype.findArray = findArray;
  Vue.prototype.validatenull = validatenull;
  Vue.prototype.asyncValidator = asyncValidator;
  Vue.prototype.$AVUE = {
    size: opts.size || 'medium',
    menuType: opts.menuType || 'text'
  };
}

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

const Avue = {
  version: '1.0.5',
  install
}
module.exports = Avue
module.exports.default = module.exports;
