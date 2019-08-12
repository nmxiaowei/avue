import { validatenull } from 'utils/validate';
import { getPasswordChar, findByValue } from 'utils/util';
import dayjs from 'dayjs';
export const detail = (row = {}, column = {}, option = {}, dic = []) => {
  let result = row[column.prop || column.value];
  let type = column.type;
  if (validatenull(result)) result = '';
  // 自定义格式化
  if (column.formatter && typeof column.formatter === 'function') {
    result = column.formatter(row, row[column.prop], result, column);
  }

  if (!validatenull(result)) {
    // 日期处理
    if (['date', 'time', 'datetime'].includes(type) && column.format) {
      const format = column.format.replace('dd', 'DD').replace('yyyy', 'YYYY');
      result = dayjs(result).format(format);
    }
  }

  // 密码处理
  if (['password'].includes(type)) {
    result = getPasswordChar(result, '*');
  }

  // 字典处理
  if (!validatenull(dic)) {
    result = findByValue(dic, result, column.props || option.props, ['cascader', 'tree'].includes(column.type));
  }
  return result;
};
