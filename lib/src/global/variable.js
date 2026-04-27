/*! Avue.js v3.9.0 | (c) 2017-2026 Smallwei | Released under the MIT License. */
'use strict';

const KEY_COMPONENT_NAME = 'avue-';
const KEY_ECHART_NAME = 'echart-';
const DIC_PROPS = {
    rowKey: 'id',
    rowParentKey: 'parentId',
    nodeKey: 'id',
    label: 'label',
    value: 'value',
    type: 'type',
    desc: 'desc',
    groups: 'groups',
    title: 'title',
    leaf: 'leaf',
    children: 'children',
    hasChildren: 'hasChildren',
    labelText: '名称',
    disabled: 'disabled',
};
const DIC_HTTP_PROPS = {
    name: 'name',
    url: 'url',
    fileType: 'type',
    fileName: 'file',
    res: '',
};
const DATE_LIST = [
    'dates',
    'date',
    'datetime',
    'datetimerange',
    'daterange',
    'time',
    'timerange',
    'week',
    'month',
    'months',
    'monthrange',
    'year',
    'years',
    'yearrange',
];
const CHILDREN_LIST = ['table', 'dynamic'];
const INPUT_LIST = ['tree', 'number', 'icon', 'color', 'table', 'map', 'tag'];
const ARRAY_LIST = ['img', 'array', 'url'];
const MULTIPLE_LIST = ['cascader', 'tree', 'select', 'table'];
const RANGE_LIST = ['slider'];
const ARRAY_VALUE_LIST = ARRAY_LIST.concat([
    'tag',
    'upload',
    'dynamic',
    'map',
    'checkbox',
    'cascader',
    'timerange',
    'monthrange',
    'daterange',
    'yearrange',
    'datetimerange',
    'dates',
    'months',
    'years',
]);
const SELECT_LIST = DATE_LIST.concat([
    'select',
    'checkbox',
    'radio',
    'cascader',
    'tree',
    'color',
    'icon',
    'table',
    'map',
]);
const DIC_SHOW_SPLIT = ' | ';
const DIC_SPLIT = ',';
const typeList = {
    img: /(\.|^)(gif|jpg|jpeg|png|webp|svg|GIF|JPG|JPEG|PNG|WEBP|SVG)/,
    video: /(\.|^)(swf|avi|flv|mpg|rm|mov|wav|asf|3gp|mkv|rmvb|ogg|mp4)/,
    audio: /(\.|^)(mp3|wav|MP3|WAV)/,
};

exports.ARRAY_LIST = ARRAY_LIST;
exports.ARRAY_VALUE_LIST = ARRAY_VALUE_LIST;
exports.CHILDREN_LIST = CHILDREN_LIST;
exports.DATE_LIST = DATE_LIST;
exports.DIC_HTTP_PROPS = DIC_HTTP_PROPS;
exports.DIC_PROPS = DIC_PROPS;
exports.DIC_SHOW_SPLIT = DIC_SHOW_SPLIT;
exports.DIC_SPLIT = DIC_SPLIT;
exports.INPUT_LIST = INPUT_LIST;
exports.KEY_COMPONENT_NAME = KEY_COMPONENT_NAME;
exports.KEY_ECHART_NAME = KEY_ECHART_NAME;
exports.MULTIPLE_LIST = MULTIPLE_LIST;
exports.RANGE_LIST = RANGE_LIST;
exports.SELECT_LIST = SELECT_LIST;
exports.typeList = typeList;
