import { validatenull } from 'utils/validate';
import { getPasswordChar, findByValue, getAsVal, strCorNum } from 'utils/util';
import { DIC_SPLIT, DIC_SHOW_SPLIT, DATE_LIST } from 'global/variable';
import dayjs from 'dayjs';
export const detail = (row = {}, column = {}, option = {}, dic = []) => {
  let result = row[column.prop];
  let type = column.type;
  let separator = column.separator;
  if (validatenull(result)) result = '';
  // 自定义格式化
  if (column.formatter && typeof column.formatter === 'function') {
    result = column.formatter(row, row[column.prop], result, column);
  }

  if (!validatenull(result)) {
    // 日期处理
    if (DATE_LIST.includes(type) && column.format) {
      const format = column.format.replace('dd', 'DD').replace('yyyy', 'YYYY');
      result = dayjs(result).format(format);
    }
  }
  if (['string', 'number'].includes(column.dataType) && !Array.isArray(result) && !validatenull(result)) {
    result = (result + '').split(separator || DIC_SPLIT);
    if (column.dataType === 'number') result = strCorNum(result);
  }
  if (['array'].includes(type)) {
    if (Array.isArray(result)) {
      result = result.join(separator || DIC_SHOW_SPLIT);
    } else {
      result = result.split(separator || DIC_SPLIT).join(separator || DIC_SHOW_SPLIT);
    }
  } else if (['password'].includes(type)) {
    result = getPasswordChar(result, '*');
  } else if (['color'].includes(type)) {
    result = `<i class="avue-crud__color" style="background-color:${result}"></i>`;
  } else if (['icon'].includes(type)) {
    result = `<i class="avue-crud__icon ${result}" ></i>`;
  }
  // 深结构绑定处理
  if (column.bind) result = getAsVal(row, column.bind);
  // 字典处理
  if (!validatenull(dic)) {
    result = findByValue(dic, result, column.props || option.props, ['cascader', 'tree'].includes(column.type), column);
  }
  return result;
};
