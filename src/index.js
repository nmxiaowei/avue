import components from 'ui/index';
import { validatenull, asyncValidator } from 'utils/validate.js';
import { deepClone, dataURLtoFile, findObject, vaildData, findArray, setPx, sortArrys, isJson } from 'utils/util';
import permission from 'packages/core/directive/permission';
import dialogdrag from 'packages/core/directive/dialogdrag';
import _export from 'plugin/export/';
import { watermark } from 'plugin/canvas/';
import './utils/es6.js';
import $Log from 'plugin/logs/';
import locale from './locale/';
import $Screenshot from 'plugin/screenshot/';
import $Clipboard from 'plugin/clipboard/';
import $Print from 'plugin/print/';
import $NProgress from 'plugin/nprogress/';
import $ImagePreview from 'packages/core/components/image-preview/';

let prototypes = {
  $Print,
  $Clipboard,
  $Log,
  $NProgress,
  $Screenshot,
  deepClone,
  dataURLtoFile,
  isJson,
  setPx,
  vaildData,
  sortArrys,
  findArray,
  validatenull,
  watermark,
  asyncValidator,
  findObject

};
const install = function(Vue, opts = {}) {
  Vue.use(_export);
  // 初始化指令
  permission(Vue);
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
  Vue.prototype.$httpajax = window.axios;
  Vue.prototype.$ImagePreview = $ImagePreview(Vue);

  Vue.prototype.$AVUE = {
    ui: (() => {
      if (window.antd) {
        Vue.prototype.moment = window.moment;
        return {
          name: 'antd',
          type: 'a'
        };
      } else if (window.Element) {
        return {
          name: 'element-ui',
          type: 'el'
        };
      }
    })(),
    size: opts.size || 'small',
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
      bucket: 'https://upload.qiniup.com',
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
  version: '2.1.0',
  locale: locale.locale,
  install
};

module.exports = Avue;
module.exports.default = module.exports;
