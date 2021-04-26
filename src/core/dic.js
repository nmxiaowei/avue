import packages from 'core/packages';
import { validatenull } from 'utils/validate';
import { getObjValue, detailDic } from 'utils/util';
export const loadCascaderDic = (columnOption, list) => {
  return new Promise((resolve, reject) => {
    let columnList = [];
    let result = [];
    let networkdic = {};
    columnOption.forEach(ele => {
      if (ele.parentProp) columnList.push(ele);
    });
    list.forEach((ele, index) => {
      columnList.forEach(column => {
        if (column.hide !== true && column.dicFlag !== false) {
          result.push(
            new Promise(resolve => {
              if (validatenull(ele[column.parentProp])) {
                resolve({
                  prop: column.prop,
                  data: [],
                  index: index
                });
              } else {
                if (column.dicUrl) {
                  sendDic(Object.assign({
                    url: `${column.dicUrl.replace('{{key}}', ele[column.parentProp])}`
                  }, {
                    props: column.props,
                    method: column.dicMethod,
                    formatter: column.dicFormatter,
                    query: column.dicQuery
                  })).then(res => {
                    resolve({
                      prop: column.prop,
                      data: res,
                      index: index
                    });
                  });
                }
              }
            })
          );
        }
      });
    });
    Promise.all(result).then(data => {
      data.forEach(ele => {
        if (validatenull(networkdic[ele.index])) networkdic[ele.index] = {};
        networkdic[ele.index][ele.prop] = ele.data;
      });
      resolve(networkdic);
    });
  });
};
export const loadDic = (option) => {
  let ajaxdic = []; // 发送ajax的字典
  return new Promise((resolve, reject) => {
    const params = createdDic(option);
    ajaxdic = params.ajaxdic;
    if (!window.axios && !validatenull(ajaxdic)) {
      packages.logs('axios');
      resolve();
    }
    handleDic(ajaxdic)
      .then((res) => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
};
export const loadLocalDic = (option) => {
  let locationdic = {};
  let alldic = option.dicData || {};
  option.column.forEach(ele => {
    if (ele.dicData) locationdic[ele.prop] = detailDic(ele.dicData, ele.props, ele.dataType);
  });
  return Object.assign(alldic, locationdic);
};
function createdDic (option) {
  let column = option.column || [];
  let ajaxdic = [];
  let locationdic = {};
  let flagdic = [];
  column.forEach(ele => {
    let dicData = ele.dicData;
    let dicUrl = ele.dicUrl;
    let prop = ele.prop;
    let parentProp = ele.parentProp;
    flagdic = flagdic.concat(ele.cascaderItem || []);
    if (Array.isArray(dicData)) {
      locationdic[prop] = dicData;
    }
    if (ele.dicFlag === false || flagdic.includes(prop)) return;
    if (dicUrl && !parentProp) {
      ajaxdic.push({
        url: dicUrl,
        name: prop,
        method: ele.dicMethod,
        formatter: ele.dicFormatter,
        props: ele.props,
        dataType: ele.dataType,
        resKey: (ele.props || {}).res,
        query: ele.dicQuery
      });
    }
  });
  return {
    ajaxdic,
    locationdic
  };
}

// 循环处理字典
function handleDic (list) {
  let networkdic = {};
  let result = [];
  return new Promise(resolve => {
    list.forEach(ele => {
      result.push(
        new Promise(resolve => {
          sendDic(Object.assign(ele, {
            url: `${ele.url.replace('{{key}}', '')}`
          })).then(res => {
            res = detailDic(res, ele.props, ele.dataType);
            resolve(res);
          }).catch(() => {
            resolve([]);
          });
        })
      );
    });
    Promise.all(result).then(data => {
      list.forEach((ele, index) => {
        networkdic[ele.name] = data[index];
      });
      resolve(networkdic);
    });
  });
}

// ajax获取字典
export const sendDic = (params) => {
  let { url, query, method, resKey, props, formatter, value = '', column, form = {} } = params;
  if (column) {
    url = column.dicUrl;
    method = column.dicMethod;
    query = column.dicQuery;
    formatter = column.dicFormatter;
    props = column.props;
  }
  let key = "key"
  url = url || '';
  let list = [];
  let data = {};
  if (method === 'post') {
    list = Object.keys(query);
    list.forEach(ele => {
      let eleKey = query[ele] + '';
      let eleValue = form[eleKey.replace(/\{{|}}/g, '')];
      if (eleKey.match(/\{{|}}/g)) {
        data[ele] = eleKey.replace(eleKey, eleKey.indexOf(key) !== -1 ? value : eleValue);
      } else {
        data[ele] = eleKey;
      }
    });
  } else {
    list = url.match(/[^\{\}]+(?=\})/g) || [];
    list.forEach(ele => {
      let eleKey = `{{${ele}}}`;
      let eleValue = form[ele];
      if (ele === key) url = url.replace(eleKey, value);
      else url = url.replace(eleKey, eleValue);
    })
  }
  if (props) resKey = (props || {}).res || resKey;
  return new Promise(resolve => {
    const callback = (res) => {
      let list = [];
      if (typeof formatter === 'function') {
        list = formatter(res.data);
      } else {
        list = getObjValue(res.data, resKey);
      }
      resolve(list);
    };
    if (!window.axios) {
      packages.logs('axios');
      resolve([]);
    }
    if (method === 'post') {
      window.axios.post(url, data).then(function (res) {
        callback(res);
      }).catch(() => [
        resolve([])
      ]);
    } else {
      window.axios.get(url, {
        params: query
      }).then(function (res) {
        callback(res);
      }).catch(() => [
        resolve([])
      ]);
    }
  });
};
