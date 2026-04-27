/*! Avue.js v3.9.0 | (c) 2017-2026 Smallwei | Released under the MIT License. */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var src_core_create = require('../../../../src/core/create.js');
require('./column-dynamic.js');
require('./column-slot.js');
var src_utils_util = require('../../../../src/utils/util.js');
var src_global_variable = require('../../../../src/global/variable.js');
var columnDynamic_vue_vue_type_script_lang = require('./column-dynamic2.js');
var columnSlot_vue_vue_type_script_lang = require('./column-slot2.js');

var script = src_core_create.default({
  name: "crud",
  data() {
    return {};
  },
  components: {
    columnSlot: columnSlot_vue_vue_type_script_lang.default,
    columnDynamic: columnDynamic_vue_vue_type_script_lang.default,
  },
  inject: ["crud"],
  provide() {
    return {
      crud: this.crud,
      dynamic: this,
    };
  },
  props: {
    columnOption: Array,
  },
  computed: {
    list() {
      let result = [...this.columnOption];
      result = src_utils_util.arraySort(
        result,
        "index",
        (a, b) =>
          this.crud.objectOption[a.prop]?.index -
          this.crud.objectOption[b.prop]?.index
      );
      return result;
    },
  },
  methods: {
    //表格筛选逻辑
    handleFilterMethod(params) {
      const { value, row, column } = params;
      if (typeof column.filterMethod === "function") {
        return column.filterMethod(value, row, column);
      } else {
        return row[column.prop] == value;
      }
    },
    //表格筛选字典
    handleFilters(column) {
      if (Array.isArray(column.filters))
        return column.filters.map((ele) => ({
          text: ele.label,
          value: ele.value,
        }));
      if (column.filters !== true) return undefined;
      let DIC = this.crud.DIC[column.prop] || [];
      let list = [];
      if (!this.validatenull(DIC)) {
        DIC.forEach((ele) => {
          const props = column.props || this.crud.tableOption.props || {};
          list.push({
            text: ele[props.label || src_global_variable.DIC_PROPS.label],
            value: ele[props.value || src_global_variable.DIC_PROPS.value],
          });
        });
      } else {
        this.crud.cellForm.list.forEach((ele) => {
          if (!list.map((item) => item.text).includes(ele[column.prop])) {
            list.push({
              text: ele[column.prop],
              value: ele[column.prop],
            });
          }
        });
      }
      return list;
    },
    getColumnProp(column, type, params) {
      let obj = column || {};
      if (type === "filterMethod") return this.handleFilterMethod(params);
      if (this.crud.isMobile && ["fixed"].includes(type)) return false;
      let result = obj?.[type];
      if (type == "width" && result == 0) {
        return undefined;
      }
      if (type == "filters") return this.handleFilters(column);
      if (type == "hide") return obj?.hide !== true;
      else return result;
    },
  },
});

exports.default = script;
