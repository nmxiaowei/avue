/*! Avue.js v3.9.0 | (c) 2017-2026 Smallwei | Released under the MIT License. */
'use strict';

var src_utils_validate = require('../utils/validate.js');
var src_utils_util = require('../utils/util.js');
var src_global_variable = require('../global/variable.js');
var dayjs_min = require('../../_virtual/dayjs.min.js');

const detail = (row = {}, column = {}, option = {}, dic = []) => {
    let result = row[column.prop];
    const type = column.type;
    const separator = column.separator;
    if (column.bind)
        result = src_utils_util.getAsVal(row, column.bind);
    if (!src_utils_validate.validatenull(result)) {
        const selectFlag = src_global_variable.MULTIPLE_LIST.includes(column.type) && column.multiple;
        const arrayFlag = src_global_variable.ARRAY_VALUE_LIST.includes(column.type) && column.emitPath !== false;
        if ((selectFlag || arrayFlag) && !Array.isArray(result) && !column.dataType)
            column.dataType = 'string';
        if (column.dataType) {
            if (selectFlag || arrayFlag) {
                if (!Array.isArray(result)) {
                    if (column.dataType == 'json') {
                        result = JSON.parse(result);
                    }
                    else {
                        result = result.split(separator || src_global_variable.DIC_SPLIT);
                    }
                }
                result.forEach((ele, index) => {
                    result[index] = src_utils_util.detailDataType(ele, column.dataType);
                });
            }
            else {
                result = src_utils_util.detailDataType(result, column.dataType);
            }
        }
        if (type === 'password') {
            result = src_utils_util.getPasswordChar(result, '*');
        }
        else if (src_global_variable.DATE_LIST.includes(type) && column.format) {
            const format = column.format;
            const formatValue = dayjs_min.default().format('YYYY-MM-DD');
            if (['dates', 'years', 'months'].includes(type)) {
                if (typeof result === 'string') {
                    result = result.split(',');
                }
                if (Array.isArray(result)) {
                    result = result.map((date) => dayjs_min.default(date).format(format)).join(column.separator || ',');
                }
            }
            else if (type.indexOf('range') !== -1) {
                let [date1 = '', date2 = ''] = result;
                if (type === 'timerange') {
                    date1 = `${formatValue} ${date1}`;
                    date2 = `${formatValue} ${date2}`;
                }
                result = [dayjs_min.default(date1).format(format), dayjs_min.default(date2).format(format)].join(column.separator || '~');
            }
            else {
                if (type === 'time') {
                    result = `${formatValue} ${result}`;
                }
                result = dayjs_min.default(result).format(format);
            }
        }
    }
    if (!src_utils_validate.validatenull(dic)) {
        result = src_utils_util.getDicValue(dic, result, column.props || option.props);
    }
    if (typeof column.formatter === 'function') {
        result = column.formatter(row, row[column.prop], result, column);
    }
    else if (Array.isArray(result) && !src_utils_validate.validatenull(dic)) {
        result = result.join(separator || src_global_variable.DIC_SHOW_SPLIT);
    }
    return result;
};

exports.detail = detail;
