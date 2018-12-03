import { validatenull } from 'utils/validate';
import { getPasswordChar, findByvalue } from 'utils/utils';
import dayjs from 'dayjs';
export const detail = (row, column) => {
  let result = row[column.prop || column.value];
  let type = column.type;
  if (validatenull(result)) result = '';
  if (type) {
    if (column.dataType === 'string') result = result.split(',');
    // 日期处理
    if (
      ['date', 'time', 'datetime'].includes(type) &&
      column.format &&
      !validatenull(result)
    ) {
      const format = column.format.replace('dd', 'DD').replace('yyyy', 'YYYY');
      result = dayjs(result).format(format);
    }
    // 密码处理
    if (['password'].includes(type)) {
      return getPasswordChar(result.toString().length, '*');
    }
    // 字典处理
    if (column.dicData) {
      result = findByvalue(
        (typeof column.dicData === 'string'
          ? this.DIC[column.dicData]
          : column.dicData) || [],
        result,
        column.props || this.tableOption.props
      );
    }
  }
  // 自定义格式化
  if (column.formatter && typeof column.formatter === 'function') {
    result = column.formatter(row, row[column.prop], result, column);
  }
  return result;
};
