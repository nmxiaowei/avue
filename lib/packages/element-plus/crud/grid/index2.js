/*! Avue.js v3.9.4 | (c) 2017-2026 Smallwei | Released under the MIT License. */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var src_core_create = require('../../../../src/core/create.js');
var src_core_locale = require('../../../../src/core/locale.js');

var script = src_core_create.default({
  name: "crud__grid",
  inject: ["crud"],
  mixins: [src_core_locale.default],
  provide() {
    return {
      dynamic: this,
    };
  },
  props: {
    rowStyle: Function,
    cellStyle: Function,
    cellClassName: Function,
    rowClassName: Function,
    height: [String, Number],
    data: Array,
  },
  data() {
    return {
      checkList: [],
      span: 8,
      xsSpan: 12,
      id: "crud-grid",
      column: [],
    };
  },
  computed: {
    styleName() {
      return {
        height: this.crud.tableHeight + "px",
      };
    },
  },
  methods: {
    doLayout() {},
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
            text: ele[props.label || DIC_PROPS.label],
            value: ele[props.value || DIC_PROPS.value],
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
    isDisabled(row, index) {
      return typeof this.crud.tableOption.selectable === "function"
        ? !this.crud.tableOption.selectable(row, index)
        : false;
    },
    clearSelection() {
      this.checkList = [];
      this.checkListChange(this.checkList);
    },
    toggleAllSelection() {
      if (this.checkList.length === this.crud.data.length) {
        this.checkList = [];
      } else {
        this.checkList = this.crud.data.map((ele, index) => index);
      }
      this.checkListChange(this.checkList);
    },
    toggleRowSelection(data, selected) {
      let index = this.crud.data.findIndex(
        (ele) => JSON.stringify(ele) == JSON.stringify(data)
      );
      if (selected && index != -1) {
        this.checkList.push(index);
      } else {
        let checkIndex = this.checkList.findIndex((ele) => ele == index);
        this.checkList.splice(checkIndex, 1);
      }
      this.checkListChange(this.checkList);
    },
    checkListChange(val) {
      let result = [];
      const data = this.crud.data;
      val.forEach((ele) => {
        result.push(data[ele]);
      });
      this.$emit("selection-change", result);
    },
    handleRowDblClick(row, index) {
      this.$emit("row-dblclick", row, index);
    },
    handleRowClick(row, index) {
      this.$emit("row-click", row, index);
    },
    handleCellDblClick(row, column) {
      this.$emit("cell-dblclick", row, column);
    },
    handleCellClick(row, column) {
      this.$emit("cell-click", row, column);
    },
    getGradientColor(row, index) {
      let styles = {};
      if (typeof this.crud.tableOption.gridBackground == "function") {
        styles.background = this.crud.tableOption.gridBackground(row, index);
      } else if (this.crud.tableOption.gridBackgroundImage) {
        styles.backgroundImage = `url(${this.crud.tableOption.gridBackgroundImage})`;
      } else {
        styles.background =
          this.crud.tableOption.gridBackground ||
          "linear-gradient(to bottom, rgba(88, 159, 248, 0.1), white)";
      }
      return styles;
    },
    getCellStyle(row, index, column, columnIndex) {
      if (this.cellStyle)
        return this.cellStyle({ row, rowIndex: index, column, columnIndex });
    },
    getRowStyle(row, index) {
      if (this.rowStyle) return this.rowStyle({ row, rowIndex: index });
    },
    getRowClass(row, index) {
      if (this.rowClassName) return this.rowClassName({ row, rowIndex: index });
    },
    getClass(row, index, column) {
      let list = [];
      let firstIndex = this.crud.columnOption.findIndex(
        (item) => item.hide !== true
      );
      const columnOption = this.crud.columnOption || [];
      if (this.cellClassName)
        list.push(this.cellClassName({ row, rowIndex: index, column }));
      if (column.prop == (columnOption[firstIndex || 0] || {}).prop)
        list.push("title");
      if (column.row) list.push("row");
      if (column.showOverflowTooltip) list.push("overHidden");
      return list;
    },
  },
});

exports.default = script;
