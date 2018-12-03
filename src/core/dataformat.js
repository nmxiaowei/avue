import { validatenull } from 'utils/validate';
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
  if (['select', 'radio', 'checkbox'].includes(type)) {
    return 'crudSelect';
  } else if (['time', 'timerange'].includes(type)) {
    return 'crudTime';
  } else if (
    [
      'dates',
      'date',
      'datetime',
      'datetimerange',
      'daterange',
      'week',
      'month',
      'year'
    ].includes(type)
  ) {
    return 'crudDate';
  } else if (['cascader'].includes(type)) {
    return 'crudCascader';
  } else if (['number'].includes(type)) {
    return 'crudInputNumber';
  } else {
    return 'crudInput';
  }
};

/**
 * 动态获取组件
 */
export const getComponent = ({ type, component }) => {
  if (!validatenull(component)) {
    return component;
  } else if (type === 'select') {
    return 'crudSelect';
  } else if (type === 'radio') {
    return 'crudRadio';
  } else if (type === 'checkbox') {
    return 'crudCheckbox';
  } else if (['time', 'timerange'].includes(type)) {
    return 'crudTime';
  } else if (
    [
      'dates',
      'date',
      'datetime',
      'datetimerange',
      'daterange',
      'week',
      'month',
      'year'
    ].includes(type)
  ) {
    return 'crudDate';
  } else if (type === 'cascader') {
    return 'crudCascader';
  } else if (type === 'number') {
    return 'crudInputNumber';
  } else if (type === 'password') {
    return 'crudInput';
  } else if (type === 'switch') {
    return 'crudSwitch';
  } else if (type === 'rate') {
    return 'crudRate';
  } else if (type === 'upload') {
    return 'crudUpload';
  } else if (type === 'silder') {
    return 'crudSilder';
  } else {
    return 'crudInput';
  }
};

/**
 * 表格初始化值
 */

export const formInitVal = list => {
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
