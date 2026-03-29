import { validatenull } from 'utils/validate';
import {
  KEY_COMPONENT_NAME,
  DIC_SPLIT,
  ARRAY_LIST,
  DATE_LIST,
  INPUT_LIST,
  ARRAY_VALUE_LIST,
  MULTIPLE_LIST,
  SELECT_LIST,
  RANGE_LIST,
} from 'global/variable';
import { detailDataType, findObject, createObj } from 'utils/util';
import { t } from '../locale';

let count = 0;

export const calcCascader = (list: Record<string, any>[] = []) => {
  list.forEach((ele) => {
    const cascader = ele.cascader;
    if (!validatenull(cascader)) {
      const parentProp = ele.prop;
      cascader.forEach((citem: string) => {
        const column = findObject(list, citem);
        if (column) column.parentProp = parentProp;
      });
    }
  });
  return list;
};

export const calcCount = (
  ele: Record<string, any>,
  spanDefault = 12,
  init = false
) => {
  const spanAll = 24;
  if (init) count = 0;
  const currentSpan = (ele.span || spanDefault) + (ele.offset || 0);
  count += currentSpan;
  if (ele.row && count < spanAll) {
    ele.count = spanAll - count;
    count = 0;
  } else if (count >= spanAll) {
    count = 0;
  }
  return ele;
};

export const initVal = (value: any, safe: Record<string, any>) => {
  let { type, multiple, dataType, separator = DIC_SPLIT, alone, emitPath, range } = safe;
  let list = value;
  if (
    (MULTIPLE_LIST.includes(type) && multiple == true) ||
    (ARRAY_VALUE_LIST.includes(type) && emitPath !== false) ||
    (RANGE_LIST.includes(type) && range == true)
  ) {
    if (!Array.isArray(list)) {
      if (validatenull(list)) {
        list = [];
      } else {
        if (dataType == 'json') {
          list = JSON.parse(list);
        } else {
          list = (list + '').split(separator) || [];
        }
      }
    }
    list.forEach((ele: any, index: number) => {
      list[index] = detailDataType(ele, dataType);
    });
    if (ARRAY_LIST.includes(type) && validatenull(list) && alone) list = [''];
  } else {
    list = detailDataType(list, dataType);
  }
  return list;
};

export const getSearchType = (column: Record<string, any>) => {
  const type = column.type;
  const range = column.searchRange;
  let result = type;
  if (column.searchType) return column.searchType;
  if (['radio', 'checkbox', 'switch'].includes(type)) {
    result = 'select';
  } else if (DATE_LIST.includes(type)) {
    const rangeKey = 'range';
    if (range) {
      if (!type.includes(rangeKey)) {
        result = type + rangeKey;
      } else {
        result = type;
      }
    } else result = type.replace(rangeKey, '');
  } else if (['textarea'].includes(type)) {
    result = 'input';
  }
  return result;
};

export const getComponent = (type?: string, component?: string) => {
  let result = type || 'input';
  if (!validatenull(component)) {
    return component;
  } else if (ARRAY_LIST.includes(type || '')) {
    result = 'array';
  } else if (['time', 'timerange'].includes(type || '')) {
    result = 'time';
  } else if (DATE_LIST.includes(type || '')) {
    result = 'date';
  } else if (
    [
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
    ].includes(type || '')
  ) {
    result = 'input';
  } else if (type === 'cron') {
    result = 'input-cron';
  } else if (INPUT_LIST.includes(type || '')) {
    result = 'input-' + type;
  }
  return KEY_COMPONENT_NAME + result;
};

export const formInitVal = (list: Record<string, any>[] = []) => {
  let tableForm: Record<string, any> = {};
  list.forEach((ele) => {
    if (
      ['rate', 'slider', 'number'].includes(ele.type) ||
      ele.dataType === 'number' ||
      (ele.type == 'select' && ele.virtualize == true)
    ) {
      tableForm[ele.prop] = undefined;
    } else if (
      (ARRAY_VALUE_LIST.includes(ele.type) &&
        ele.emitPath !== false &&
        ele.dataType != 'json') ||
      (MULTIPLE_LIST.includes(ele.type) && ele.multiple) ||
      ele.dataType === 'array'
    ) {
      tableForm[ele.prop] = [];
    } else if (RANGE_LIST.includes(ele.type) && ele.range == true) {
      tableForm[ele.prop] = [0, 0];
    } else {
      tableForm[ele.prop] = '';
    }
    if (ele.bind) {
      tableForm = createObj(tableForm, ele.bind);
    }
    if (!validatenull(ele.value)) {
      tableForm[ele.prop] = ele.value;
    }
  });
  return tableForm;
};

export const getPlaceholder = function (column: Record<string, any>, type?: string) {
  const placeholder = column.placeholder;
  const label = column.label;
  if (type === 'search') {
    const searchPlaceholder = column.searchPlaceholder;
    if (!validatenull(searchPlaceholder)) {
      return searchPlaceholder;
    } else {
      return label;
    }
  } else if (validatenull(placeholder)) {
    if (SELECT_LIST.includes(column.type)) {
      return `${t('tip.select')} ${label}`;
    } else {
      return `${t('tip.input')} ${label}`;
    }
  }

  return placeholder;
};
