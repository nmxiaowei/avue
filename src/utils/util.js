import { validatenull } from './validate';

const hasOwnProperty = Object.prototype.hasOwnProperty;


export function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
};
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
      delete data[i].$parent;
      obj.push(deepClone(data[i]));
    }
  } else if (type === 'object') {
    for (var key in data) {
      delete data.$parent;
      obj[key] = deepClone(data[key]);
    }
  }
  return obj;
};
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
}

/**
 * 设置px
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
 * 根据字典的value显示label
 */
let result = '';
export const findByValue = (dic, value, props, first, isTree) => {
  props = props || {};
  const labelKey = props.label || 'label';
  const valueKey = props.value || 'value';
  const childrenKey = props.children || 'children';
  if (first) result = value;
  if (validatenull(dic)) return result;
  // 正常字典
  if (['string', 'number', 'boolean'].includes(typeof value)) {
    for (let i = 0; i < dic.length; i++) {
      if (dic[i][valueKey] === value) {
        result = dic[i][labelKey];
        break;
      } else {
        findByValue(dic[i][childrenKey], value, props, false, isTree);
      }
    }
  } else if (value instanceof Array) {
    let index = 0;
    let count = 0;
    result = [];
    while (count < value.length) {
      index = findArray(dic, value[count], valueKey);
      if (index !== -1) result.push(dic[index][labelKey]);
      else result.push(value[count]);
      if (isTree) dic = dic[index][childrenKey];
      count++;
    }
    result = result.join(',').toString();
  }
  return result;
};

export const getDeepData = (res) => {
  return (Array.isArray(res) ? res : res.data) || []
}
export const getObjValue = (data, params = '', type) => {
  const list = params.split('.');
  let result = data;
  if (list[0] === '' && type !== 'object') {
    return getDeepData(data);
  } else if (list[0] !== '') {
    list.forEach(ele => {
      result = result[ele]
    })
  }
  return result;
}
export const filterForm = (form) => {
  let obj = {};
  Object.keys(form).forEach(ele => {
    if (!validatenull(form[ele])) {
      obj[ele] = form[ele]
    }
  });
  return obj;
}
/**
 * 根据字典的value查找对应的index
 */

export const findArray = (dic, value, valueKey) => {
  valueKey = valueKey || 'value';
  for (let i = 0; i < dic.length; i++) {
    if (dic[i][valueKey] === value) {
      return i;
    }
  }
  return -1;
};

export const getPasswordChar = (result = '', char) => {
  let len = result.toString().length
  result = '';
  for (let i = 0; i < len; i++) {
    result = result + char;
  }
  return result;
};

export const vaildData = (val, dafult) => {
  if (typeof val === 'boolean') {
    return val;
  }
  return !validatenull(val) ? val : dafult;
};
