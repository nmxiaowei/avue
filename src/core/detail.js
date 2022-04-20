import { validatenull } from 'utils/validate';
import { getPasswordChar, findByValue, getAsVal, strCorNum } from 'utils/util';
import { DIC_SPLIT, DIC_SHOW_SPLIT, DATE_LIST, MULTIPLE_LIST, ARRAY_VALUE_LIST, ARRAY_LIST } from 'global/variable';
import dayjs from 'dayjs';
export const detail = (row = {}, column = {}, option = {}, dic = []) => {
  let result = row[column.prop];
  let type = column.type;
  let separator = column.separator;
  // 深结构绑定处理
  if (column.bind) result = getAsVal(row, column.bind);
  if (validatenull(result)) {
    result = '';
  } else {
    let selectFlag = MULTIPLE_LIST.includes(column.type) && column.multiple;
    let arrayFlag = ARRAY_VALUE_LIST.includes(column.type)
    if ((['string', 'number'].includes(column.dataType) || selectFlag || arrayFlag) && !Array.isArray(result)) {
      result = (result + '').split(separator || DIC_SPLIT);
      if (column.dataType === 'number') result = strCorNum(result);
    }
    if (ARRAY_LIST.includes(type)) {
      if (Array.isArray(result)) {
        result = result.join(separator || DIC_SHOW_SPLIT);
      } else {
        result = result.split(separator || DIC_SPLIT).join(separator || DIC_SHOW_SPLIT);
      }
    } else if ('password' === type) {
      result = getPasswordChar(result, '*');
    } else if (DATE_LIST.includes(type) && column.format) {
      const format = column.format.replace('dd', 'DD').replace('yyyy', 'YYYY');
      let formatValue = dayjs().format('YYYY-MM-DD');
      if (type.indexOf('range') !== -1) {
        let date1 = result[0] || '', date2 = result[1] || ''
        if (type === 'timerange' && date1.length <= 8 && date2.length < 8) {
          date1 = `${formatValue} ${date1}`
          date2 = `${formatValue} ${date2}`
        }
        result = [dayjs(date1).format(format), dayjs(date2).format(format)].join(column.separator || '~')
      } else {
        if (type === 'time' && result.length <= 8) {
          result = `${formatValue} ${result}`
        }
        result = dayjs(result).format(format);
      }
    }
    // 字典处理
    result = findByValue(dic, result, column.props || option.props);
  }
  // 自定义格式化
  if (column.formatter && typeof column.formatter === 'function') {
    result = column.formatter(row, row[column.prop], result, column);
  }
  return result;
};
