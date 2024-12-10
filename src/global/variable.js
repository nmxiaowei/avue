export const KEY_COMPONENT_NAME = 'avue-';
export const KEY_ECHART_NAME = 'echart-';
export const DIC_PROPS = {
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
  disabled: 'disabled'
};
export const DIC_HTTP_PROPS = {
  name: 'name',
  url: 'url',
  fileType: 'type',
  fileName: 'file',
  res: ''
};
export const DATE_LIST = [
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
  'yearrange'
];
export const CHILDREN_LIST = ['table', 'dynamic'];
export const INPUT_LIST = ['tree', 'number', 'icon', 'color', 'table', 'map', 'tag'];
export const ARRAY_LIST = ['img', 'array', 'url'];
export const MULTIPLE_LIST = ['cascader', 'tree', 'select', 'table'];
export const RANGE_LIST = ['slider'];
export const ARRAY_VALUE_LIST = ARRAY_LIST.concat(['tag', 'upload', 'dynamic', 'map', 'checkbox', 'cascader', 'timerange', 'monthrange', 'daterange', 'yearrange', 'datetimerange', 'dates', 'months', 'years']);
export const SELECT_LIST = DATE_LIST.concat(['select', 'checkbox', 'radio', 'cascader', 'tree', 'color', 'icon', 'table', 'map']);
export const DIC_SHOW_SPLIT = ' | ';
export const DIC_SPLIT = ',';
export const typeList = {
  img: /(\.|^)(gif|jpg|jpeg|png|webp|svg|GIF|JPG|JPEG|PNG|WEBP|SVG)/,
  video: /(\.|^)(swf|avi|flv|mpg|rm|mov|wav|asf|3gp|mkv|rmvb|ogg|mp4)/,
  audio: /(\.|^)(mp3|wav|MP3|WAV)/
};
