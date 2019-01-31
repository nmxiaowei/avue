import components from 'ui/index';
import { validatenull, asyncValidator } from 'utils/validate.js';
import { deepClone, vaildData, findArray, setPx } from 'utils/util';
import _export from 'plugin/export/';
import $Log from 'plugin/logs/';
import $Clipboard from 'plugin/clipboard/';
import $ImagePreview from 'components/image-preview/';
let prototypes = {
  $Clipboard,
  $Log
}

const install = function (Vue, opts = {}) {
  Vue.use(_export);
  components.map(component => {
    Vue.component(component.name, component);
  });
  Object.keys(prototypes).forEach((key) => {
    Vue.prototype[key] = prototypes[key];
  });
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
    qiniu: {
      AK: 'BLEIUCkTJhUKfb7Yl4wa2X-5B6uecKNxoCd93IlG',
      SK: '1_Falie5zL2BH7IBuZSZi1EJqm_5_G1-Gdjz-DS4',
      scope: 'test',
      url: 'http://pm7cc17lu.bkt.clouddn.com/',
      deadline: 1
    }
  };
}

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

const Avue = {
  version: '1.0.5',
  install
}
module.exports = Avue
module.exports.default = module.exports;
