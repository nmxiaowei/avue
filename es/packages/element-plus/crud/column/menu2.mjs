/*! Avue.js v3.9.1 | (c) 2017-2026 Smallwei | Released under the MIT License. */
import { detail } from '../../../../src/core/detail.mjs';
import { DIC_SPLIT, DIC_PROPS } from '../../../../src/global/variable.mjs';

var script = {
  props: {
    column: Object,
    row: Object
  },
  inject: ['crud'],
  methods: {
    openImg (list, index) {
      list = list.map(ele => {
        return { thumbUrl: ele, url: ele }
      });
      this.$ImagePreview(list, index);
    },
    corArray (list, separator = DIC_SPLIT) {
      if (this.validatenull(list)) {
        return []
      } else if (!Array.isArray(list)) {
        return list.split(separator);
      }
      return list
    },
    getImgList (row, column) {
      let url = (column.propsHttp || {}).home || '';
      let value = (column.props || {}).value || DIC_PROPS.value;
      if (this.validatenull(row[column.prop])) return []
      if (column.listType == 'picture-img') return [url + row[column.prop]]
      let list = this.corArray(this.deepClone(row[column.prop]), column.separator);
      list.forEach((ele, index) => {
        if (typeof ele === 'object') {
          list[index] = url + ele[value];
        } else {
          list[index] = url + ele;
        }
      });
      return list;
    },
    handleDetail (row, column) {
      let result = row[column.prop];
      let DIC = column.parentProp ? (this.crud.cascaderDIC[row.$index] || {})[column.prop] : this.crud.DIC[column.prop];
      result = detail(row, column, this.crud.tableOption, DIC);
      if (!this.validatenull(DIC)) {
        row["$" + column.prop] = result;
      }
      return result;
    },
  }
};

export { script as default };
