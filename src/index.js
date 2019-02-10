import components from 'ui/index';
import { validatenull, asyncValidator } from 'utils/validate.js';
import { deepClone, vaildData, findArray, setPx } from 'utils/util';
import directive from 'packages/core/directive/permission'
import _export from 'plugin/export/';
import $Log from 'plugin/logs/';
import locale from './locale/';
import $Clipboard from 'plugin/clipboard/';
import $ImagePreview from 'components/image-preview/';
let prototypes = {
  $Clipboard,
  $Log
}

const install = function (Vue, opts = {}) {
  Vue.use(_export);
  //初始化指令
  directive(Vue);
  components.map(component => {
    Vue.component(component.name, component);
  });
  Object.keys(prototypes).forEach((key) => {
    Vue.prototype[key] = prototypes[key];
  });
  //国际化
  locale.use(opts.locale);
  locale.i18n(opts.i18n);
  Vue.prototype.$ImagePreview = $ImagePreview(Vue);
  Vue.prototype.$httpajax = window.axios;
  Vue.prototype.deepClone = deepClone;
  Vue.prototype.setPx = setPx;
  Vue.prototype.vaildData = vaildData;
  Vue.prototype.findArray = findArray;
  Vue.prototype.validatenull = validatenull;
  Vue.prototype.asyncValidator = asyncValidator;
  Vue.prototype.$AVUE = {
    size: opts.size || 'medium',
    menuType: opts.menuType || 'text',
    qiniu: Object.assign({
      AK: '',
      SK: '',
      scope: '',
      url: '',
      deadline: 1
    }, (opts.qiniu || {})),
    ali: Object.assign({
      region: '',
      endpoint: '',
      accessKeyId: '',
      accessKeySecret: '',
      bucket: '',
    }, (opts.ali || {})),
  };
}

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

const Avue = {
  version: '1.0.5',
  locale: locale.locale,
  install
}
module.exports = Avue
module.exports.default = module.exports;
