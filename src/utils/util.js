import { validatenull } from './validate';
import { DIC_PROPS, DIC_SHOW_SPLIT } from 'global/variable';
import { typeList } from 'global/variable'
export const isMediaType = (url, type) => {
  if (typeList.audio.test(url) || type == 'audio') {
    return 'audio'
  } else if (typeList.video.test(url) || type == 'video') {
    return 'video'
  } else if (typeList.img.test(url) || type == 'img') {
    return 'img'
  }

}
export const uuid = () => {
  var s = [];
  var hexDigits = "0123456789abcdef";
  for (var i = 0; i < 36; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
  }
  s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
  s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
  s[8] = s[13] = s[18] = s[23] = "-";

  var uuid = s.join("");
  return uuid;
}
export function getFixed (val = 0, len = 2) {
  return Number(val.toFixed(len));
}
export function getAsVal (obj, bind = '') {
  let result = deepClone(obj);
  if (validatenull(bind)) return result;
  bind.split('.').forEach(ele => {
    result = !validatenull(result[ele]) ? result[ele] : '';
  });
  return result;
}

export function setAsVal (obj, bind = '', value) {
  let result;
  let type = getObjType(value)
  if (validatenull(value)) {
    if (type === 'array') {
      result = `obj.${bind}=[]`
    } else if (type === 'object') {
      result = `obj.${bind}={}`
    } else if (['number', 'boolean'].includes(type)) {
      result = `obj.${bind}=undefined`
    } else {
      result = `obj.${bind}=''`
    }
  } else {
    if (type == 'string') {
      result = `obj.${bind}='${value}'`;
    } else {
      result = `obj.${bind}=${value}`;
    }
  }
  eval(result);
  return obj;
}
export const loadScript = (type = 'js', url, dom = "body") => {
  let flag = false;
  return new Promise((resolve) => {
    const head = dom == 'head' ? document.getElementsByTagName('head')[0] : document.body;
    for (let i = 0; i < head.children.length; i++) {
      let ele = head.children[i]
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
  if (typeof url == 'object' && url instanceof Blob) {
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
  if (type === 'array') obj = [];
  else if (type === 'object') obj = {};
  else return data;
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
  if (validatenull(value)) return value
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

export const findByValue = (dic, value, props) => {
  // 如果为空直接返回
  if (validatenull(dic)) return value;
  let result = '';
  let isArray = value instanceof Array
  let list = isArray ? value : [value]
  props = props || DIC_PROPS;
  result = [];
  for (let i = 0; i < list.length; i++) {
    result.push(findLabelNode(dic, list[i], props) || list[i]);
  }
  if (isArray) {
    return result.join(DIC_SHOW_SPLIT).toString();
  }
  return result.join()
};
/**
 * 过滤字典翻译字段和空字段
 */
export const filterParams = (form, list = ['', '$'], deep = true) => {
  let data = deep ? deepClone(form) : form
  for (let o in data) {
    if (list.includes('')) {
      if (validatenull(data[o])) delete data[o];
    }
    if (list.includes('$')) {
      if (o.indexOf('$') !== -1) delete data[o];
    }

  }
  return data
};
/**
 * 处理存在group分组的情况
 */
export const detailDicGroup = (dic = [], props = {}) => {
  let list = deepClone(dic);
  let groupsKey = props[DIC_PROPS.groups] || DIC_PROPS.groups
  dic.forEach(ele => {
    if (ele[groupsKey]) {
      list = list.concat(ele[groupsKey]);
    }
  });
  return list;
};
/**
 * 根据label去找到节点
 */
export const findLabelNode = (dic, value, props, obj) => {
  let result;
  if (!obj) dic = detailDicGroup(dic, props);
  let rev = (dic1) => {
    const labelKey = props.label || DIC_PROPS.label;
    const valueKey = props.value || DIC_PROPS.value;
    const childrenKey = props.children || DIC_PROPS.children;
    for (let i = 0; i < dic1.length; i++) {
      const ele = dic1[i];
      const children = ele[childrenKey] || [];
      if (ele[valueKey] === value) {
        result = obj ? ele : ele[labelKey];
      } else {
        rev(children);
      }
    }
  };
  rev(dic);
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
 * 根据值查找对应的序号
 */
export const findArray = (dic, value, valueKey, obj) => {
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

export const arraySort = (list = [], prop, callback) => {
  return list.filter(ele => !validatenull(ele[prop])).sort((a, b) => callback(a, b)).concat(list.filter(ele => validatenull(ele[prop])));
}
export const clearVal = (obj, list = []) => {
  if (!obj) return {};
  Object.keys(obj).forEach(ele => {
    if (list.includes(ele)) return
    else if (ele.includes('$')) delete obj[ele]
    else if (!validatenull(obj[ele])) {
      let type = getObjType(obj[ele])
      if (type === 'array') obj[ele] = [];
      else if (type === 'object') obj[ele] = {};
      else if (['number', 'boolean'].includes(type)) obj[ele] = undefined;
      else obj[ele] = '';
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
