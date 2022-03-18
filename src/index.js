import components from './ui/index'
import { version } from './version';
import axios from 'axios'
import { validatenull } from 'utils/validate.js';
import { randomId, deepClone, dataURLtoFile, findObject, vaildData, findArray, setPx, sortArrys, isJson, downFile, loadScript } from 'utils/util';
import dialogDrag from 'packages/core/directive/dialog-drag';
import $Export from 'plugin/export/';
import { watermark } from 'plugin/canvas/';
import $Log from 'plugin/logs/';
import locale from './locale/';
import $Screenshot from 'plugin/screenshot/';
import $Clipboard from 'plugin/clipboard/';
import $Print from 'plugin/print/';
import $NProgress from 'plugin/nprogress/';
import $ImagePreview from 'packages/core/components/image-preview/';
import $DialogForm from 'packages/core/components/dialog-form/';
import packages from 'core/packages';
import Element from 'element-ui';

let prototypes = {
  $ImagePreview,
  $DialogForm,
  $Export,
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
  downFile,
  loadScript,
  watermark,
  findObject,
  randomId

};
let directive = {
  dialogDrag
}
const install = function (Vue, opts = {}) {
  if (!Element) {
    packages.logs('element-ui');
    return
  }
  if (opts.theme === 'dark') document.documentElement.className = 'avue-theme--dark';
  const defaultOption = {
    size: opts.size || 'small',
    calcHeight: opts.calcHeight || 0,
    menuType: opts.menuType || 'text',
    canvas: Object.assign({
      text: 'avuejs.com',
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
  }
  Vue.prototype.$AVUE = Object.assign(opts, defaultOption);
  components.forEach(component => {
    Vue.component(component.name, component);
  });
  Object.keys(prototypes).forEach((key) => {
    Vue.prototype[key] = prototypes[key];
  });
  Object.keys(directive).forEach((key) => {
    Vue.directive(key, directive[key]);
  });
  locale.use(opts.locale);
  locale.i18n(opts.i18n);
  Vue.prototype.$axios = opts.axios || window.axios || axios;
  window.axios = Vue.prototype.$axios;
  Vue.prototype.$uploadFun = function (column = {}, safe) {
    safe = safe || this;
    let list = ['uploadPreview', 'uploadBefore', 'uploadAfter', 'uploadDelete', 'uploadError', 'uploadExceed'];
    let result = {};
    if (column.type === 'upload') {
      list.forEach(ele => {
        if (!column[ele]) {
          result[ele] = safe[ele];
        }
      });
    } else {
      list.forEach(ele => {
        result[ele] = safe[ele];
      });
    }
    return result;
  };
};

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

const Avue = Object.assign({
  version: version,
  locale: locale.locale,
  install
}, components);

export default Avue;
