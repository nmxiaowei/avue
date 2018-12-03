import axios from 'axios';
import { validatenull } from 'utils/validate';
let locationdic = {}; // 本地字典
let networkdic = {}; // 网络字典
let ajaxdic = []; // 发送ajax的字典

// 初始化方法
export const loadDic = option => {
  locationdic = {};
  networkdic = {};
  ajaxdic = [];
  return new Promise((resolve, reject) => {
    // 本地字典赋值
    locationdic = option.dicData || [];

    createdDic(option.dicUrl, option.column);

    handeDic()
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
};

// 创建字典区分本地字典和网络字典
function createdDic(url = '', column = []) {
  let prop = column.prop;
  column.forEach(ele => {
    let dicData = ele.dicData;
    let dicUrl = ele.dicUrl;
    if (ele.dicFlag === false) return;
    if (Array.isArray(dicData)) {
      locationdic[prop] = dicData;
    } else if (!validatenull(dicUrl)) {
      ajaxdic.push({
        url: dicUrl || url,
        name: dicData
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
          sendDic(`${ele.dicUrl.replace('{{key}}', ele.dicData)}`).then(res => {
            resolve(res);
          });
        })
      );
    });
    Promise.all(result).then(data => {
      ajaxdic.forEach((ele, index) => {
        networkdic[ele.dicData] = data[index];
      });
      resolve(Object.assign(locationdic, networkdic));
    });
  });
}

// ajax获取字典
function sendDic(path) {
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
}
