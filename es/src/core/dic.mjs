/*! Avue.js v3.8.6 | (c) 2017-2026 Smallwei | Released under the MIT License. */
import { getAsVal, detailDataType } from '../utils/util.mjs';
import { validatenull } from '../utils/validate.mjs';
import { DIC_PROPS } from '../global/variable.mjs';

const key = 'key';
function getDataType(list = [], props = {}, type) {
    const valueKey = props.value || DIC_PROPS.value;
    const childrenKey = props.children || DIC_PROPS.children;
    list.forEach((ele) => {
        ele[valueKey] = detailDataType(ele[valueKey], type);
        if (ele[childrenKey])
            getDataType(ele[childrenKey], props, type);
    });
    return list;
}
function getResData(data, props, dataType) {
    const bind = props.res;
    let res = data;
    const deep = data.data;
    if (bind) {
        res = getAsVal(res, bind);
    }
    else if (deep) {
        res = Array.isArray(deep) ? deep : [deep];
    }
    if (dataType)
        res = getDataType(res, props, dataType);
    return res;
}
const loadCascaderDic = (columnOption, safe) => {
    return new Promise((resolve) => {
        const list = [];
        const result = {};
        const columnList = columnOption.filter((ele) => ele.parentProp);
        safe.data.forEach((ele, index) => {
            if (!safe.cascaderDIC[index])
                safe.cascaderDIC[index] = {};
            columnList.forEach((column) => {
                if (column.hide !== true && column.dicFlag !== false) {
                    list.push(new Promise((resolve) => {
                        if (ele[column.parentProp]) {
                            sendDic({
                                url: column.dicUrl,
                                props: column.props,
                                method: column.dicMethod,
                                headers: column.dicHeaders,
                                formatter: column.dicFormatter,
                                query: column.dicQuery,
                                dataType: column.dataType,
                                form: ele,
                                value: ele[column.parentProp],
                            }, safe).then((res) => {
                                const obj = {
                                    prop: column.prop,
                                    data: res,
                                    index,
                                };
                                safe.cascaderDIC[index][obj.prop] = obj.data;
                                resolve(obj);
                            });
                        }
                        else {
                            const obj = {
                                prop: column.prop,
                                data: [],
                                index,
                            };
                            safe.cascaderDIC[index][obj.prop] = obj.data;
                            resolve(obj);
                        }
                    }));
                }
            });
        });
        Promise.all(list).then((data) => {
            data.forEach((ele) => {
                if (!result[ele.index])
                    result[ele.index] = {};
                result[ele.index][ele.prop] = ele.data;
            });
            resolve(result);
        });
    });
};
const loadDic = (option, safe) => {
    return new Promise((resolve) => {
        const list = [];
        const result = {};
        let notList = [];
        const nameList = [];
        const column = option.column || [];
        column.forEach((ele) => {
            const url = ele.dicUrl;
            const prop = ele.prop;
            const parentProp = ele.parentProp;
            notList = notList.concat(ele.cascader || []);
            const flag = ele.dicFlag === false || ele.lazy === true || notList.includes(prop);
            if (url && !parentProp && !flag) {
                list.push(new Promise((resolve) => {
                    sendDic({
                        url,
                        method: ele.dicMethod,
                        headers: ele.dicHeaders,
                        formatter: ele.dicFormatter,
                        props: ele.props,
                        dataType: ele.dataType,
                        query: ele.dicQuery,
                    }, safe).then((res) => {
                        safe.DIC[prop] = res;
                        resolve(res);
                    });
                }));
                nameList.push(prop);
            }
        });
        Promise.all(list).then((res) => {
            nameList.forEach((ele, index) => {
                result[ele] = res[index];
            });
            resolve(result);
        });
    });
};
const loadLocalDic = (option, safe) => {
    const columnData = {};
    const optionData = option.dicData || {};
    option.column.forEach((ele) => {
        const dic = ele.dicData;
        const prop = ele.prop;
        if (dic instanceof Function) {
            const dicResult = dic(ele);
            if (dicResult instanceof Promise) {
                dicResult.then((res) => {
                    safe.DIC[prop] = getDataType(res, ele.props, ele.dataType);
                });
            }
            else {
                columnData[prop] = getDataType(dicResult, ele.props, ele.dataType);
            }
        }
        else if (dic instanceof Array) {
            columnData[prop] = getDataType(dic, ele.props, ele.dataType);
        }
    });
    const result = { ...optionData, ...columnData };
    Object.keys(result).forEach((ele) => {
        safe.DIC[ele] = result[ele];
    });
    return result;
};
const sendDic = (params, safe) => {
    let { url, query, method, props, formatter, headers, value, column = {}, form = {}, dataType, } = params;
    url = column.dicUrl || url;
    method = (column.dicMethod || method || 'get').toLowerCase();
    headers = column.dicHeaders || headers || {};
    query = column.dicQuery || query || {};
    formatter = column.dicFormatter || formatter;
    props = column.props || props || {};
    const list = url.match(/[^\{\}]+(?=\})/g) || [];
    list.forEach((ele) => {
        let result = ele === key ? value : form[ele];
        if (validatenull(result))
            result = '';
        url = url.replace(`{{${ele}}}`, result);
    });
    const getKey = (data) => {
        const result = {};
        Object.keys(data).forEach((ele) => {
            const eleKey = data[ele];
            if (typeof eleKey === 'string' && eleKey.match(/\{{|}}/g)) {
                const prop = eleKey.replace(/\{{|}}/g, '');
                result[ele] = prop == key ? value : form[prop];
            }
            else {
                result[ele] = eleKey;
            }
        });
        return result;
    };
    return new Promise((resolve, reject) => {
        if (!url)
            resolve([]);
        const callback = (res) => {
            let currentList = [];
            res = res.data || {};
            if (typeof formatter === 'function') {
                currentList = formatter(res, form);
            }
            else {
                currentList = getResData(res, props, dataType);
            }
            resolve(currentList);
        };
        const getData = () => {
            const data = getKey(query);
            if (method == 'get')
                return { params: data };
            return { data };
        };
        safe
            .$axios(Object.assign({
            url,
            method,
            headers: getKey(headers),
        }, getData()))
            .then(function (res) {
            callback(res);
        })
            .catch((err) => {
            reject(err);
        });
    });
};

export { loadCascaderDic, loadDic, loadLocalDic, sendDic };
