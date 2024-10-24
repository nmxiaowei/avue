import {
  validatenull
} from './validate';
import {
  DIC_PROPS,
  CHILDREN_LIST
} from 'global/variable';
import {
  typeList
} from 'global/variable';
import _get from 'lodash/get';
import _set from 'lodash/set';
import _cloneDeep from 'lodash/cloneDeep';
export const isMediaType = (url, type) => {
  if (validatenull(url)) return null;
  if (typeList.audio.test(url) || typeList.audio.test(type) || type == 'audio') {
    return 'audio';
  } else if (typeList.video.test(url) || typeList.video.test(type) || type == 'video') {
    return 'video';
  } else if (typeList.img.test(url) || typeList.img.test(type) || type == 'img') {
    return 'img';
  }
  return null;
};
export const uuid = () => {
  var s = [];
  var hexDigits = '0123456789abcdef';
  for (var i = 0; i < 36; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
  }
  s[14] = '4'; // bits 12-15 of the time_hi_and_version field to 0010
  s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
  s[8] = s[13] = s[18] = s[23] = '-';

  var uuid = s.join('');
  return uuid;
};
export function getFixed (val = 0, len = 2) {
  return Number(val.toFixed(len));
}
export function getAsVal (obj, bind = '') {
  let result = deepClone(obj);
  if (validatenull(bind)) return result;
  return _get(obj, bind);
}

export function setAsVal (obj, bind = '', value) {
  _set(obj, bind, value);
  return obj;
}
export const loadScript = (type = 'js', url, dom = 'body') => {
  let flag = false;
  return new Promise((resolve) => {
    const head = dom == 'head' ? document.getElementsByTagName('head')[0] : document.body;
    for (let i = 0; i < head.children.length; i++) {
      let ele = head.children[i];
      if ((ele.src || '').indexOf(url) !== -1) {
        flag = true;
        resolve();
      }
    }
    if (flag) return;
    let script;
    if (type === 'js') {
      script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = url;
    } else if (type === 'css') {
      script = document.createElement('link');
      script.rel = 'stylesheet';
      script.type = 'text/css';
      script.href = url;
    }
    head.appendChild(script);
    script.onload = function () {
      resolve();
    };
  });
};
export function downFile (url, saveName) {
  if (typeof url === 'object' && url instanceof Blob) {
    url = URL.createObjectURL(url); // 创建blob地址
  }
  var aLink = document.createElement('a');
  aLink.href = url;
  aLink.download = saveName || ''; // HTML5新增的属性，指定保存文件名，可以不要后缀，注意，file:///模式下不会生效
  var event;
  if (window.MouseEvent) {
    event = new MouseEvent('click');
  } else {
    event = document.createEvent('MouseEvents');
    event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false,
      false, false, false, 0, null);
  }
  aLink.dispatchEvent(event);
}
export function extend () {
  var target = arguments[0] || {};
  var deep = false;
  var arr = Array.prototype.slice.call(arguments);
  var i = 1;
  var options, src, key, copy;
  var isArray = false;
  if (typeof target === 'boolean') {
    deep = target;
    i++;
    target = arguments[1];
  }
  for (; i < arr.length; i++) { // 循环传入的对象数组
    if ((options = arr[i]) != null) { // 如果当前值不是null，如果是null不做处理
      for (key in options) { // for in循环对象中key
        copy = options[key];
        src = target[key];
        // 如果对象中value值任然是一个引用类型
        if (deep && (toString.call(copy) === '[object Object]' || (isArray = toString.call(copy) == '[object Array]'))) {
          if (isArray) { // 如果引用类型是数组
            // 如果目标对象target存在当前key，且数据类型是数组，那就还原此值，如果不是就定义成一个空数组;
            src = toString.call(src) === '[object Array]' ? src : [];
          } else {
            // 如果目标对象target存在当前key，且数据类型是对象，那就还原此值，如果不是就定义成一个空对象;
            src = toString.call(src) === '[object Object]' ? src : {};
          }
          // 引用类型就再次调用extend，递归，直到此时copy是一个基本类型的值。
          target[key] = extend(deep, src, copy);
        } else if (copy !== undefined && copy !== src) { // 如果这个值是基本值类型，且不是undefined
          target[key] = copy;
        }
      }
    }
  }
  return target;
}
export function createObj (obj, bind) {
  let list = bind.split('.');
  let first = list.splice(0, 1)[0];
  let deep = {};
  deep[first] = {};
  if (list.length >= 2) {
    let start = '{';
    let end = '}';
    let result = '';
    list.forEach(ele => {
      result = `${result}${start}"${ele}":`;
    });
    result = `${result}""`;
    for (let i = 0; i < list.length; i++) {
      result = `${result}${end}`;
    }
    result = JSON.parse(result);
    deep[first] = result;
  }
  obj = extend(true, obj, deep);
  return obj;
}
export function dataURLtoFile (dataurl, filename) {
  let arr = dataurl.split(',');
  let mime = arr[0].match(/:(.*?);/)[1];
  let bstr = atob(arr[1]);
  let n = bstr.length;
  let u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, {
    type: mime
  });
}

export function findObject (list = [], value, prop = 'prop') {
  let result;
  result = findNode(list, {
    value: prop
  }, value);
  if (!result) {
    list.forEach(ele => {
      if (ele.column) {
        if (!result) {
          result = findNode(ele.column, {
            value: prop
          }, value);
        }
      } else if (ele.children && CHILDREN_LIST.includes(ele.type)) {
        if (!result) {
          result = findNode(ele.children.column, {
            value: prop
          }, value);
        }
      }
    });
  }
  return result;
}
/**
 * 生成随机数
 */
