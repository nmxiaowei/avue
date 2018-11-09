import {
    validatenull
} from './validate';

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
        //不再具有下一层次
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
 * 根据字典的value显示label
 */
let result = '';
export const findByvalue = (dic, value, props, first) => {
    props = props || {};
    const labelKey = props.label || 'label';
    const valueKey = props.value || 'value';
    const childrenKey = props.children || 'children';
    if (validatenull(first)) result = value;
    if (validatenull(dic)) return result;
    //正常字典
    if (typeof(value) === 'string' || typeof(value) === 'number' || typeof(value) === 'boolean') {
        for (let i = 0; i < dic.length; i++) {
            if (dic[i][valueKey] === value) {
                result = dic[i][labelKey];
                break;
            } else {
                findByvalue(dic[i][childrenKey], value, props, true);
            }
        }
        //父子集字典
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
        //多选字典
    } else if (value instanceof Array) {
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
/**
 * 获取字典
 */
export const setDic = (dicData, DIC) => {
    return (typeof(dicData) === 'string') ? DIC : dicData;
};
/**
 * 设置px
 */
export const setPx = (val, defval) => {
    if (validatenull(val)) {
        val = defval;
    }
    val = val + '';
    if (val.indexOf('%') === -1) {
        val = val + 'px';
    }
    return val;
};

/**
 * 表格初始化值
 */

export const formInitVal = (list) => {
    let tableForm = {};
    let searchForm = {};
    list.forEach(ele => {
        if (
            ele.type === 'checkbox' ||
            ele.type === 'cascader' ||
            ele.type === 'dates' ||
            (ele.type === 'upload' && ele.listType !== 'picture-img') ||
            ele.multiple ||
            ele.range || ele.dataType === 'array'
        ) {
            tableForm[ele.prop] = [];
            if (ele.search) searchForm[ele.prop] = [];
        } else if (['number', 'rate', 'silder'].includes(ele.type) || ele.dataType === 'number') {
            tableForm[ele.prop] = 0;
            if (ele.search) {
                searchForm[ele.prop] = 0;
            }
        } else {
            tableForm[ele.prop] = '';
            if (ele.search) {
                searchForm[ele.prop] = '';
            }
        }
        //表单默认值设置
        if (!validatenull(ele.valueDefault)) tableForm[ele.prop] = ele.valueDefault;
        //搜索表单默认值设置
        if (!validatenull(ele.searchDefault)) searchForm[ele.prop] = ele.searchDefault;
    });
    return {
        tableForm,
        searchForm
    };
};

export const getType = (column) => {
    const type = column.type
    const more = column.more || false;
    if (more) {
        if (type === 'date') {
            return 'daterange';
        } else if (type === 'datetime') {
            return 'datetimerange';
        } else if (type === 'time') {
            return 'timerange';
        } else {
            return type;
        }
    }
    return type;
};

/**
 * 搜索框获取动态组件
 */
export const getSearchType = (type) => {
    if (['select', 'radio', 'checkbox'].includes(type)) {
        return 'crudSelect';
    } else if (['time', 'timerange'].includes(type)) {
        return 'crudTime';
    } else if (['dates', 'date', 'datetime', 'datetimerange', 'daterange', 'week', 'month', 'year'].includes(type)) {
        return 'crudDate';
    } else if (['cascader'].includes(type)) {
        return 'crudCascader';
    } else if (['number'].includes(type)) {
        return 'crudInputNumber';
    } else {
        return 'crudInput';
    }
};

/**
 * 动态获取组件
 */
export const getComponent = ({ type, component }) => {
    if (!validatenull(component)) {
        return component;
    } else if (type === 'select') {
        return 'crudSelect';
    } else if (type === 'radio') {
        return 'crudRadio';
    } else if (type === 'checkbox') {
        return 'crudCheckbox';
    } else if (['time', 'timerange'].includes(type)) {
        return 'crudTime';
    } else if (['dates', 'date', 'datetime', 'datetimerange', 'daterange', 'week', 'month', 'year'].includes(type)) {
        return 'crudDate';
    } else if (type === 'cascader') {
        return 'crudCascader';
    } else if (type === 'number') {
        return 'crudInputNumber';
    } else if (type === 'password') {
        return 'crudInput';
    } else if (type === 'switch') {
        return 'crudSwitch';
    } else if (type === 'rate') {
        return 'crudRate';
    } else if (type === 'upload') {
        return 'crudUpload';
    } else if (type === 'silder') {
        return 'crudSilder';
    } else {
        return 'crudInput';
    }
};
export const getPasswordChar = (len, char) => {
    let result = '';
    for (let i = 0; i < len; i++) {
        result = result + char;
    }
    return result;
}
export const vaildData = (val, dafult) => {
    if (typeof val === 'boolean') {
        return val;
    }
    return !validatenull(val) ? val : dafult;
};