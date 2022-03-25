
import components from './ui/index';
import { version } from './version'
import axios from 'axios';
import { validatenull } from 'utils/validate.js';
import { randomId, deepClone, dataURLtoFile, findObject, validData, findArray, setPx, sortArrys, isJson, downFile, loadScript } from 'utils/util';
import $Export from 'plugin/export/';
import { watermark } from 'plugin/canvas/';
import $Log from 'plugin/logs/';
import locale from './locale/';
import $Screenshot from 'plugin/screenshot/';
import $Clipboard from 'plugin/clipboard/';
import $Print from 'plugin/print/';
import $ImagePreview from 'packages/core/components/image-preview/';
import createIcon from './icon';
import ElementPlus from 'element-plus';
let plugins = {
  $ImagePreview,
  $Export,
  $Print,
  $Clipboard,
  $Log,
  $Screenshot,
  deepClone,
  dataURLtoFile,
  isJson,
  setPx,
  validData,
  sortArrys,
  findArray,
  validatenull,
  downFile,
  loadScript,
  watermark,
  findObject,
  randomId

};
let directive = {}
const install = function (Vue, opts = {}) {
  if (!ElementPlus) {
    packages.logs('element-plus');
    return
  }
  const defaultOption = {
    size: opts.size || 'default',
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
  Vue.config.globalProperties.$AVUE = Object.assign(opts, defaultOption);
  components.forEach(component => {
    Vue.component(component.name, component);
  });
  createIcon(Vue);
  Object.keys(plugins).forEach((key) => {
    Vue.config.globalProperties[key] = plugins[key];
  });
  Object.keys(directive).forEach((key) => {
    Vue.directive(key, directive[key]);
  });
  // 国际化
  locale.use(opts.locale);
  locale.i18n(opts.i18n);
  Vue.config.globalProperties.$axios = opts.axios || window.axios || axios;
  window.axios = Vue.config.globalProperties.$axios;
};
export default {
  version,
  locale: locale.locale,
  install
}
