import components from 'ui/index';
import { validatenull, asyncValidator } from 'utils/validate.js';
import { deepClone, dataURLtoFile, vaildData, findArray, setPx, sortArrys, isJson } from 'utils/util';
import permission from 'packages/core/directive/permission';
import clickout from 'packages/core/directive/clickout';
import dialogdrag from 'packages/core/directive/dialogdrag';
import _export from 'plugin/export/';
import { watermark } from 'plugin/canvas/';
import './utils/es6.js';
import $Log from 'plugin/logs/';
import locale from './locale/';
import $Clipboard from 'plugin/clipboard/';
import $NProgress from 'plugin/nprogress/';
import $ImagePreview from 'components/image-preview/';
let prototypes = {
  $Clipboard,
  $Log,
  $NProgress
};
const install = function(Vue, opts = {}) {
  Vue.use(_export);
  // 初始化指令
  permission(Vue);
  clickout(Vue);
  dialogdrag(Vue);
  components.map(component => {
    Vue.component(component.name, component);
  });
  Object.keys(prototypes).forEach((key) => {
    Vue.prototype[key] = prototypes[key];
  });
  // 国际化
  locale.use(opts.locale);
  locale.i18n(opts.i18n);
  Vue.prototype.$ImagePreview = $ImagePreview(Vue);
  Vue.prototype.$httpajax = window.axios;
  Vue.prototype.deepClone = deepClone;
  Vue.prototype.dataURLtoFile = dataURLtoFile;
  Vue.prototype.isJson = isJson;
  Vue.prototype.setPx = setPx;
  Vue.prototype.vaildData = vaildData;
  Vue.prototype.sortArrys = sortArrys;
  Vue.prototype.findArray = findArray;
  Vue.prototype.validatenull = validatenull;
  Vue.prototype.watermark = watermark;
  Vue.prototype.asyncValidator = asyncValidator;
  Vue.prototype.$AVUE = {
    size: opts.size || 'medium',
    menuType: opts.menuType || 'text',
    canvas: Object.assign({
      text: 'avue.top',
      fontFamily: 'microsoft yahei',
      color: '#999',
      fontSize: 16,
      opacity: 100,
      bottom: 10,
      right: 10,
      ratio: 1
    }, opts.canvas),
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
      stsToken: '',
      accessKeyId: '',
      accessKeySecret: '',
      bucket: ''
    }, (opts.ali || {}))
  };
};

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

const Avue = {
  version: '1.0.8',
  locale: locale.locale,
  install
};

module.exports = Avue;
module.exports.default = module.exports;
