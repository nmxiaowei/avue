/*! Avue.js v3.9.2 | (c) 2017-2026 Smallwei | Released under the MIT License. */
'use strict';

var src_global_variable = require('../global/variable.js');

const warned = new Set();
const KNOWN_TYPES = new Set([
    '',
    'input',
    'textarea',
    'password',
    'phone',
    'currency',
    'bankCard',
    'idCard',
    'email',
    'code',
    'plate',
    'ip',
    'mac',
    'uscc',
    'number',
    'switch',
    'upload',
    'img',
    'array',
    'url',
    'dynamic',
    'slider',
    'rate',
    'input-tag',
    'tag',
    'mention',
    'input-table',
    'input-tree',
    'input-icon',
    'input-map',
    'input-color',
    'input-number',
    'input-cron',
    'cron',
    'title',
    ...src_global_variable.DATE_LIST,
    ...src_global_variable.SELECT_LIST,
]);
const isObject = (value) => {
    return value && Object.prototype.toString.call(value) === '[object Object]';
};
const normalizeColumn = (column, path, warnings) => {
    if (Array.isArray(column)) {
        return column.map((item, index) => ({
            item,
            path: `${path}[${index}]`,
        }));
    }
    if (isObject(column)) {
        return Object.keys(column).map((prop) => ({
            item: {
                ...column[prop],
                prop: column[prop].prop || prop,
            },
            path: `${path}.${prop}`,
        }));
    }
    warnings.push({
        path,
        message: 'column 应为数组或对象格式',
    });
    return [];
};
const validSpan = (value) => {
    return value === undefined || (Number(value) >= 1 && Number(value) <= 24);
};
const visitColumns = (column, path, warnings, propMap) => {
    normalizeColumn(column, path, warnings).forEach(({ item, path: itemPath }) => {
        if (!isObject(item)) {
            warnings.push({
                path: itemPath,
                message: '字段配置应为对象',
            });
            return;
        }
        if (!item.prop) {
            warnings.push({
                path: itemPath,
                message: '缺少 prop，字段无法稳定绑定表单值或表格列',
            });
        }
        else if (propMap[item.prop]) {
            warnings.push({
                path: itemPath,
                message: `prop "${item.prop}" 重复，已在 ${propMap[item.prop]} 出现`,
            });
        }
        else {
            propMap[item.prop] = itemPath;
        }
        if (!item.label && item.type !== 'title') {
            warnings.push({
                path: itemPath,
                message: '建议补充 label，避免表头或表单标签为空',
            });
        }
        if (!validSpan(item.span)) {
            warnings.push({
                path: `${itemPath}.span`,
                message: 'span 应在 1 到 24 之间',
            });
        }
        if (!validSpan(item.searchSpan)) {
            warnings.push({
                path: `${itemPath}.searchSpan`,
                message: 'searchSpan 应在 1 到 24 之间',
            });
        }
        if (item.type && !KNOWN_TYPES.has(item.type)) {
            warnings.push({
                path: `${itemPath}.type`,
                message: `未知字段类型 "${item.type}"，请确认是否已注册自定义组件`,
            });
        }
        if (item.dicData !== undefined && !Array.isArray(item.dicData)) {
            warnings.push({
                path: `${itemPath}.dicData`,
                message: 'dicData 应为数组',
            });
        }
        if (item.rules !== undefined && !Array.isArray(item.rules)) {
            warnings.push({
                path: `${itemPath}.rules`,
                message: 'rules 应为数组',
            });
        }
        if (item.props !== undefined && !isObject(item.props)) {
            warnings.push({
                path: `${itemPath}.props`,
                message: 'props 应为对象',
            });
        }
        if (item.cascader !== undefined && !Array.isArray(item.cascader)) {
            warnings.push({
                path: `${itemPath}.cascader`,
                message: 'cascader 应为 prop 数组',
            });
        }
        if (item.children && item.children.column) {
            visitColumns(item.children.column, `${itemPath}.children.column`, warnings, propMap);
        }
    });
};
const validateOption = (option = {}, component = 'component') => {
    const warnings = [];
    if (!isObject(option)) {
        return [
            {
                path: component,
                message: 'option 应为对象',
            },
        ];
    }
    if (!validSpan(option.span)) {
        warnings.push({
            path: `${component}.span`,
            message: 'span 应在 1 到 24 之间',
        });
    }
    if (!validSpan(option.searchSpan)) {
        warnings.push({
            path: `${component}.searchSpan`,
            message: 'searchSpan 应在 1 到 24 之间',
        });
    }
    const propMap = {};
    if (option.column) {
        visitColumns(option.column, `${component}.column`, warnings, propMap);
    }
    else if (['crud', 'form', 'search'].includes(component)) {
        warnings.push({
            path: `${component}.column`,
            message: '缺少 column 配置',
        });
    }
    if (Array.isArray(option.group)) {
        option.group.forEach((group, index) => {
            if (!isObject(group)) {
                warnings.push({
                    path: `${component}.group[${index}]`,
                    message: '分组配置应为对象',
                });
                return;
            }
            if (group.column) {
                visitColumns(group.column, `${component}.group[${index}].column`, warnings, propMap);
            }
        });
    }
    return warnings;
};
const warnOption = (warnings = [], component = 'component') => {
    warnings.forEach((warning) => {
        const key = `${component}:${warning.path}:${warning.message}`;
        if (warned.has(key))
            return;
        warned.add(key);
        if (typeof console !== 'undefined' && console.warn) {
            console.warn(`[Avue option warn][${component}] ${warning.path}: ${warning.message}`);
        }
    });
};

exports.validateOption = validateOption;
exports.warnOption = warnOption;
