import axios from 'axios';
import $log from 'plugin/logs/util';
import { validatenull } from 'utils/validate';
let locationdic = {}; // 本地字典
let networkdic = {}; // 网络字典
let ajaxdic = []; // 发送ajax的字典

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
        result.push(
          new Promise(resolve => {
            if (validatenull(ele[column.parentProp])) {
              resolve({
                prop: column.prop,
                data: [],
                index: index
              });
            } else {
              sendDic(
                `${column.dicUrl.replace('{{key}}', ele[column.parentProp])}`
              ).then(res => {
                resolve({
                  prop: column.prop,
                  data: res,
                  index: index
                });
              });
            }
          })
        );
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
export const loadDic = option => {
  locationdic = {};
  networkdic = {};
  ajaxdic = [];
  return new Promise((resolve, reject) => {
    // 本地字典赋值
    locationdic = option.dicData || {};

    createdDic(option.dicUrl, option.column);

    if (!validatenull(ajaxdic)) {
      if (axios) {
        handeDic()
          .then(res => {
            resolve(Object.assign(locationdic, networkdic));
          })
          .catch(err => {
            reject(err);
          });
      } else {
        if (__ENV__ === 'development') {
          $log.warning('使用网络字典需要引入以下包');
          $log.capsule(
            'axios：',
            'https://cdn.bootcss.com/axios/0.19.0-beta.1/axios.js',
            'warning'
          );
        }
      }
    } else {
      resolve(locationdic);
    }
  });
};

// 创建字典区分本地字典和网络字典
function createdDic(url = '', column = []) {
  column.forEach(ele => {
    let dicData = ele.dicData;
    let dicUrl = ele.dicUrl;
    let prop = ele.prop;
    if (ele.dicFlag === false) return;
    if (Array.isArray(dicData)) {
      locationdic[prop] = dicData;
    } else if (!validatenull(dicUrl)) {
      ajaxdic.push({
        url: dicUrl || url,
        name: dicData || prop
      });
    }
  });
}

// 循环处理字典
function handeDic() {
  let result = [];
  return new Promise(resolve => {
    ajaxdic.forEach(ele => {
      result.push(
        new Promise(resolve => {
          sendDic(`${ele.url.replace('{{key}}', ele.name)}`).then(res => {
            resolve(res);
          });
        })
      );
    });
    Promise.all(result).then(data => {
      ajaxdic.forEach((ele, index) => {
        networkdic[ele.name] = data[index];
      });
      resolve(networkdic);
    });
  });
}

// ajax获取字典
export const sendDic = path => {
  return new Promise(resolve => {
    axios.get(path).then(function(res) {
      // 降级处理
      const list = res.data;
      if (!validatenull(list.data)) {
        resolve(Array.isArray(list.data) ? list.data : []);
      } else if (!validatenull(list)) {
        resolve(Array.isArray(list) ? list : []);
      } else {
        resolve([]);
      }
    });
  });
};
