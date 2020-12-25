import { validatenull } from './validate';
import { DIC_PROPS, DIC_SHOW_SPLIT } from 'global/variable';
const hasOwnProperty = Object.prototype.hasOwnProperty;

export function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key);
};
export function getFixed (val = 0, len = 2) {
  return Number(val.toFixed(len));
}
export function getAsVal (obj, bind = '') {
  let result = deepClone(obj);
  bind.split('.').forEach(ele => {
    if (!validatenull(ele)) {
      result = result[ele];
    }
  });
  return result;
}
export const loadScript = (type = 'js', url) => {
  let flag = false;
  return new Promise((resolve) => {
    const head = document.getElementsByTagName('head')[0];
    head.children.forEach(ele => {
      if ((ele.src || '').indexOf(url) !== -1) {
        flag = true;
        resolve();
      }
    });
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
export function downFile (data, name) {
  var saveLink = document.createElementNS('http://www.w3.org/1999/xhtml', 'a');
  saveLink.href = data;
  saveLink.download = name;
  var event = document.createEvent('MouseEvents');
  event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
  saveLink.dispatchEvent(event);
}
export function strCorNum (list) {
  list.forEach((ele, index) => {
    list[index] = Number(ele);
  });
  return list;
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
export function setAsVal (obj, bind = '', value = '') {
  eval('obj.' + bind + '="' + value + '"');
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

export function findObject (list, value, key = 'prop') {
  let result = -1;
  let type = (() => {
    let result;
    list.forEach(ele => {
      if (ele.column) {
        result = 'group';
      } else if (ele.children) {
        result = 'tree';
      }
    });
    return result;
  })();
  if (type === 'group') {
    list.forEach(ele => {
      const val = findArray(ele.column, value, key, true);
      if (val !== -1) result = val;
    });
  } else if (type === 'tree') {
    result = findLabelNode(list, value, { value: key }, true);
  } else {
    result = findArray(list, value, key, true);
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
  var type = getObjType(data);
  var obj;
  if (type === 'array') {
    obj = [];
  } else if (type === 'object') {
    obj = {};
  } else {
    // 不再具有下一层次
    return data;
  }
  if (type === 'array') {
    for (var i = 0, len = data.length; i < len; i++) {
      data[i] = (() => {
        if (data[i] === 0) {
          return data[i];
        }
        return data[i];
      })();
      if (data[i]) {
        delete data[i].$parent;
      }
      obj.push(deepClone(data[i]));
    }
  } else if (type === 'object') {
    for (var key in data) {
      if (data) {
        delete data.$parent;
      }
      obj[key] = deepClone(data[key]);
    }
  }
  return obj;
};
/**
 * 根据字段数组排序
 */
export const sortArrys = (list, prop) => {
  list.sort(function (a, b) {
    if (a[prop] > b[prop]) {
      return -1;
    }
    if (a[prop] < b[prop]) {
      return 1;
    }
    return 0;
  });
  return list;
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
  if (type === 'number') {
    return Number(value);
  } else if (type === 'string') {
    return value + '';
  } else {
    return value;
  }
};
// 获取url中的参数
export const getUrlParams = (url) => {
  let result = {
    url: '',
    params: {}
  };
  let list = url.split('?');
  result.url = list[0];
  let params = list[1];
  if (params) {
    let list = params.split('&');
    list.forEach(ele => {
      let dic = ele.split('=');
      let label = dic[0];
      let value = dic[1];
      result.params[label] = value;
    });
  }
  return result;
};

/**
 * 数组的数据类型转化
 */
export const detailDic = (list = [], props = {}, type) => {
  let valueKey = props.value || DIC_PROPS.value;
  let childrenKey = props.children || DIC_PROPS.children;
  list.forEach(ele => {
    ele[valueKey] = detailDataType(ele[valueKey], type);
    if (ele[childrenKey]) detailDic(ele[childrenKey], props, type);
  });
  return list;
};
/**
 * 根据字典的value显示label
 */

export const findByValue = (dic, value, props, isTree, column) => {
  // 如果为空直接返回
  if (validatenull(dic)) return value;
  let result = '';
  props = props || DIC_PROPS;
  if (value instanceof Array) {
    result = [];
    for (let i = 0; i < value.length; i++) {
      const dicvalue = value[i];
      if (isTree) {
        result.push(findLabelNode(dic, dicvalue, props) || dicvalue);
      } else {
        result.push(findArrayLabel(dic, dicvalue, props));
      }
    }
    result = result.join(DIC_SHOW_SPLIT).toString();

  } else if (['string', 'number', 'boolean'].includes(typeof value)) {
    result = findLabelNode(dic, value, props) || value;
  }
  return result;
};
/**
 * 过滤字典翻译字段和空字段
 */
export const filterDefaultParams = (form, translate = true) => {
  let data = deepClone(form);
  if (translate) return data;
  for (let o in data) {
    if (o.indexOf('$') !== -1 || validatenull(data[o])) {
      delete data[o];
    }
  }
  return data;
};
/**
 * 处理存在group分组的情况
 */
export const detailDicGroup = (dic) => {
  dic = deepClone(dic);
  let list = [];
  if ((dic[0] || {}).groups) {
    dic.forEach(ele => {
      if (ele.groups) {
        list = list.concat(ele.groups);
      }
    });
    return list;
  }
  return dic;
};
/**
 * 根据label去找到节点
 */
export const findLabelNode = (dic, value, props, obj) => {
  let result;
  if (!obj) dic = detailDicGroup(dic);
  let rev = (dic1, value1, props1) => {
    const labelKey = props1.label || DIC_PROPS.label;
    const valueKey = props1.value || DIC_PROPS.value;
    const childrenKey = props1.children || DIC_PROPS.children;
    for (let i = 0; i < dic1.length; i++) {
      const ele = dic1[i];
      const children = ele[childrenKey] || [];
      if (ele[valueKey] === value1) {
        result = obj ? ele : ele[labelKey];
      } else {
        rev(children, value1, props1);
      }
    }
  };
  rev(dic, value, props);
  return result;
};
/**
 * 获取多层data
 */
export const getDeepData = (res) => {
  return (Array.isArray(res) ? res : res.data) || [];
};
export const getObjValue = (data, params = '', type) => {
  const list = params.split('.');
  let result = data;
  if (list[0] === '' && type !== 'object') {
    return getDeepData(data);
  } else if (list[0] !== '') {
    list.forEach(ele => {
      result = result[ele];
    });
  }
  return result;
};
/**
 * 根据字典的value查找对应的index
 */
export const findArrayLabel = (dic, value, props) => {
  dic = detailDicGroup(dic);
  const valueKey = props.value || DIC_PROPS.value;
  const labelKey = props.label || DIC_PROPS.label;
  for (let i = 0; i < dic.length; i++) {
    if (dic[i][valueKey] === value) {
      return dic[i][labelKey];
    }
  }
  return value;
};
/**
 * 根据值查找对应的序号
 */
export const findArray = (dic, value, valueKey, obj) => {
  if (!obj) dic = detailDicGroup(dic);
  valueKey = valueKey || DIC_PROPS.value;
  for (let i = 0; i < dic.length; i++) {
    if (dic[i][valueKey] === value) {
      return obj ? dic[i] : i;
    }
  }
  return -1;
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

export const clearVal = (obj) => {
  if (!obj) return {};
  Object.keys(obj).forEach(ele => {
    if (Array.isArray(obj[ele])) {
      obj[ele] = [];
    } else if (obj[ele] !== null && typeof obj[ele] === 'object') {
      obj[ele] = {};
    } else if (['number', 'boolean'].includes(typeof obj[ele]) || undefined === obj[ele]) {
      obj[ele] = undefined;
    } else {
      obj[ele] = '';
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
