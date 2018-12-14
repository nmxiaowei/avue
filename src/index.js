import components from 'ui/index';
import { validatenull, asyncValidator } from 'utils/validate.js';
import { deepClone } from 'utils/util';
import $log from 'plugin/logs/util';
import _export from 'plugin/export/';
import _logs from 'plugin/logs/';
function install(Vue, opts = {}) {
  if (!window.ELEMENT && __UINAME__ === 'element-ui') {
    $log.warning('需要引入UI框架包');
    $log.capsule(
      'element-ui',
      'https://cdnjs.cloudflare.com/ajax/libs/element-ui/2.4.11/index.js',
      'warning'
    );
    return;
  } else if (!window.vant && __UINAME__ === 'vant') {
    $log.warning('需要引入UI框架包');
    $log.capsule(
      'vant',
      'https://cdn.jsdelivr.net/npm/vant@1.4/lib/vant.min.js',
      'warning'
    );
    return;
  }
  Vue.use(_export);
  Vue.use(_logs);
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