export function randomId () {
  let $chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  let maxPos = $chars.length;
  let id = '';
  for (let i = 0; i < 16; i++) {
    id += $chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return id;
}
export const getObjType = obj => {
  var toString = Object.prototype.toString;
  var map = {
    '[object Boolean]': 'boolean',
    '[object Number]': 'number',
    '[object String]': 'string',
    '[object Function]': 'function',
    '[object Array]': 'array',
    '[object Date]': 'date',
    '[object RegExp]': 'regExp',
    '[object Undefined]': 'undefined',
    '[object Null]': 'null',
    '[object Object]': 'object'
  };
  if (obj instanceof Element) {
    return 'element';
  }
  return map[toString.call(obj)];
};
/**
 *判断是否为json对象
 */

export const isJson = str => {
  if (Array.isArray(str)) {
    if (str[0] instanceof Object) {
      return true;
    } else {
      return false;
    }
  } else if (str instanceof Object) {
    return true;
  }
  return false;
};
/**
 * 对象深拷贝
 */
export const deepClone = data => {
  return _cloneDeep(data);
};

export const getColumn = (column) => {
  let columnList = [];
  if (Array.isArray(column)) {
    columnList = column;
  } else {
    for (let o in column) {
      let columnMerge = {
        ...column[o],
        ...{
          prop: o
        }
      };
      columnList.push(columnMerge);
    }
  }
  return columnList;
};

/**
 * 设置px像素
 */
export const setPx = (val, defval = '') => {
  if (validatenull(val)) val = defval;
  if (validatenull(val)) return '';
  val = val + '';
  if (val.indexOf('%') === -1) {
    val = val + 'px';
  }
  return val;
};

/**
 * 字符串数据类型转化
 */
export const detailDataType = (value, type) => {
  if (validatenull(value)) return value;
  if (type === 'number') {
    return Number(value);
  } else if (type === 'string') {
    return value + '';
  } else {
    return value;
  }
};

/**
 * 根据字典的value显示label
 */

export const getDicValue = (list, value, props = {}) => {
  if (validatenull(list)) return value;
  let isArray = Array.isArray(value);
  value = isArray ? value : [value];
  let result = [];
  let labelKey = props[DIC_PROPS.label] || DIC_PROPS.label;
  let groupsKey = props[DIC_PROPS.groups] || DIC_PROPS.groups;
  let dic = deepClone(list);
  dic.forEach(ele => {
    if (ele[groupsKey]) {
      dic = dic.concat(ele[groupsKey]);
      delete ele[groupsKey];
    }
  });
  value.forEach(val => {
    if (Array.isArray(val)) {
      let array_result = [];
      val.forEach(array_val => {
        let obj = findNode(dic, props, array_val) || {};
        array_result.push(obj[labelKey] || array_val);
      });
      result.push(array_result);
    } else {
      let obj = findNode(dic, props, val) || {};
      result.push(obj[labelKey] || val);
    }
  });
  if (isArray) {
    return result;
  } else {
    return result.join('');
  }
};
/**
 * 过滤字典翻译字段和空字段
 */
export const filterParams = (form, list = ['', '$'], deep = true) => {
  let data = deep ? deepClone(form) : form;
  for (let o in data) {
    if (list.includes('')) {
      if (validatenull(data[o])) delete data[o];
    }
    if (list.includes('$')) {
      if (o.indexOf('$') !== -1) delete data[o];
    }

  }
  return data;
};

/**
 * 根据值查找对应的序号
 */
export const findArray = (list = [], value, valueKey = DIC_PROPS.value, index = false) => {
  let node;
  if (index) {
    node = list.findIndex(ele => ele[valueKey] == value);
  } else {
    node = list.find(ele => ele[valueKey] == value);
  }
  return node;
};
export const findNode = (list = [], props = {}, value) => {
  let valueKey = props.value || DIC_PROPS.value;
  let childrenKey = props.children || DIC_PROPS.children;
  for (let i = 0; i < list.length; i++) {
    const ele = list[i];
    if (ele[valueKey] == value) {
      if (value === 0 || ele[valueKey] === 0) {
        if (ele[valueKey] === value) {
          return ele;
        }
      } else {
        return ele;
      }
    } else if (ele[childrenKey] && Array.isArray(ele[childrenKey])) {
      let node = findNode(ele[childrenKey], props, value);
      if (node) return node;
    }
  }
};
/**
 * 根据位数获取*密码程度
 */
export const getPasswordChar = (result = '', char) => {
  let len = result.toString().length;
  result = '';
  for (let i = 0; i < len; i++) {
    result = result + char;
  }
  return result;
};

export const arraySort = (list = [], prop, callback) => {
  return list.filter(ele => !validatenull(ele[prop])).sort((a, b) => callback(a, b)).concat(list.filter(ele => validatenull(ele[prop])));
};
export const blankVal = (value) => {
  if (validatenull(value)) return value;
  let type = getObjType(value);
  if (type === 'array') value = [];
  else if (type === 'object') value = {};
  else if (['number', 'boolean'].includes(type)) value = undefined;
  else value = '';
  return value;
};
export const clearVal = (obj, propList, list = []) => {
  if (!obj) return {};
  propList.forEach(ele => {
    if (list.includes(ele)) return;
    else if (ele.includes('$')) delete obj[ele];
    else if (!validatenull(obj[ele])) {
      obj[ele] = blankVal(obj[ele]);
    }
  });
  return obj;
};
/**
 * 验证是否存在true/false
 */
export const vaildData = (val, dafult) => {
  if (typeof val === 'boolean') {
    return val;
  }
  return !validatenull(val) ? val : dafult;
};
