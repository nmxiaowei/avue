import { validatenull } from 'utils/validate';
import { getPasswordChar, getDicValue, getAsVal, detailDataType } from 'utils/util';
import { DIC_SPLIT, DIC_SHOW_SPLIT, DATE_LIST, MULTIPLE_LIST, ARRAY_VALUE_LIST, ARRAY_LIST } from 'global/variable';
import dayjs from 'dayjs';
export const detail = (row = {}, column = {}, option = {}, dic = []) => {
  let result = row[column.prop];
  let type = column.type;
  let separator = column.separator;
  // 深结构绑定处理
  if (column.bind) result = getAsVal(row, column.bind);
  if (!validatenull(result)) {
    let selectFlag = MULTIPLE_LIST.includes(column.type) && column.multiple;
    let arrayFlag = ARRAY_VALUE_LIST.includes(column.type) && column.emitPath !== false;
    if ((selectFlag || arrayFlag) && !Array.isArray(result) && !column.dataType) column.dataType = 'string';
    if (column.dataType) {
      if (selectFlag || arrayFlag) {
        if (!Array.isArray(result)) {
          if (column.dataType == 'json') {
            result = JSON.parse(result);
          } else {
            result = result.split(separator || DIC_SPLIT);
          }
        }
        result.forEach(ele => {
          ele = detailDataType(ele, column.dataType);
        });
      } else {
        result = detailDataType(result, column.dataType);
      }
    }
    if (type === 'password') {
      result = getPasswordChar(result, '*');
    } else if (DATE_LIST.includes(type) && column.format) {
      const format = column.format.replace('dd', 'DD').replace('yyyy', 'YYYY');
      let formatValue = dayjs().format('YYYY-MM-DD');
      if (type.indexOf('range') !== -1) {
        let [date1 = '', date2 = ''] = result;
        if (type === 'timerange') {
          date1 = `${formatValue} ${date1}`;
          date2 = `${formatValue} ${date2}`;
        }
        result = [dayjs(date1).format(format), dayjs(date2).format(format)].join(column.separator || '~');
      } else {
        if (type === 'time') {
          result = `${formatValue} ${result}`;
        }
        result = dayjs(result).format(format);
      }
    }
  }
  // 字典处理
  if (!validatenull(dic)) {
    result = getDicValue(dic, result, column.props || option.props);
  }
  // 自定义格式化
  if (typeof column.formatter === 'function') {
    result = column.formatter(row, row[column.prop], result, column);
  } else if (Array.isArray(result) && !validatenull(dic)) {
    result = result.join(separator || DIC_SHOW_SPLIT);
  }

  return result;
};
