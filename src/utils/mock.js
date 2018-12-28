
import packages from 'core/packages';



export default (column, dic, defaultForm, run) => {
  if (!run) return
  if (!window.Mock) {
    packages.logs("mock");
    return
  }
  let mockjs = window.Mock;
  let Random = (mockjs || {}).Random;
  let form = {};
  function createName({ en }) {
    if (en) {
      return Random.name(true);
    }
    return Random.cname();
  }

  function createNumber({ max, min, precision }) {
    if (precision) {
      const number = Random.float(min, max, precision) + '';
      const index = number.indexOf('.') + 1;
      return Number(number.substring(0, index + precision));
    } else {
      return Random.integer(min, max);
    }
  }

  function createUrl({ header, footer }) {
    let url = Random.url();
    const index = url.indexOf('://');
    if (header === false) {
      url = url.substring(index + 3);
    } else {
      url = 'http://' + url.substring(index + 3);
    }
    return url;
  }

  function createDatetime({ format, now }) {
    if (now) {
      return Random.now(format);
    }
    return Random.datetime(format);
  }

  function createText({ min, max }) {
    return Random.csentence(min, max);
  }

  function createCounty() {
    return Random.county(true);
  }

  function createDic({ dic, props, columnType, multiple }) {
    const value = props.value || 'value';
    const len = dic.length;
    if (['checkbox'].includes(columnType) || multiple) {
      const number = createNumber({
        min: 1,
        max: len
      });
      let result = [];
      for (let i = 0; i < number; i++) {
        let flag = true;
        while (flag) {
          const numbers = createNumber({
            min: 0,
            max: len - 1
          });
          const values = dic[numbers][value];
          if (!result.includes(values)) {
            result.push(values);
            flag = false;
          }
        }
      }
      return result;
    } else {
      const number = createNumber({
        min: 0,
        max: len - 1
      });
      return dic[number][value];
    }
  }

  function create() {
    Object.keys(column).forEach(index => {
      const ele = column[index];
      if (ele.mock && typeof ele.mock === 'object') {
        let params = ele.mock;
        params.dic =
          typeof ele.dicData === 'string'
            ? dic[ele.dicData]
            : ele.dicData || [];
        params.props = ele.props || {};
        params.columnType = ele.type;
        params.multiple = ele.multiple;
        switch (params.type) {
          case 'name':
            form[ele.prop] = createName(params);
            break;
          case 'number':
            form[ele.prop] = createNumber(params);
            break;
          case 'datetime':
            form[ele.prop] = createDatetime(params);
            break;
          case 'word':
            form[ele.prop] = createText(params);
            break;
          case 'url':
            form[ele.prop] = createUrl(params);
            break;
          case 'county':
            form[ele.prop] = createCounty(params);
            break;
          case 'dic':
            form[ele.prop] = createDic(params);
            break;
        }
      } else if (ele.mock instanceof Function) {
        form[ele.prop] = ele.mock(defaultForm)
      }
    });
  }
  create();
  return form;
};
