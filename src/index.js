import components from 'ui/index';
import { validatenull, asyncValidator } from 'utils/validate.js';
import { deepClone } from 'utils/util';
import _logs from 'plugin/logs/';
function install(Vue, opts = {}) {

  Vue.use(_logs);
  components.map(component => {
    Vue.component(component.name, component);
  });
  Vue.prototype.deepClone = deepClone;
  Vue.prototype.validatenull = validatenull;
  Vue.prototype.asyncValidator = asyncValidator;
  Vue.prototype.$AVUE = {
    size: opts.size,
    menuType: opts.menuType || 'text'
  };
}

if (window.Vue) {
  install(window.Vue);
}

export default install;
