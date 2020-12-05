import components from 'ui/index';
import config from 'ui/config';
import { validatenull, asyncValidator } from 'utils/validate.js';
import { deepClone, dataURLtoFile, findObject, vaildData, findArray, setPx, sortArrys, isJson, downFile, loadScript } from 'utils/util';
import dialogDrag from 'packages/core/directive/dialog-drag';
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
import $Group from 'packages/core/components/group/';

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
  downFile,
  loadScript,
  watermark,
  asyncValidator,
  findObject

};
const install = function (Vue, opts = {}) {
  Vue.use(_export);
  // 初始化指令
  Vue.directive('dialogdrag', dialogDrag);
  Object.keys(components).map(ele => {
    let component = components[ele];
    let name = component.name || '';
    name = name.substr(name.length - 1, 1) === '-' ? (name.substr(0, name.length - 1)) + ele : name;
    Vue.component(name, component);
  });
  Object.keys(prototypes).forEach((key) => {
    Vue.prototype[key] = prototypes[key];
  });
  // 国际化
  locale.use(opts.locale);
  locale.i18n(opts.i18n);
  Vue.prototype.$axios = opts.axios || window.axios;
  Vue.prototype.$typeList = {
    img: /\.(gif|jpg|jpeg|png|GIF|JPG|PNG)/,
    video: /\.(swf|avi|flv|mpg|rm|mov|wav|asf|3gp|mkv|rmvb|ogg|mp4)/
  };
  Vue.component($Group.name, $Group);
  Vue.prototype.$ImagePreview = $ImagePreview(Vue);
  if (opts.theme === 'dark') {
    document.documentElement.className = 'avue-theme--dark';
  }
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
  Vue.prototype.$AVUE = {
    ui: (() => {
      Vue.prototype[config.is] = true;
      return config
    })(),
    size: opts.size || 'small',
    calcHeight: opts.calcHeight || 0,
    tableSize: opts.tableSize,
    formSize: opts.formSize,
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
  };
};

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

const Avue = Object.assign({
  version: '2.6.11',
  locale: locale.locale,
  install
}, components);

module.exports = Avue;
module.exports.default = module.exports;
