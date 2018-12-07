import { validatenull } from 'utils/validate';
import { KEY_COMPONENT_NAME } from 'global/variable';
/**
 * 初始化数据格式
 */
export const initVal = ({ type, multiple, value, listType }) => {
  if (
    (['select', 'tree'].includes(type) && multiple) ||
    ['checkbox', 'cascader'].includes(type) ||
    (['upload'].includes(type) && listType !== 'picture-img')
  ) {
    if (!Array.isArray(value)) return (value || '').split(',');
    else return value;
  } else {
    return value;
  }
};

/**
 * 搜索框获取动态组件
 */
export const getSearchType = type => {
  let result = 'input';
  if (['select', 'radio', 'checkbox', 'switch'].includes(type)) {
    result = 'select';
  } else if (['time', 'timerange'].includes(type)) {
    result = 'time';
  } else if (
    [
      'dates',
      'date',
      'datetime',
      'datetimerange',
      'daterange',
      'dategrpup',
      'week',
      'month',
      'year'
    ].includes(type)
  ) {
    result = 'date';
  } else if (['cascader'].includes(type)) {
    result = 'cascader';
  } else if (['number'].includes(type)) {
    result = 'inputNumber';
  }
  return KEY_COMPONENT_NAME + result;
};

/**
 * 动态获取组件
 */
export const getComponent = (type, component) => {
  let result = 'input';
  if (!validatenull(component)) {
    result = component;
  } else if (type === 'select') {
    result = 'select';
  } else if (type === 'radio') {
    result = 'radio';
  } else if (type === 'checkbox') {
    result = 'checkbox';
  } else if (['time', 'timerange'].includes(type)) {
    result = 'time';
  } else if (
    [
      'dates',
      'date',
      'datetime',
      'datetimerange',
      'daterange',
      'week',
      'month',
      'dategrpup',
      'year'
    ].includes(type)
  ) {
    result = 'date';
  } else if (type === 'cascader') {
    result = 'cascader';
  } else if (type === 'number') {
    result = 'inputNumber';
  } else if (type === 'password') {
    result = 'input';
  } else if (type === 'switch') {
    result = 'switch';
  } else if (type === 'rate') {
    result = 'rate';
  } else if (type === 'upload') {
    result = 'upload';
  } else if (type === 'silder') {
    result = 'silder';
  }
  return KEY_COMPONENT_NAME + result;
};

/**
 * 表格初始化值
 */

export const formInitVal = (list = []) => {
  let tableForm = {};
  let searchForm = {};
  list.forEach(ele => {
    if (
      ele.type === 'checkbox' ||
      ele.type === 'cascader' ||
      ele.type === 'dates' ||
      (ele.type === 'upload' && ele.listType !== 'picture-img') ||
      ele.multiple ||
      ele.range ||
      ele.dataType === 'array'
    ) {
      tableForm[ele.prop] = [];
      if (ele.search) searchForm[ele.prop] = [];
    } else if (
      ['number', 'rate', 'silder'].includes(ele.type) ||
      ele.dataType === 'number'
    ) {
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
    // 表单默认值设置
    if (!validatenull(ele.valueDefault)) tableForm[ele.prop] = ele.valueDefault;
    // 搜索表单默认值设置
    if (!validatenull(ele.searchDefault)) {
      searchForm[ele.prop] = ele.searchDefault;
    }
  });
  return {
    tableForm,
    searchForm
  };
};

export const getPlaceholder = (column, type) => {
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
    if (['select', 'checkbox', 'radio', 'tree'].includes(column.type)) {
      return `请选择${label}`;
    } else {
      return `请输入${label}`;
    }
  }

  return placeholder;
};

export const getType = column => {
  const type = column.type;
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
