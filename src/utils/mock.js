import packages from 'core/packages';

export default (column, dicData, defaultForm, run) => {
  if (!run) return;
  if (!window.Mock) {
    packages.logs('mock');
    return;
  }
  let mockjs = window.Mock;
  let Random = (mockjs || {}).Random;
  let form = {};

  function createName({
    en
  }) {
    if (en) {
      return Random.name(true);
    }
    return Random.cname();
  }

  function createImage({
    size,
    text,
    base64
  }) {
    // 确定图片生成参数
    let imageSize = size || Random.natural(200, 400); // 默认图片大小为随机数
    let textColor = text ? '#000000' : Random.color(); // 文本颜色，默认黑色或随机颜色
    let bgColor = text ? '#ffffff' : Random.color(); // 背景颜色，默认白色或随机颜色

    // 判断是否有数据源，选择生成图片
    if (base64) {
      return Random.dataImage(imageSize, text);
    } else {
      return Random.image(imageSize, bgColor, textColor, 'png', text || Random.name());
    }
  }

  function createId({
    uuid
  }) {
    if (uuid) {
      return mockjs.mock('@guid');
    }
    return mockjs.mock('@id');
  }

  function createTel() {
    return mockjs.mock(/^1[3-9]\d{9}$/);
  }

  function createNumber({
    max,
    min,
    precision
  }) {
    if (precision) {
      const number = Random.float(min, max, precision) + '';
      const index = number.indexOf('.') + 1;
      return Number(number.substring(0, index + precision));
    } else {
      return Random.integer(min, max);
    }
  }

  function createUrl({
    header,
    footer
  }) {
    let url = Random.url();
    const index = url.indexOf('://');
    if (header === false) {
      url = url.substring(index + 3);
    } else {
      url = 'http://' + url.substring(index + 3);
    }
    return url;
  }

  function createDatetime({
    format,
    now
  }) {
    if (now) {
      return Random.now(format);
    }
    return Random.datetime(format);
  }

  function createText({
    min,
    max
  }) {
    return Random.csentence(min, max);
  }

  function createCounty() {
    return Random.county(true);
  }

  function createDic({
    dic,
    props,
    columnType,
    multiple
  }) {
    const value = props.value || 'value';
    const len = dic.length;
    if (len === 0) return;
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
      const isObject = typeof ele.mock === 'object';
      const params = isObject ? ele.mock || {} : {};
      params.dic = dicData[ele.prop] || [];
      params.props = ele.props || {};
      params.columnType = ele.type;
      params.multiple = ele.multiple;

      // 根据类型生成相应的数据
      const dataGenerator = {
        'name': createName,
        'number': createNumber,
        'datetime': createDatetime,
        'word': createText,
        'tel': createTel,
        'id': createId,
        'image': createImage,
        'url': createUrl,
        'county': createCounty,
        'dic': createDic
      };
      if (isObject && dataGenerator[params.type]) {
        if (params.array) {
          form[ele.prop] = Array.from({
            length: params.array
          }, () => dataGenerator[params.type](params));
        } else {
          form[ele.prop] = dataGenerator[params.type](params);
        }

      } else if (ele.mock instanceof Function) {
        form[ele.prop] = ele.mock(defaultForm, mockjs);
      }
    });
  }
  create();
  return form;
};
