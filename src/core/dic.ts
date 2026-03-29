import { detailDataType, getAsVal } from 'utils/util';
import { validatenull } from 'utils/validate';
import { DIC_PROPS } from 'global/variable';

const key = 'key';

function getDataType(list: Record<string, any>[] = [], props: Record<string, any> = {}, type: any) {
  const valueKey = props.value || DIC_PROPS.value;
  const childrenKey = props.children || DIC_PROPS.children;
  list.forEach((ele) => {
    ele[valueKey] = detailDataType(ele[valueKey], type);
    if (ele[childrenKey]) getDataType(ele[childrenKey], props, type);
  });
  return list;
}

function getResData(data: any, props: Record<string, any>, dataType: any) {
  const bind = props.res;
  let res = data;
  const deep = data.data;
  if (bind) {
    res = getAsVal(res, bind);
  } else if (deep) {
    res = Array.isArray(deep) ? deep : [deep];
  }
  if (dataType) res = getDataType(res, props, dataType);
  return res;
}

export const loadCascaderDic = (columnOption: Record<string, any>[], safe: any) => {
  return new Promise<Record<string, any>>((resolve) => {
    const list: Promise<any>[] = [];
    const result: Record<string, any> = {};
    const columnList = columnOption.filter((ele) => ele.parentProp);
    safe.data.forEach((ele: any, index: number) => {
      if (!safe.cascaderDIC[index]) safe.cascaderDIC[index] = {};
      columnList.forEach((column) => {
        if (column.hide !== true && column.dicFlag !== false) {
          list.push(
            new Promise((resolve) => {
              if (ele[column.parentProp]) {
                sendDic(
                  {
                    url: column.dicUrl,
                    props: column.props,
                    method: column.dicMethod,
                    headers: column.dicHeaders,
                    formatter: column.dicFormatter,
                    query: column.dicQuery,
                    dataType: column.dataType,
                    form: ele,
                    value: ele[column.parentProp],
                  },
                  safe
                ).then((res) => {
                  const obj = {
                    prop: column.prop,
                    data: res,
                    index,
                  };
                  safe.cascaderDIC[index][obj.prop] = obj.data;
                  resolve(obj);
                });
              } else {
                const obj = {
                  prop: column.prop,
                  data: [],
                  index,
                };
                safe.cascaderDIC[index][obj.prop] = obj.data;
                resolve(obj);
              }
            })
          );
        }
      });
    });
    Promise.all(list).then((data: any[]) => {
      data.forEach((ele) => {
        if (!result[ele.index]) result[ele.index] = {};
        result[ele.index][ele.prop] = ele.data;
      });
      resolve(result);
    });
  });
};

export const loadDic = (option: Record<string, any>, safe: any) => {
  return new Promise<Record<string, any>>((resolve) => {
    const list: Promise<any>[] = [];
    const result: Record<string, any> = {};
    let notList: string[] = [];
    const nameList: string[] = [];
    const column = option.column || [];
    column.forEach((ele: any) => {
      const url = ele.dicUrl;
      const prop = ele.prop;
      const parentProp = ele.parentProp;
      notList = notList.concat(ele.cascader || []);
      const flag = ele.dicFlag === false || ele.lazy === true || notList.includes(prop);
      if (url && !parentProp && !flag) {
        list.push(
          new Promise((resolve) => {
            sendDic(
              {
                url,
                name: prop,
                method: ele.dicMethod,
                headers: ele.dicHeaders,
                formatter: ele.dicFormatter,
                props: ele.props,
                dataType: ele.dataType,
                query: ele.dicQuery,
              },
              safe
            ).then((res) => {
              safe.DIC[prop] = res;
              resolve(res);
            });
          })
        );
        nameList.push(prop);
      }
    });
    Promise.all(list).then((res: any[]) => {
      nameList.forEach((ele, index) => {
        result[ele] = res[index];
      });
      resolve(result);
    });
  });
};

export const loadLocalDic = (option: Record<string, any>, safe: any) => {
  const columnData: Record<string, any> = {};
  const optionData = option.dicData || {};
  option.column.forEach((ele: any) => {
    const dic = ele.dicData;
    const prop = ele.prop;
    if (dic instanceof Function) {
      const dicResult = dic(ele);
      if (dicResult instanceof Promise) {
        dicResult.then((res: any[]) => {
          safe.DIC[prop] = getDataType(res, ele.props, ele.dataType);
        });
      } else {
        columnData[prop] = getDataType(dicResult, ele.props, ele.dataType);
      }
    } else if (dic instanceof Array) {
      columnData[prop] = getDataType(dic, ele.props, ele.dataType);
    }
  });
  const result = { ...optionData, ...columnData };
  Object.keys(result).forEach((ele) => {
    safe.DIC[ele] = result[ele];
  });
  return result;
};

export const sendDic = (params: Record<string, any>, safe: any) => {
  let {
    url,
    query,
    method,
    props,
    formatter,
    headers,
    value,
    column = {},
    form = {},
    dataType,
  } = params;
  url = column.dicUrl || url;
  method = (column.dicMethod || method || 'get').toLowerCase();
  headers = column.dicHeaders || headers || {};
  query = column.dicQuery || query || {};
  formatter = column.dicFormatter || formatter;
  props = column.props || props || {};
  const list = url.match(/[^\{\}]+(?=\})/g) || [];
  list.forEach((ele: string) => {
    let result = ele === key ? value : form[ele];
    if (validatenull(result)) result = '';
    url = url.replace(`{{${ele}}}`, result);
  });

  const getKey = (data: Record<string, any>) => {
    const result: Record<string, any> = {};
    Object.keys(data).forEach((ele) => {
      const eleKey = data[ele];
      if (typeof eleKey === 'string' && eleKey.match(/\{{|}}/g)) {
        const prop = eleKey.replace(/\{{|}}/g, '');
        result[ele] = prop == key ? value : form[prop];
      } else {
        result[ele] = eleKey;
      }
    });
    return result;
  };

  return new Promise<any[]>((resolve, reject) => {
    if (!url) resolve([]);
    const callback = (res: any) => {
      let currentList: any[] = [];
      res = res.data || {};
      if (typeof formatter === 'function') {
        currentList = formatter(res, form);
      } else {
        currentList = getResData(res, props, dataType);
      }
      resolve(currentList);
    };
    const getData = () => {
      const data = getKey(query);
      if (method == 'get') return { params: data };
      return { data };
    };
    safe
      .$axios(
        Object.assign(
          {
            url,
            method,
            headers: getKey(headers),
          },
          getData()
        )
      )
      .then(function (res: any) {
        callback(res);
      })
      .catch((err: any) => {
        reject(err);
      });
  });
};
