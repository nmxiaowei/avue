import components from './components/';
import { validatenull } from 'utils/validate.js';
import { deepClone } from 'utils/util';
function install(Vue, opts = {}) {
  components.map(component => {
    Vue.component(component.name, component);
  });
  Vue.prototype.deepClone = deepClone;
  Vue.prototype.validatenull = validatenull;
  Vue.prototype.$AVUE = {
    size: opts.size || 'medium',
    menuType: opts.menuType || 'button'
  };
}

if (window.Vue) {
  install(window.Vue);
}

export default install;
