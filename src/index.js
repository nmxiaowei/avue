import components from 'ui/index';
import { validatenull, asyncValidator } from 'utils/validate.js';
import { deepClone, vaildData } from 'utils/util';
import axios from 'axios';
import _export from 'plugin/export/';
import _logs from 'plugin/logs/';
function install(Vue, opts = {}) {
  Vue.use(_logs);
  Vue.use(_export);
  components.map(component => {
    Vue.component(component.name, component);
  });
  Vue.prototype.$http = axios;
  Vue.prototype.deepClone = deepClone;
  Vue.prototype.vaildData = vaildData;
  Vue.prototype.validatenull = validatenull;
  Vue.prototype.asyncValidator = asyncValidator;
  Vue.prototype.$AVUE = {
    size: opts.size || 'medium',
    menuType: opts.menuType || 'text'
  };
}

if (window.Vue) {
  install(window.Vue);
}

export default install;
