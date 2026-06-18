/*! Avue.js v3.9.2 | (c) 2017-2026 Smallwei | Released under the MIT License. */
'use strict';

var src_utils_validate = require('./validate.js');
var src_global_variable = require('../global/variable.js');
var _get = require('lodash/get');
var _set = require('lodash/set');
var _cloneDeep = require('lodash/cloneDeep');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var _get__default = /*#__PURE__*/_interopDefault(_get);
var _set__default = /*#__PURE__*/_interopDefault(_set);
var _cloneDeep__default = /*#__PURE__*/_interopDefault(_cloneDeep);

const isMediaType = (url, type) => {
    if (src_utils_validate.validatenull(url))
        return;
    if (src_global_variable.typeList.audio.test(url) || src_global_variable.typeList.audio.test(type) || type == 'audio') {
        return 'audio';
    }
    else if (src_global_variable.typeList.video.test(url) || src_global_variable.typeList.video.test(type) || type == 'video') {
        return 'video';
    }
    else if (src_global_variable.typeList.img.test(url) || src_global_variable.typeList.img.test(type) || type == 'img') {
        return 'img';
    }
    return;
};
const uuid = () => {
    const s = [];
    const hexDigits = '0123456789abcdef';
    for (let i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = '4';
    s[19] = hexDigits.substr(((s[19] & 0x3) | 0x8), 1);
    s[8] = s[13] = s[18] = s[23] = '-';
    return s.join('');
};
function getFixed(val = 0, len = 2) {
    return Number(val.toFixed(len));
}
function getAsVal(obj, bind = '') {
    const result = deepClone(obj);
    if (src_utils_validate.validatenull(bind))
        return result;
    return _get__default.default(obj, bind);
}
function setAsVal(obj, bind = '', value) {
    _set__default.default(obj, bind, value);
    return obj;
}
const loadScript = (type = 'js', url, dom = 'body') => {
    let flag = false;
    return new Promise((resolve) => {
        const head = dom == 'head' ? document.getElementsByTagName('head')[0] : document.body;
        for (let i = 0; i < head.children.length; i++) {
            const ele = head.children[i];
            if ((ele.src || '').indexOf(url) !== -1) {
                flag = true;
                resolve();
            }
        }
        if (flag)
            return;
        let script;
        if (type === 'js') {
            script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = url || '';
        }
        else {
            script = document.createElement('link');
            script.rel = 'stylesheet';
            script.type = 'text/css';
            script.href = url || '';
        }
        head.appendChild(script);
        script.onload = function () {
            resolve();
        };
    });
};
function downFile(url, saveName) {
    if (typeof url === 'object' && url instanceof Blob) {
        url = URL.createObjectURL(url);
    }
    const aLink = document.createElement('a');
    aLink.href = url;
    aLink.download = saveName || '';
    let event;
    if (window.MouseEvent) {
        event = new MouseEvent('click');
    }
    else {
        event = document.createEvent('MouseEvents');
        event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    }
    aLink.dispatchEvent(event);
}
function extend(...args) {
    let target = args[0] || {};
    let deep = false;
    const arr = Array.prototype.slice.call(args);
    let i = 1;
    let options;
    let src;
    let key;
    let copy;
    let isArray = false;
    if (typeof target === 'boolean') {
        deep = target;
        i++;
        target = args[1];
    }
    for (; i < arr.length; i++) {
        if ((options = arr[i]) != null) {
            for (key in options) {
                copy = options[key];
                src = target[key];
                if (deep &&
                    (Object.prototype.toString.call(copy) === '[object Object]' ||
                        (isArray = Object.prototype.toString.call(copy) == '[object Array]'))) {
                    if (isArray) {
                        src = Object.prototype.toString.call(src) === '[object Array]' ? src : [];
                    }
                    else {
                        src = Object.prototype.toString.call(src) === '[object Object]' ? src : {};
                    }
                    target[key] = extend(deep, src, copy);
                }
                else if (copy !== undefined && copy !== src) {
                    target[key] = copy;
                }
            }
        }
    }
    return target;
}
function createObj(obj, bind) {
    const list = bind.split('.');
    const first = list.splice(0, 1)[0];
    const deep = {};
    deep[first] = {};
    if (list.length >= 2) {
        let start = '{';
        let end = '}';
        let result = '';
        list.forEach((ele) => {
            result = `${result}${start}"${ele}":`;
        });
        result = `${result}""`;
        for (let i = 0; i < list.length; i++) {
            result = `${result}${end}`;
        }
        deep[first] = JSON.parse(result);
    }
    obj = extend(true, obj, deep);
    return obj;
}
function dataURLtoFile(dataurl, filename) {
    var _a;
    const arr = dataurl.split(',');
    const mime = ((_a = arr[0].match(/:(.*?);/)) === null || _a === void 0 ? void 0 : _a[1]) || '';
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
}
function findObject(list = [], value, prop = 'prop') {
    const props = { value: prop };
    let result = findNode(list, props, value);
    if (result)
        return result;
    for (const ele of list) {
        const column = ele.column ||
            (ele.children && src_global_variable.CHILDREN_LIST.includes(ele.type) ? ele.children.column : null);
        if (column) {
            result = findNode(column, props, value);
            if (result)
                return result;
        }
    }
    return result;
}
function randomId() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    const maxPos = chars.length;
    let id = '';
    for (let i = 0; i < 16; i++) {
        id += chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return id;
}
const getObjType = (obj) => {
    const map = {
        '[object Boolean]': 'boolean',
        '[object Number]': 'number',
        '[object String]': 'string',
        '[object Function]': 'function',
        '[object Array]': 'array',
        '[object Date]': 'date',
        '[object RegExp]': 'regExp',
        '[object Undefined]': 'undefined',
        '[object Null]': 'null',
        '[object Object]': 'object',
    };
    if (obj instanceof Element) {
        return 'element';
    }
    return map[Object.prototype.toString.call(obj)];
};
const isJson = (str) => {
    if (Array.isArray(str)) {
        return str[0] instanceof Object;
    }
    else if (str instanceof Object) {
        return true;
    }
    return false;
};
const deepClone = (data) => {
    return _cloneDeep__default.default(data);
};
const getColumn = (column) => {
    let columnList = [];
    if (Array.isArray(column)) {
        columnList = column;
    }
    else {
        for (const o in column) {
            column[o].prop = o;
            columnList.push(column[o]);
        }
    }
    return columnList;
};
const setPx = (val, defval = '') => {
    if (src_utils_validate.validatenull(val))
        val = defval;
    if (src_utils_validate.validatenull(val))
        return '';
    val = val + '';
    if (val.indexOf('%') === -1) {
        val = val + 'px';
    }
    return val;
};
const detailDataType = (value, type) => {
    if (src_utils_validate.validatenull(value))
        return value;
    if (type === 'number') {
        return Number(value);
    }
    else if (type === 'string') {
        return value + '';
    }
    else {
        return value;
    }
};
const getDicValue = (list, value, props = {}) => {
    if (src_utils_validate.validatenull(list))
        return value;
    const isArray = Array.isArray(value);
    value = isArray ? value : [value];
    const result = [];
    const labelKey = props[src_global_variable.DIC_PROPS.label] || src_global_variable.DIC_PROPS.label;
    const groupsKey = props[src_global_variable.DIC_PROPS.groups] || src_global_variable.DIC_PROPS.groups;
    let dic = deepClone(list);
    dic.forEach((ele) => {
        if (ele[groupsKey]) {
            dic = dic.concat(ele[groupsKey]);
            delete ele[groupsKey];
        }
    });
    value.forEach((val) => {
        if (Array.isArray(val)) {
            const arrayResult = [];
            val.forEach((arrayVal) => {
                const obj = findNode(dic, props, arrayVal) || {};
                arrayResult.push(obj[labelKey] || arrayVal);
            });
            result.push(arrayResult);
        }
        else {
            const obj = findNode(dic, props, val) || {};
            result.push(obj[labelKey] || val);
        }
    });
    return isArray ? result : result.join('');
};
const filterParams = (form, list = ['', '$'], deep = true) => {
    const data = deep ? deepClone(form) : form;
    for (const o in data) {
        if (list.includes('')) {
            if (src_utils_validate.validatenull(data[o]))
                delete data[o];
        }
        if (list.includes('$')) {
            if (o.indexOf('$') !== -1)
                delete data[o];
        }
    }
    return data;
};
const findArray = (list = [], value, valueKey = src_global_variable.DIC_PROPS.value, index = false) => {
    if (index) {
        return list.findIndex((ele) => ele[valueKey] == value);
    }
    return list.find((ele) => ele[valueKey] == value);
};
const findNode = (list = [], props = {}, value) => {
    const valueKey = props.value || src_global_variable.DIC_PROPS.value;
    const childrenKey = props.children || src_global_variable.DIC_PROPS.children;
    for (const ele of list) {
        if (ele[valueKey] === value) {
            return ele;
        }
        const children = ele[childrenKey];
        if (Array.isArray(children)) {
            const node = findNode(children, props, value);
            if (node)
                return node;
        }
    }
    return undefined;
};
const getPasswordChar = (result = '', char) => {
    const len = result.toString().length;
    result = '';
    for (let i = 0; i < len; i++) {
        result = result + char;
    }
    return result;
};
const arraySort = (list = [], prop, callback) => {
    return list
        .filter((ele) => !src_utils_validate.validatenull(ele[prop]))
        .sort((a, b) => callback(a, b))
        .concat(list.filter((ele) => src_utils_validate.validatenull(ele[prop])));
};
const blankVal = (value) => {
    if (src_utils_validate.validatenull(value))
        return value;
    const type = getObjType(value);
    if (type === 'array')
        value = [];
    else if (type === 'object')
        value = {};
    else if (['number', 'boolean'].includes(type))
        value = undefined;
    else
        value = '';
    return value;
};
const clearVal = (obj, propList, list = []) => {
    if (!obj)
        return {};
    propList.forEach((ele) => {
        if (list.includes(ele))
            return;
        else if (ele.includes('$'))
            delete obj[ele];
        else if (!src_utils_validate.validatenull(obj[ele])) {
            obj[ele] = blankVal(obj[ele]);
        }
    });
    return obj;
};
const validData = (val, dafult) => {
    if (typeof val === 'boolean') {
        return val;
    }
    return !src_utils_validate.validatenull(val) ? val : dafult;
};

exports.arraySort = arraySort;
exports.blankVal = blankVal;
exports.clearVal = clearVal;
exports.createObj = createObj;
exports.dataURLtoFile = dataURLtoFile;
exports.deepClone = deepClone;
exports.detailDataType = detailDataType;
exports.downFile = downFile;
exports.extend = extend;
exports.filterParams = filterParams;
exports.findArray = findArray;
exports.findNode = findNode;
exports.findObject = findObject;
exports.getAsVal = getAsVal;
exports.getColumn = getColumn;
exports.getDicValue = getDicValue;
exports.getFixed = getFixed;
exports.getObjType = getObjType;
exports.getPasswordChar = getPasswordChar;
exports.isJson = isJson;
exports.isMediaType = isMediaType;
exports.loadScript = loadScript;
exports.randomId = randomId;
exports.setAsVal = setAsVal;
exports.setPx = setPx;
exports.uuid = uuid;
exports.validData = validData;
