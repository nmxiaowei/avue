/*! Avue.js v3.9.3 | (c) 2017-2026 Smallwei | Released under the MIT License. */
'use strict';

var src_utils_validate = require('../utils/validate.js');
var src_global_variable = require('../global/variable.js');
var src_utils_util = require('../utils/util.js');
var src_locale_index = require('../locale/index.js');

let count = 0;
const calcCascader = (list = []) => {
    list.forEach((ele) => {
        const cascader = ele.cascader;
        if (!src_utils_validate.validatenull(cascader)) {
            const parentProp = ele.prop;
            cascader.forEach((citem) => {
                const column = src_utils_util.findObject(list, citem);
                if (column)
                    column.parentProp = parentProp;
            });
        }
    });
    return list;
};
const calcCount = (ele, spanDefault = 12, init = false) => {
    const spanAll = 24;
    if (init)
        count = 0;
    const currentSpan = (ele.span || spanDefault) + (ele.offset || 0);
    count += currentSpan;
    if (ele.row && count < spanAll) {
        ele.count = spanAll - count;
        count = 0;
    }
    else if (count >= spanAll) {
        count = 0;
    }
    return ele;
};
const initVal = (value, safe) => {
    let { type, multiple, dataType, separator = src_global_variable.DIC_SPLIT, alone, emitPath, range } = safe;
    let list = value;
    if ((src_global_variable.MULTIPLE_LIST.includes(type) && multiple == true) ||
        (src_global_variable.ARRAY_VALUE_LIST.includes(type) && emitPath !== false) ||
        (src_global_variable.RANGE_LIST.includes(type) && range == true)) {
        if (!Array.isArray(list)) {
            if (src_utils_validate.validatenull(list)) {
                list = [];
            }
            else {
                if (dataType == 'json') {
                    list = JSON.parse(list);
                }
                else {
                    list = (list + '').split(separator) || [];
                }
            }
        }
        list.forEach((ele, index) => {
            list[index] = src_utils_util.detailDataType(ele, dataType);
        });
        if (src_global_variable.ARRAY_LIST.includes(type) && src_utils_validate.validatenull(list) && alone)
            list = [''];
    }
    else {
        list = src_utils_util.detailDataType(list, dataType);
    }
    return list;
};
const getSearchType = (column) => {
    const type = column.type;
    const range = column.searchRange;
    let result = type;
    if (column.searchType)
        return column.searchType;
    if (['radio', 'checkbox', 'switch'].includes(type)) {
        result = 'select';
    }
    else if (src_global_variable.DATE_LIST.includes(type)) {
        const rangeKey = 'range';
        if (range) {
            if (!type.includes(rangeKey)) {
                result = type + rangeKey;
            }
            else {
                result = type;
            }
        }
        else
            result = type.replace(rangeKey, '');
    }
    else if (['textarea'].includes(type)) {
        result = 'input';
    }
    return result;
};
const getComponent = (type, component) => {
    let result = type || 'input';
    if (!src_utils_validate.validatenull(component)) {
        return component;
    }
    else if (src_global_variable.ARRAY_LIST.includes(type || '')) {
        result = 'array';
    }
    else if (['time', 'timerange'].includes(type || '')) {
        result = 'time';
    }
    else if (src_global_variable.DATE_LIST.includes(type || '')) {
        result = 'date';
    }
    else if ([
        'password',
        'textarea',
        'search',
        'phone',
        'currency',
        'bankCard',
        'bank-card',
        'idCard',
        'id-card',
        'email',
        'code',
        'plate',
        'ip',
        'mac',
        'uscc',
    ].includes(type || '')) {
        result = 'input';
    }
    else if (type === 'cron') {
        result = 'input-cron';
    }
    else if (src_global_variable.INPUT_LIST.includes(type || '')) {
        result = 'input-' + type;
    }
    return src_global_variable.KEY_COMPONENT_NAME + result;
};
const formInitVal = (list = []) => {
    let tableForm = {};
    list.forEach((ele) => {
        if (['rate', 'slider', 'number'].includes(ele.type) ||
            ele.dataType === 'number' ||
            (ele.type == 'select' && ele.virtualize == true)) {
            tableForm[ele.prop] = undefined;
        }
        else if ((src_global_variable.ARRAY_VALUE_LIST.includes(ele.type) &&
            ele.emitPath !== false &&
            ele.dataType != 'json') ||
            (src_global_variable.MULTIPLE_LIST.includes(ele.type) && ele.multiple) ||
            ele.dataType === 'array') {
            tableForm[ele.prop] = [];
        }
        else if (src_global_variable.RANGE_LIST.includes(ele.type) && ele.range == true) {
            tableForm[ele.prop] = [0, 0];
        }
        else {
            tableForm[ele.prop] = '';
        }
        if (ele.bind) {
            tableForm = src_utils_util.createObj(tableForm, ele.bind);
        }
        if (!src_utils_validate.validatenull(ele.value)) {
            tableForm[ele.prop] = ele.value;
        }
    });
    return tableForm;
};
const getPlaceholder = function (column, type) {
    const placeholder = column.placeholder;
    const label = column.label;
    if (type === 'search') {
        const searchPlaceholder = column.searchPlaceholder;
        if (!src_utils_validate.validatenull(searchPlaceholder)) {
            return searchPlaceholder;
        }
        else {
            return label;
        }
    }
    else if (src_utils_validate.validatenull(placeholder)) {
        if (src_global_variable.SELECT_LIST.includes(column.type)) {
            return `${src_locale_index.t('tip.select')} ${label}`;
        }
        else {
            return `${src_locale_index.t('tip.input')} ${label}`;
        }
    }
    return placeholder;
};

exports.calcCascader = calcCascader;
exports.calcCount = calcCount;
exports.formInitVal = formInitVal;
exports.getComponent = getComponent;
exports.getPlaceholder = getPlaceholder;
exports.getSearchType = getSearchType;
exports.initVal = initVal;
