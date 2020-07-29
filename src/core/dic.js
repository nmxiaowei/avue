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
// 初始化方法
export const loadDic = (option, flag) => {
  let locationdic = {}; // 本地字典
  let networkdic = {}; // 网络字典
  let ajaxdic = []; // 发送ajax的字典
  return new Promise((resolve, reject) => {
    const params = createdDic(option);
    locationdic = Object.assign(cacheDic(option), params.locationdic);
    ajaxdic = flag ? [] : params.ajaxdic;
    if (validatenull(locationdic) && validatenull(ajaxdic)) resolve();
    if (!window.axios && !validatenull(ajaxdic)) {
      packages.logs('axios');
      resolve();
    }
    handeDic(ajaxdic)
      .then((res) => {
        networkdic = res;
        Object.keys(locationdic).forEach(ele => {
          networkdic[ele] = locationdic[ele].concat(networkdic[ele] || []);
        });
        resolve(networkdic);
      })
      .catch(err => {
        reject(err);
      });
  });
};

function cacheDic(option) {
  let locationdic = {};
  let alldic = option.dicData || {};
  option.column.forEach(ele => {
    let prop = ele.prop;
    if (ele.dicFlag !== true && alldic[prop]) {
      locationdic[prop] = alldic[prop];
    }
  });
  return locationdic;
}
// 创建字典区分本地字典和网络字典
function createdDic(option) {
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
function handeDic(list) {
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
  let { url, query, method, resKey, props, formatter, value, column, form = {} } = params;
  if (column) {
    url = column.dicUrl;
    method = column.dicMethod;
    query = column.dicQuery;
    formatter = column.dicFormatter;
    props = column.props;
  }
  url = url || '';
  let list = url.match(/[^\{\}]+(?=\})/g);
  list = list || [];
  list.forEach(ele => {
    if (ele === 'key') url = url.replace('{{key}}', value || '');
    else url = url.replace('{{' + ele + '}}', form[ele] || '');
  });
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
      window.axios.post(url, query).then(function(res) {
        callback(res);
      }).catch(() => [
        resolve([])
      ]);
    } else {
      window.axios.get(url, {
        params: query
      }).then(function(res) {
        callback(res);
      }).catch(() => [
        resolve([])
      ]);
    }
  });
};
