/*! Avue.js v3.9.3 | (c) 2017-2026 Smallwei | Released under the MIT License. */
import { validatenull } from '../utils/validate.mjs';
import { getAsVal, detailDataType, getPasswordChar, getDicValue } from '../utils/util.mjs';
import { MULTIPLE_LIST, ARRAY_VALUE_LIST, DIC_SPLIT, DATE_LIST, DIC_SHOW_SPLIT } from '../global/variable.mjs';
import dayjs from '../../_virtual/dayjs.min.mjs';

const detail = (row = {}, column = {}, option = {}, dic = []) => {
    let result = row[column.prop];
    const type = column.type;
    const separator = column.separator;
    if (column.bind)
        result = getAsVal(row, column.bind);
    if (!validatenull(result)) {
        const selectFlag = MULTIPLE_LIST.includes(column.type) && column.multiple;
        const arrayFlag = ARRAY_VALUE_LIST.includes(column.type) && column.emitPath !== false;
        if ((selectFlag || arrayFlag) && !Array.isArray(result) && !column.dataType)
            column.dataType = 'string';
        if (column.dataType) {
            if (selectFlag || arrayFlag) {
                if (!Array.isArray(result)) {
                    if (column.dataType == 'json') {
                        result = JSON.parse(result);
                    }
                    else {
                        result = result.split(separator || DIC_SPLIT);
                    }
                }
                result.forEach((ele, index) => {
                    result[index] = detailDataType(ele, column.dataType);
                });
            }
            else {
                result = detailDataType(result, column.dataType);
            }
        }
        if (type === 'password') {
            result = getPasswordChar(result, '*');
        }
        else if (DATE_LIST.includes(type) && column.format) {
            const format = column.format;
            const formatValue = dayjs().format('YYYY-MM-DD');
            if (['dates', 'years', 'months'].includes(type)) {
                if (typeof result === 'string') {
                    result = result.split(',');
                }
                if (Array.isArray(result)) {
                    result = result.map((date) => dayjs(date).format(format)).join(column.separator || ',');
                }
            }
            else if (type.indexOf('range') !== -1) {
                let [date1 = '', date2 = ''] = result;
                if (type === 'timerange') {
                    date1 = `${formatValue} ${date1}`;
                    date2 = `${formatValue} ${date2}`;
                }
                result = [dayjs(date1).format(format), dayjs(date2).format(format)].join(column.separator || '~');
            }
            else {
                if (type === 'time') {
                    result = `${formatValue} ${result}`;
                }
                result = dayjs(result).format(format);
            }
        }
    }
    if (!validatenull(dic)) {
        result = getDicValue(dic, result, column.props || option.props);
    }
    if (typeof column.formatter === 'function') {
        result = column.formatter(row, row[column.prop], result, column);
    }
    else if (Array.isArray(result) && !validatenull(dic)) {
        result = result.join(separator || DIC_SHOW_SPLIT);
    }
    return result;
};

export { detail };
