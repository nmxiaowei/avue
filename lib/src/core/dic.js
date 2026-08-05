/*! Avue.js v3.9.3 | (c) 2017-2026 Smallwei | Released under the MIT License. */
'use strict';

var src_utils_util = require('../utils/util.js');
var src_utils_validate = require('../utils/validate.js');
var src_global_variable = require('../global/variable.js');

const key = 'key';
function getDataType(list = [], props = {}, type) {
    const valueKey = props.value || src_global_variable.DIC_PROPS.value;
    const childrenKey = props.children || src_global_variable.DIC_PROPS.children;
    list.forEach((ele) => {
        ele[valueKey] = src_utils_util.detailDataType(ele[valueKey], type);
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
        res = src_utils_util.getAsVal(res, bind);
    }
    else if (deep) {
        res = Array.isArray(deep) ? deep : [deep];
    }
    if (dataType)
        res = getDataType(res, props, dataType);
    return res;
}
const loadCascaderDic = async (columnOption = [], safe) => {
    const columnList = columnOption.filter((ele) => ele.parentProp);
    const tasks = [];
    (safe.data || []).forEach((form, index) => {
        columnList.forEach((column) => {
            if (column.hide === true || column.dicFlag === false)
                return;
            const value = form[column.parentProp];
            if (src_utils_validate.validatenull(value)) {
                tasks.push(Promise.resolve({ prop: column.prop, data: [], index }));
                return;
            }
            tasks.push(sendDic({
                url: column.dicUrl,
                props: column.props,
                method: column.dicMethod,
                headers: column.dicHeaders,
                formatter: column.dicFormatter,
                query: column.dicQuery,
                dataType: column.dataType,
                form,
                value,
            }, safe).then((data) => ({ prop: column.prop, data, index })));
        });
    });
    const result = {};
    const data = await Promise.all(tasks);
    data.forEach((item) => {
        if (!result[item.index])
            result[item.index] = {};
        result[item.index][item.prop] = item.data;
    });
    return result;
};
const loadDic = async (option, safe) => {
    let notList = [];
    const tasks = [];
    const column = option.column || [];
    column.forEach((ele) => {
        const url = ele.dicUrl;
        const prop = ele.prop;
        const parentProp = ele.parentProp;
        notList = notList.concat(ele.cascader || []);
        const flag = ele.dicFlag === false || ele.lazy === true || notList.includes(prop);
        if (!url || parentProp || flag)
            return;
        tasks.push(sendDic({
            url,
            method: ele.dicMethod,
            headers: ele.dicHeaders,
            formatter: ele.dicFormatter,
            props: ele.props,
            dataType: ele.dataType,
            query: ele.dicQuery,
        }, safe).then((data) => ({ prop, data })));
    });
    const result = {};
    const data = await Promise.all(tasks);
    data.forEach((item) => {
        result[item.prop] = item.data;
    });
    return result;
};
const loadLocalDic = (option) => {
    const columnData = {};
    const optionData = option.dicData || {};
    const tasks = [];
    (option.column || []).forEach((ele) => {
        const dic = ele.dicData;
        const prop = ele.prop;
        if (dic instanceof Function) {
            try {
                const dicResult = dic(ele);
                if (dicResult && typeof dicResult.then === 'function') {
                    tasks.push(Promise.resolve(dicResult).then((res) => ({
                        prop,
                        data: getDataType(res, ele.props, ele.dataType),
                    })));
                }
                else {
                    columnData[prop] = getDataType(dicResult, ele.props, ele.dataType);
                }
            }
            catch (error) {
                tasks.push(Promise.reject(error));
            }
        }
        else if (dic instanceof Array) {
            columnData[prop] = getDataType(dic, ele.props, ele.dataType);
        }
    });
    return {
        data: { ...optionData, ...columnData },
        pending: Promise.all(tasks).then((items) => {
            return items.reduce((result, item) => {
                result[item.prop] = item.data;
                return result;
            }, {});
        }),
    };
};
const sendDic = (params, safe) => {
    let { url, query, method, props, formatter, headers, value, column = {}, form = {}, dataType, } = params;
    url = column.dicUrl || url;
    method = (column.dicMethod || method || 'get').toLowerCase();
    headers = column.dicHeaders || headers || {};
    query = column.dicQuery || query || {};
    formatter = column.dicFormatter || formatter;
    props = column.props || props || {};
    if (!url)
        return Promise.resolve([]);
    const list = url.match(/[^\{\}]+(?=\})/g) || [];
    list.forEach((ele) => {
        let result = ele === key ? value : form[ele];
        if (src_utils_validate.validatenull(result))
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
    const getData = () => {
        const data = getKey(query);
        if (method == 'get')
            return { params: data };
        return { data };
    };
    return Promise.resolve()
        .then(() => safe.$axios(Object.assign({
        url,
        method,
        headers: getKey(headers),
    }, getData())))
        .then((res) => {
        let currentList = [];
        res = res.data || {};
        if (typeof formatter === 'function') {
            currentList = formatter(res, form);
        }
        else {
            currentList = getResData(res, props, dataType);
        }
        return currentList;
    });
};

exports.loadCascaderDic = loadCascaderDic;
exports.loadDic = loadDic;
exports.loadLocalDic = loadLocalDic;
exports.sendDic = sendDic;
