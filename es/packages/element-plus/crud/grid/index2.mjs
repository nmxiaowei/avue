/*! Avue.js v3.9.5 | (c) 2017-2026 Smallwei | Released under the MIT License. */
import create from '../../../../src/core/create.mjs';
import locale from '../../../../src/core/locale.mjs';

var script = create({
  name: "crud__grid",
  inject: ["crud"],
  mixins: [locale],
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
    rowKey: [String, Function],
    height: [String, Number],
    data: Array,
  },
  data() {
    return {
      selection: [],
      rowKeys: new WeakMap(),
      span: 8,
      xsSpan: 12,
      id: "crud-grid",
      column: [],
    };
  },
  computed: {
    reserveSelection() {
      return !!this.crud.tableOption.reserveSelection;
    },
    checkList: {
      get() {
        const selected = new Set(this.selection.map(this.getRowIdentity));
        return this.data.reduce((result, row, index) => {
          if (selected.has(this.getRowIdentity(row))) result.push(index);
          return result;
        }, []);
      },
      set(val) {
        const current = new Set(this.data.map(this.getRowIdentity));
        const selected = new Set(val);
        const result = this.reserveSelection
          ? this.selection.filter((row) => !current.has(this.getRowIdentity(row)))
          : [];
        this.data.forEach((row, index) => {
          if (selected.has(index)) result.push(row);
        });
        this.selection = result;
      },
    },
    styleName() {
      return {
        height: this.crud.tableHeight + "px",
      };
    },
  },
  watch: {
    data: {
      handler: "syncSelection",
      deep: true,
    },
    reserveSelection() {
      this.syncSelection(this.data, this.data);
    },
  },
  methods: {
    doLayout() {},
    getRowKey(row) {
      if (typeof this.rowKey === "function") return this.rowKey(row);
      return this.rowKey?.split(".").reduce((value, key) => value?.[key], row);
    },
    getRowIdentity(row) {
      const key = this.getRowKey(row);
      if (key !== undefined && key !== null) return key;
      if (!this.rowKeys.has(row)) this.rowKeys.set(row, Symbol());
      return this.rowKeys.get(row);
    },
    syncSelection(data, oldData) {
      if (!this.reserveSelection && data !== oldData) {
        this.clearSelection();
        return;
      }
      const current = new Map(data.map((row) => [this.getRowIdentity(row), row]));
      const selection = this.selection
        .filter((row) => this.reserveSelection || current.has(this.getRowIdentity(row)))
        .map((row) => current.get(this.getRowIdentity(row)) || row);
      if (selection.length !== this.selection.length ||
        selection.some((row, index) => row !== this.selection[index])) {
        this.selection = selection;
        this.checkListChange();
      }
    },
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
      if (!this.selection.length) return;
      this.selection = [];
      this.checkListChange();
    },
    toggleAllSelection() {
      const selectable = this.data.reduce((result, row, index) => {
        if (!this.isDisabled(row, index)) result.push(index);
        return result;
      }, []);
      const checked = this.checkList;
      const allSelected = selectable.every((index) => checked.includes(index));
      this.checkList = allSelected
        ? checked.filter((index) => !selectable.includes(index))
        : [...new Set([...checked, ...selectable])];
      this.checkListChange();
      this.$emit("select-all", this.selection.slice());
    },
    toggleRowSelection(row, selected, ignoreSelectable = true) {
      const identity = this.getRowIdentity(row);
      const dataIndex = this.data.findIndex(
        (item) => this.getRowIdentity(item) === identity
      );
      if (dataIndex === -1 && !this.reserveSelection) return;
      row = this.data[dataIndex] || row;
      if (!ignoreSelectable && this.isDisabled(row, dataIndex)) return;
      const index = this.selection.findIndex(
        (item) => this.getRowIdentity(item) === identity
      );
      const checked = typeof selected === "boolean" ? selected : index === -1;
      if (checked && index === -1) {
        this.selection.push(row);
      } else if (!checked && index !== -1) {
        this.selection.splice(index, 1);
      } else {
        return;
      }
      this.checkListChange();
    },
    checkListChange() {
      this.$emit("selection-change", this.selection.slice());
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

export { script as default };
