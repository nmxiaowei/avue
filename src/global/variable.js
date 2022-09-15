export const KEY_COMPONENT_NAME = 'avue-';
export const DIC_PROPS = {
  rowKey: 'id',
  rowParentKey: "parentId",
  nodeKey: 'id',
  label: 'label',
  value: 'value',
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
  'monthrange',
  'year'
];
export const INPUT_LIST = ['tree', 'number', 'icon', 'color', 'table', 'map'];
export const ARRAY_LIST = ['img', 'array', 'url'];
export const MULTIPLE_LIST = ['cascader', 'tree', 'select'];
export const RANGE_LIST = ['slider']
export const ARRAY_VALUE_LIST = ARRAY_LIST.concat(['upload', 'dynamic', 'map', 'checkbox', 'cascader', 'dynamic', 'timerange', 'monthrange', 'daterange', 'datetimerange', 'dates']);
export const SELECT_LIST = DATE_LIST.concat(['select', 'checkbox', 'radio', 'cascader', 'tree', 'color', 'icon', 'table', 'map']);
export const DIC_SHOW_SPLIT = ' | ';
export const DIC_SPLIT = ',';
export const typeList = {
  img: /\.(gif|jpg|jpeg|png|webp|GIF|JPG|PNG)/,
  video: /\.(swf|avi|flv|mpg|rm|mov|wav|asf|3gp|mkv|rmvb|ogg|mp4)/,
  audio: /\.(mp3|wav|MP3|WAV)/,
};

