import { validatenull } from 'utils/validate';
import { KEY_COMPONENT_NAME } from 'global/variable';
/**
 * 计算级联属性
 */
export const calcCascader = (list = []) => {
  list.forEach((ele, index) => {
    if (ele.cascaderItem) {
      let cascader = [...ele.cascaderItem];
      let parentProp = ele.prop;
      list[index].cascader = [...cascader];
      cascader.forEach((citem, cindex) => {
        const columnIndex = index + cindex + 1;
        list[columnIndex].parentProp = parentProp;
        list[columnIndex].cascaderChange = ele.cascaderChange;
        list[columnIndex].cascader = [...cascader].splice(cindex + 1);
        parentProp = list[columnIndex].prop;
      });
    }
  })
  return list;
}
/**
 * 计算空白列row
 */
let count = 0;
export const calcCount = (ele, spanDefault = 12, init = false) => {
  if (init) count = 0;
  const spanAll = 24;
  count = count + (ele.span || spanDefault);
  if (count === spanAll) {
    count = 0;
  } else if (count > spanAll) {
    count = 0 + (ele.span || spanDefault);
  } else if (ele.row && count !== spanAll) {
    ele.count = spanAll - count;
    count = 0;
  }
  return ele;
}
/** 
* 日期控件集合
*/
export const dateList = [
  'dates',
  'date',
  'datetime',
  'datetimerange',
  'daterange',
  'week',
  'month',
  'dategrpup',
  'year'
];
/**
 * 初始化数据格式
 */
export const initVal = ({ type, multiple, value }) => {

  if (
    (['select', 'tree'].includes(type) && multiple) ||
    ['checkbox', 'cascader', 'dynamic'].includes(type) ||
    (['upload'].includes(type))
  ) {
    if (!Array.isArray(value)) {
      if (validatenull(value)) return [];
      return (value || '').split(',');
    }
    return value;
  }
  return value;
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
  } else if (dateList.includes(type)) {
    result = 'date';
  } else if (['cascader'].includes(type)) {
    result = 'cascader';
  } else if (['number'].includes(type)) {
    result = 'input-number';
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
    result = 'input-number';
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
  } else if (type === 'dynamic') {
    result = 'dynamic';
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
      ele.type === 'dynamic' ||
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
