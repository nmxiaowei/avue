import { validatenull } from './validate';

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
      obj.push(deepClone(data[i]));
    }
  } else if (type === 'object') {
    for (var key in data) {
      obj[key] = deepClone(data[key]);
    }
  }
  return obj;
};

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
export const findByValue = (dic, value, props, first) => {
  props = props || {};
  const labelKey = props.label || 'label';
  const valueKey = props.value || 'value';
  const childrenKey = props.children || 'children';
  if (validatenull(first)) result = value;
  if (validatenull(dic)) return result;
  // 正常字典
  if (
    typeof value === 'string' ||
    typeof value === 'number' ||
    typeof value === 'boolean'
  ) {
    for (let i = 0; i < dic.length; i++) {
      if (dic[i][valueKey] === value) {
        result = dic[i][labelKey];
        break;
      } else {
        findByValue(dic[i][childrenKey], value, props, true);
      }
    }
    // 父子集字典
  } else if (value instanceof Array && dic[0][childrenKey]) {
    let index = 0;
    let count = 0;
    result = [];
    while (count < value.length) {
      index = findArray(dic, value[count], valueKey);
      if (index !== -1) {
        result.push(dic[index][labelKey]);
      } else {
        result.push(value[count]);
      }
      if (!validatenull(dic[index][childrenKey])) {
        dic = dic[index][childrenKey] || [];
      }
      count++;
    }
    result = result.join('/').toString();
    // 多选字典
  } else if (value instanceof Array) {
    let index = 0;
    let count = 0;
    result = [];
    while (count < value.length) {
      index = findArray(dic, value[count], valueKey);
      if (index !== -1) result.push(dic[index][labelKey]);
      else result.push(value[count]);
      count++;
    }
    result = result.join(',').toString();
  }
  return result;
};

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

export const getPasswordChar = (len, char) => {
  let result = '';
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
