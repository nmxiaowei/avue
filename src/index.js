import components from './ui/index';
import {
  version
} from './version';
import axios from 'axios';
import {
  validatenull
} from 'utils/validate.js';
import {
  randomId,
  deepClone,
  dataURLtoFile,
  findObject,
  validData,
  findArray,
  findNode,
  setPx,
  isJson,
  downFile,
  loadScript
} from 'utils/util';
import contextmenu from 'packages/core/directive/contextmenu';
import $Export from 'plugin/export/';
import $Watermark from 'plugin/watermark/';
import $Log from 'plugin/logs/';
import locale from './locale/';
import $Screenshot from 'plugin/screenshot/';
import $Clipboard from 'plugin/clipboard/';
import $Print from 'plugin/print/';
import $ImagePreview from 'packages/core/components/image-preview/';
import $DialogForm from 'packages/core/components/dialog-form/';
import createIcon from './icon';
let plugins = {
  $DialogForm,
  $ImagePreview,
  $Export,
  $Print,
  $Clipboard,
  $Watermark,
  $Log,
  $Screenshot,
  deepClone,
  dataURLtoFile,
  isJson,
  setPx,
  validData,
  findArray,
  findNode,
  validatenull,
  downFile,
  loadScript,
  findObject,
  randomId

};
let directive = {
  contextmenu
};
const install = function (Vue, opts = {}) {
  const defaultOption = {
    size: opts.size || 'default',
    calcHeight: opts.calcHeight || 0,
    menuType: opts.menuType || 'text',
    formOption: opts.formOption || {},
    crudOption: opts.crudOption || {},
    appendToBody: validData(opts.appendToBody, true),
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
  Vue.config.globalProperties.$AVUE = Object.assign(opts, defaultOption);
  Object.keys(components).forEach(ele => {
    const component = components[ele];
    Vue.component(component.name, component);
  });
  createIcon(Vue);
  Object.keys(plugins).forEach((key) => {
    if (['$DialogForm', '$ImagePreview'].includes(key)) {
      Vue.config.globalProperties[key] = plugins[key](Vue);
    } else {
      Vue.config.globalProperties[key] = plugins[key];
    }

  });
  Object.keys(directive).forEach((key) => {
    Vue.directive(key, directive[key]);
  });
  // 国际化
  locale.use(opts.locale);
  locale.i18n(opts.i18n);
  Vue.config.globalProperties.$uploadFun = function (column = {}, safe) {
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
  Vue.config.globalProperties.$axios = opts.axios || axios;

};
export default {
  ...{
    version,
    locale,
    install
  },
  ...components,
  ...plugins
};
