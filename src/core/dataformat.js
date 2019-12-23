import { validatenull } from 'utils/validate';
import { KEY_COMPONENT_NAME } from 'global/variable';
import { detailDataType } from 'utils/util';
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
        if (list[columnIndex]) {
          list[columnIndex].parentProp = parentProp;
          list[columnIndex].cascaderChange = ele.cascaderChange;
          list[columnIndex].cascader = [...cascader].splice(cindex + 1);
          parentProp = list[columnIndex].prop;
        }

      });
    }
  });
  return list;
};
/**
 * 计算空白列row
 */
let count = 0;
export const calcCount = (ele, spanDefault = 12, init = false) => {
  if (init) count = 0;
  const spanAll = 24;
  count = count + (ele.span || spanDefault) + (ele.offset || 0);
  if (count === spanAll) {
    count = 0;
  } else if (count > spanAll) {
    count = 0 + (ele.span || spanDefault) + (ele.offset || 0);
  } else if (ele.row && count !== spanAll) {
    ele.count = spanAll - count;
    count = 0;
  }
  return ele;
};
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
  'monthrange',
  'dategrpup',
  'year'
];
/**
 * 初始化数据格式
 */
export const initVal = ({ listType, type, multiple, dataType, value }) => {
  let list = value;
  if (
    (['select', 'tree'].includes(type) && multiple) ||
    ['checkbox', 'cascader', 'dynamic', 'upload', 'img', 'array'].includes(type)
  ) {
    // 单个头像特殊处理
    if (listType === 'picture-img' && type === 'upload') {
      list = [value];
    } else if (!Array.isArray(value)) {
      if (!validatenull(value)) {
        list = (value || '').split(',') || [];
      } else {
        list = [];
      }
    }
    // 数据转化
    list.map((ele, index) => {
      list[index] = detailDataType(ele, dataType);
    });
  }
  return list;
};

/**
 * 搜索框获取动态组件
 */
export const getSearchType = (column, component = false) => {
  const type = column.type;
  const range = column.searchRange;
  let result = type || 'input';
  if (['select', 'radio', 'checkbox', 'switch'].includes(type)) {
    result = 'select';
  } else if (['time', 'timerange'].includes(type)) {
    result = 'time';
  } else if (dateList.includes(type)) {
    if (range) {
      if (type === 'date') {
        result = 'daterange';
      } else if (type === 'datetime') {
        result = 'datetimerange';
      } else if (type === 'time') {
        result = 'timerange';
      } else {
        result = type;
      }
    } else {
      result = 'date';
    }
  } else if (['cascader'].includes(type)) {
    result = 'cascader';
  } else if (['number'].includes(type)) {
    result = 'input-number';
  }
  if (component) {
    result = KEY_COMPONENT_NAME + result;
  }
  return result;

};

/**
 * 动态获取组件
 */
export const getComponent = (type, component) => {
  let result = 'input';
  if (!validatenull(component)) {
    result = component;
  } else if (['img', 'array'].includes(type)) {
    result = 'array';
  } else if (type === 'select') {
    result = 'select';
  } else if (type === 'radio') {
    result = 'radio';
  } else if (type === 'checkbox') {
    result = 'checkbox';
  } else if (['time', 'timerange'].includes(type)) {
    result = 'time';
  } else if (dateList.includes(type)) {
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
  } else if (type === 'slider') {
    result = 'slider';
  } else if (type === 'dynamic') {
    result = 'dynamic';
  } else if (type === 'icon-select') {
    result = 'icon-select';
  } else if (type === 'color') {
    result = 'color';
  }
  return KEY_COMPONENT_NAME + result;
};

/**
 * 表格初始化值
 */

export const formInitVal = (list = []) => {
  let tableForm = {};
  list.forEach(ele => {
    if (
      ele.type === 'checkbox' ||
      ele.type === 'cascader' ||
      ele.type === 'dynamic' ||
      ele.type === 'img' ||
      ele.type === 'array' ||
      ele.type === 'dates' ||
      (ele.type === 'tree' && ele.multiple) ||
      (ele.type === 'select' && ele.multiple) ||
      (ele.type === 'upload' && ele.listType !== 'picture-img') ||
      ele.range ||
      ele.dataType === 'array'
    ) {
      tableForm[ele.prop] = [];
    } else if (
      ['number', 'rate', 'slider'].includes(ele.type) ||
      ele.dataType === 'number'
    ) {
      tableForm[ele.prop] = undefined;
    } else {
      tableForm[ele.prop] = '';
    }
    // 表单默认值设置
    if (!validatenull(ele.value)) {
      tableForm[ele.prop] = ele.value;
    }
  });
  return {
    tableForm
  };
};

export const getPlaceholder = function(column, type) {
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
      return `${this.t('tip.select')} ${label}`;
    } else {
      return `${this.t('tip.input')} ${label}`;
    }
  }

  return placeholder;
};
