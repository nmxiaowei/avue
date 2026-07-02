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

export const loadCascaderDic = async (
  columnOption: Record<string, any>[] = [],
  safe: any,
) => {
  const columnList = columnOption.filter((ele) => ele.parentProp);
  const tasks: Promise<{ prop: string; data: any[]; index: number }>[] = [];

  (safe.data || []).forEach((form: any, index: number) => {
    columnList.forEach((column) => {
      if (column.hide === true || column.dicFlag === false) return;

      const value = form[column.parentProp];
      if (validatenull(value)) {
        tasks.push(Promise.resolve({ prop: column.prop, data: [], index }));
        return;
      }

      tasks.push(
        sendDic(
          {
            url: column.dicUrl,
            props: column.props,
            method: column.dicMethod,
            headers: column.dicHeaders,
            formatter: column.dicFormatter,
            query: column.dicQuery,
            dataType: column.dataType,
            form,
            value,
          },
          safe,
        ).then((data) => ({ prop: column.prop, data, index })),
      );
    });
  });

  const result: Record<string, any> = {};
  const data = await Promise.all(tasks);
  data.forEach((item) => {
    if (!result[item.index]) result[item.index] = {};
    result[item.index][item.prop] = item.data;
  });
  return result;
};

export const loadDic = async (option: Record<string, any>, safe: any) => {
  let notList: string[] = [];
  const tasks: Promise<{ prop: string; data: any[] }>[] = [];
  const column = option.column || [];

  column.forEach((ele: any) => {
    const url = ele.dicUrl;
    const prop = ele.prop;
    const parentProp = ele.parentProp;
    notList = notList.concat(ele.cascader || []);
    const flag = ele.dicFlag === false || ele.lazy === true || notList.includes(prop);
    if (!url || parentProp || flag) return;

    tasks.push(
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
        safe,
      ).then((data) => ({ prop, data })),
    );
  });

  const result: Record<string, any> = {};
  const data = await Promise.all(tasks);
  data.forEach((item) => {
    result[item.prop] = item.data;
  });
  return result;
};

export const loadLocalDic = (option: Record<string, any>) => {
  const columnData: Record<string, any> = {};
  const optionData = option.dicData || {};
  const tasks: Promise<{ prop: string; data: any[] }>[] = [];

  (option.column || []).forEach((ele: any) => {
    const dic = ele.dicData;
    const prop = ele.prop;
    if (dic instanceof Function) {
      try {
        const dicResult = dic(ele);
        if (dicResult && typeof dicResult.then === 'function') {
          tasks.push(
            Promise.resolve(dicResult).then((res: any[]) => ({
              prop,
              data: getDataType(res, ele.props, ele.dataType),
            })),
          );
        } else {
          columnData[prop] = getDataType(dicResult, ele.props, ele.dataType);
        }
      } catch (error) {
        tasks.push(Promise.reject(error));
      }
    } else if (dic instanceof Array) {
      columnData[prop] = getDataType(dic, ele.props, ele.dataType);
    }
  });

  return {
    data: { ...optionData, ...columnData },
    pending: Promise.all(tasks).then((items) => {
      return items.reduce((result, item) => {
        result[item.prop] = item.data;
        return result;
      }, {} as Record<string, any>);
    }),
  };
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
  if (!url) return Promise.resolve([]);

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

  const getData = () => {
    const data = getKey(query);
    if (method == 'get') return { params: data };
    return { data };
  };

  return Promise.resolve()
    .then(() =>
      safe.$axios(
        Object.assign(
          {
            url,
            method,
            headers: getKey(headers),
          },
          getData(),
        ),
      ),
    )
    .then((res: any) => {
      let currentList: any[] = [];
      res = res.data || {};
      if (typeof formatter === 'function') {
        currentList = formatter(res, form);
      } else {
        currentList = getResData(res, props, dataType);
      }
      return currentList;
    });
};
