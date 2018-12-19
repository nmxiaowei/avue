'use strict';
export default function treeToArray(data, expandAll, parent = null, level = null) {
  let tmp = [];
  Array.from(data).forEach(function (record) {
    if (record._expanded === undefined) {
      record._expanded = expandAll;
    }
    let _level = 1;
    if (level !== undefined && level !== null) {
      _level = level + 1;
    }
    record._level = _level;
    // 如果有父元素
    if (parent) {
      record.parent = parent;
    }
    tmp.push(record);
    if (record.children && record.children.length > 0) {
      const children = treeToArray(record.children, expandAll, record, _level);
      tmp = tmp.concat(children);
    }
  });
  return tmp;
}