import components from 'ui/index';
import { validatenull, asyncValidator } from 'utils/validate.js';
import { deepClone } from 'utils/util';
import _export from 'plugin/export/';
function install(Vue, opts = {}) {
  Vue.use(_export);
  components.map(component => {
    Vue.component(component.name, component);
  });
  Vue.prototype.deepClone = deepClone;
  Vue.prototype.validatenull = validatenull;
  Vue.prototype.asyncValidator = asyncValidator;
  Vue.prototype.$AVUE = {
    size: opts.size || 'small',
    menuType: opts.menuType || 'text'
  };
}

if (window.Vue) {
  install(window.Vue);
}

export default install;
