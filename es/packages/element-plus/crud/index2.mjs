/*! Avue.js v3.9.0 | (c) 2017-2026 Smallwei | Released under the MIT License. */
import create from '../../../src/core/create.mjs';
import packages from '../../../src/core/packages.mjs';
import locale from '../../../src/core/locale.mjs';
import permission from '../../core/directive/permission.mjs';
import init from '../../core/common/init.mjs';
import './grid/index.mjs';
import './grid/item.mjs';
import './menu/table-page.mjs';
import './menu/header-search.mjs';
import './menu/header-menu.mjs';
import './dialog/dialog-column.mjs';
import './dialog/dialog-filter.mjs';
import './dialog/dialog-form.mjs';
import './dialog/dialog-excel.mjs';
import './column/column.mjs';
import './column/column-menu.mjs';
import './column/column-default.mjs';
import config from './config.mjs';
import { formInitVal, calcCascader } from '../../../src/core/dataformat.mjs';
import { DIC_PROPS } from '../../../src/global/variable.mjs';
import 'element-plus';
import { getColumn } from '../../../src/utils/util.mjs';
import script$1 from './dialog/dialog-excel2.mjs';
import script$2 from './dialog/dialog-form2.mjs';
import script$3 from './dialog/dialog-filter2.mjs';
import script$4 from './dialog/dialog-column2.mjs';
import script$5 from './menu/header-menu2.mjs';
import script$6 from './menu/header-search2.mjs';
import script$7 from './menu/table-page2.mjs';
import script$8 from './column/column-menu2.mjs';
import script$9 from './column/column-default2.mjs';
import script$a from './column/column2.mjs';
import script$b from './grid/item2.mjs';
import script$c from './grid/index2.mjs';

var script = create({
  name: "crud",
  mixins: [init("crud"), locale],
  emits: [
    "update:modelValue",
    "tree-load",
    "selection-clear",
    "header-dragend",
    "expand-change",
    "current-row-change",
    "refresh-change",
    "selection-change",
    "select",
    "select-all",
    "sortable-change",
    "column-sortable-change",
    "filter",
    "filter-change",
    "sort-change",
    "row-dblclick",
    "row-click",
    "cell-mouse-enter",
    "cell-mouse-leave",
    "cell-click",
    "header-click",
    "tab-click",
    "enter",
    "error",
    "date-change",
    "grid-status-change",
    "update:search",
    "update:page",
    "search-icon-change",
    "search-change",
    "search-reset",
    "on-load",
    "current-change",
    "size-change",
    "row-contextmenu",
    "header-contextmenu",
    "cell-dblclick",
    "row-del",
    "row-save",
    "row-update",
    "change",
    "scroll",
  ],
  directives: {
    permission,
  },
  provide() {
    return {
      crud: this,
    };
  },
  components: {
    tableCard: script$c,
    tableItemCard: script$b,
    column: script$a,
    columnDefault: script$9, //其它列,
    columnMenu: script$8, //操作栏，
    tablePage: script$7, //分页
    headerSearch: script$6, //搜索
    headerMenu: script$5, //菜单头部
    dialogColumn: script$4, //显隐列
    dialogFilter: script$3, //过滤器
    dialogForm: script$2, //分页
    dialogExcel: script$1, //导出
  },
  data() {
    return {
      reload: Math.random(),
      cellForm: {
        list: [],
      },
      config: config,
      list: [],
      listError: {},
      tableForm: {},
      tableHeight: undefined,
      tableIndex: -1,
      tableSelect: [],
      sumsList: {},
      cascaderIndexList: [],
      cascaderDicList: {},
      cascaderFormList: {},
      btnDisabledList: {},
      btnDisabled: false,
      default: {},
      gridShow: false,
    };
  },
  mounted() {
    this.dataInit();
    this.getTableHeight();
    this.initFun();
    this.initVirtualizeFun();
  },
  computed: {
    columnVirtualizeOption() {
      return this.columnOption.map((ele) => {
        return {
          ...ele,
          ...{
            key: ele.prop,
            title: ele.label,
            dataKey: ele.prop,
          },
        };
      });
    },
    tableName() {
      if (this.virtualize) {
        return "elTableV2";
      }
      return this.gridShow ? "tableCard" : "elTable";
    },
    tableColumnName() {
      return this.gridShow ? "tableItemCard" : "elTableColumn";
    },
    virtualize() {
      return this.tableOption.virtualize;
    },
    size() {
      return this.tableOption.size || this.$AVUE.tableSize || this.$AVUE.size;
    },
    isSortable() {
      return this.tableOption.sortable;
    },
    isRowSort() {
      return this.tableOption.rowSort;
    },
    isColumnSort() {
      return this.tableOption.columnSort;
    },
    rowParentKey() {
      return this.option.rowParentKey || DIC_PROPS.rowParentKey;
    },
    childrenKey() {
      return this.treeProps.children || DIC_PROPS.children;
    },
    hasChildrenKey() {
      return this.treeProps.hasChildren || DIC_PROPS.hasChildren;
    },
    treeProps() {
      return this.tableOption.treeProps || {};
    },
    isAutoHeight() {
      return this.tableOption.height === "auto";
    },
    formSlot() {
      return this.getSlotList(
        ["-error", "-label", "-type", "-form", "-header", "-desc"],
        this.$slots,
        this.propOption
      );
    },
    searchSlot() {
      return this.getSlotList(["-search"], this.$slots, this.propOption);
    },
    mainSlot() {
      let result = [];
      this.propOption.forEach((item) => {
        let prop = item.prop;
        if (this.$slots[prop]) result.push(prop);
      });
      return this.getSlotList(
        ["-header", "-form"],
        this.$slots,
        this.propOption
      ).concat(result);
    },
    calcHeight() {
      return (this.tableOption.calcHeight || 0) + this.$AVUE.calcHeight;
    },
    propOption() {
      let result = [];
      function findProp(list = []) {
        if (!Array.isArray(list)) return;
        list.forEach((ele) => {
          if (Array.isArray(ele.children)) findProp(ele.children);
          else result.push(ele);
        });
      }
      findProp(this.columnOption);
      result = calcCascader(result);
      return result;
    },
    isShowSummary() {
      return this.option.showSummary;
    },
    isHeader() {
      let flag = false;
      this.columnOption.forEach((ele) => {
        if (ele.children) {
          flag = true;
        }
      });
      return flag;
    },
    isTree() {
      let flag = false;
      this.data.forEach((ele) => {
        if (ele.children) {
          flag = true;
        }
      });
      return this.validData(this.tableOption.tree, flag);
    },
    isCard() {
      return this.option.card ? "always" : "never";
    },
    expandLevel() {
      return this.parentOption.expandLevel || 0;
    },
    expandAll() {
      return this.parentOption.expandAll || false;
    },
    parentOption() {
      return this.tableOption || {};
    },
    columnOption() {
      return getColumn(this.tableOption.column);
    },
    sumColumnList() {
      return this.tableOption.sumColumnList || [];
    },
    selectLen() {
      return this.tableSelect ? this.tableSelect.length : 0;
    },
  },
  watch: {
    modelValue: {
      handler(val) {
        this.tableForm = val;
      },
      immediate: true,
      deep: true,
    },
    list: {
      handler() {
        this.cellForm.list = this.list;
      },
      deep: true,
    },
    data: {
      handler() {
        this.dataInit();
      },
      deep: true,
    },
    tableOption: {
      handler() {
        this.gridShow = this.tableOption.grid;
      },
      immediate: true,
    },
  },
  props: {
    spanMethod: Function,
    summaryMethod: Function,
    beforeClose: Function,
    beforeOpen: Function,
    rowStyle: [Function, Object],
    cellStyle: [Function, Object],
    rowClassName: [Function, String],
    cellClassName: [Function, String],
    headerCellClassName: [Function, String],
    headerRowClassName: [Function, String],
    headerRowStyle: [Function, Object],
    headerCellStyle: [Function, Object],
    uploadSized: Function,
    uploadBefore: Function,
    uploadAfter: Function,
    uploadDelete: Function,
    uploadPreview: Function,
    uploadError: Function,
    uploadExceed: Function,
    permission: {
      type: [Function, Object],
      default: () => {
        return {};
      },
    },
    modelValue: {
      type: Object,
      default: () => {
        return {};
      },
    },
    search: {
      type: Object,
      default() {
        return {};
      },
    },
    page: {
      type: Object,
      default() {
        return {};
      },
    },
    tableLoading: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    data: {
      type: Array,
      required: true,
      default: () => {
        return [];
      },
    },
    width: {
      type: [Number, String],
      default: null,
    },
    height: {
      type: [Number, String],
      default: null,
    },
  },
  methods: {
    initVirtualizeFun() {
      if (!this.virtualize) return;
      this.initTableMethods([
        "scrollTo",
        "scrollToTop",
        "scrollToLeft",
        "scrollRow",
      ]);
    },
    initFun() {
      this.initTableMethods([
        "scrollTo",
        "setScrollTop",
        "setScrollLeft",
        "columns",
        "doLayout",
        "updateKeyChildren",
        "toggleAllSelection",
        "toggleRowSelection",
        "toggleRowExpansion",
        "setCurrentRow",
        "clearFilter",
        "clearSort",
      ]);
    },
    initTableMethods(methods) {
      methods.forEach((ele) => {
        this[ele] = (...args) => {
          const tableRef = this.$refs.table;
          if (tableRef && typeof tableRef[ele] === "function") {
            return tableRef[ele](...args);
          }
        };
      });
    },
    handleGridShow() {
      this.gridShow = !this.gridShow;
      this.$emit("grid-status-change", this.gridShow);
    },
    handleValidate(prop, valid, msg) {
      if (!this.listError[prop])
        this.listError[prop] = { valid: false, msg: "" };

      this.listError[prop].valid = !valid;
      this.listError[prop].msg = msg;
    },
    getPermission(key, row, index) {
      if (typeof this.permission === "function") {
        return this.permission(key, row, index);
      } else if (!this.validatenull(this.permission[key])) {
        return this.permission[key];
      } else {
        return true;
      }
    },
    getTableHeight() {
      this.$nextTick(() => {
        if (this.isAutoHeight) {
          const clientHeight = document.documentElement.clientHeight;
          const calcHeight = this.calcHeight || 0;
          const tableRef = this.$refs.table;
          const tablePageRef = this.$refs.tablePage;
          let tableHeight = clientHeight - calcHeight;
          if (tableRef) {
            const height = tableRef.$el.offsetTop || 0;
            tableHeight -= height;
          }
          if (tablePageRef) {
            const height = tablePageRef.$el.offsetHeight || 0;
            tableHeight -= height;
          }
          this.tableHeight = tableHeight;
        } else {
          this.tableHeight = this.tableOption.height;
        }
        this.doLayout();
      });
    },
    refreshTable(callback) {
      this.reload = Math.random();
      this.tableSelect = [];
      this.$nextTick(() => {
        callback && callback();
      });
    },
    //树懒加载
    treeLoad(tree, treeNode, resolve) {
      this.$emit("tree-load", tree, treeNode, (data) => {
        tree.children = data;
        resolve(data);
      });
    },
    menuIcon(value) {
      return this.validData(
        this.tableOption[value + "Text"],
        this.t("crud." + value)
      );
    },
    getBtnIcon(value) {
      const name = value + "Icon";
      return this.tableOption[name]
        ? this.tableOption[name].trim()
        : config[name];
    },
    //对部分表单字段进行校验的方法
    validateField(val, fn) {
      return this.$refs.dialogForm.$refs.tableForm.validateField(val, fn);
    },
    clearSelection() {
      this.$emit("selection-clear", this.deepClone(this.tableSelect));
      this.$refs.table.clearSelection();
    },
    dataInit() {
      this.list = this.data;
      //初始化序列的参数
      this.list.forEach((ele, index) => {
        if (ele.$cellEdit && !this.cascaderFormList[index]) {
          this.cascaderFormList[index] = this.deepClone(ele);
        }
        ele.$cellEdit = ele.$cellEdit || false;
        ele.$index = index;
      });
    },
    //拖动表头事件
    headerDragend(newWidth, oldWidth, column, event) {
      this.$emit("header-dragend", newWidth, oldWidth, column, event);
    },
    headerSort(oldIndex, newIndex) {
      const visibleColumns = this.columnOption.filter(
        (col) => col.hide !== true
      );
      const oldProp = visibleColumns[oldIndex].prop;
      const newProp = visibleColumns[newIndex].prop;
      const allColumns = this.columnOption;
      const realOldIndex = allColumns.findIndex((col) => col.prop === oldProp);
      const realNewIndex = allColumns.findIndex((col) => col.prop === newProp);
      const targetRow = allColumns.splice(realOldIndex, 1)[0];
      allColumns.splice(realNewIndex, 0, targetRow);
      this.doLayout();
    },
    scroll(params) {
      this.$emit("scroll", params);
    },
    //展开或则关闭
    expandChange(row, expand) {
      this.$emit("expand-change", row, expand);
    },
    //设置单选
    currentRowChange(row) {
      this.$emit("current-row-change", row);
    },
    //刷新事件
    refreshChange() {
      this.$emit("refresh-change");
    },
    // 选中实例
    toggleSelection(rows, checked) {
      if (rows) {
        rows.forEach((row) => {
          this.$refs.table.toggleRowSelection(row, checked);
        });
      } else {
        this.$refs.table.clearSelection();
      }
    },
    // 选择回调
    selectionChange(val) {
      this.tableSelect = val;
      this.$emit("selection-change", this.tableSelect);
    },
    // 单个选择回调
    select(selection, row) {
      this.$emit("select", selection, row);
    },
    // 点击勾选全选 Checkbox
    selectAll(selection) {
      this.$emit("select-all", selection);
    },
    //筛选回调用
    filterChange(filters) {
      this.$emit("filter-change", filters);
    },
    // 排序回调
    sortChange(val) {
      this.$emit("sort-change", val);
    },
    // 行双击
    rowDblclick(row, event) {
      this.$emit("row-dblclick", row, event);
    },
    // 行单机
    rowClick(row, event, column) {
      this.$emit("row-click", row, event, column);
    },
    //当单元格 hover 进入时会触发该事件
    cellMouseEnter(row, column, cell, event) {
      this.$emit("cell-mouse-enter", row, column, cell, event);
    },
    //当单元格 hover 退出时会触发该事件
    cellMouseLeave(row, column, cell, event) {
      this.$emit("cell-mouse-leave", row, column, cell, event);
    },
    //当某个单元格被点击时会触发该事件
    cellClick(row, column, cell, event) {
      this.$emit("cell-click", row, column, cell, event);
    },
    //	当某一列的表头被点击时会触发该事件
    headerClick(column, event) {
      this.$emit("header-click", column, event);
    },
    //当某一行被鼠标右键点击时会触发该事件
    rowContextmenu(row, column, event) {
      this.$emit("row-contextmenu", row, column, event);
    },
    //当某一列的表头被鼠标右键点击时触发该事件
    headerContextmenu(column, event) {
      this.$emit("header-contextmenu", column, event);
    },
    //当某个单元格被双击击时会触发该事件
    cellDblclick(row, column, cell, event) {
      this.$emit("cell-dblclick", row, column, cell, event);
    },
    //单元格新增
    rowCellAdd(row = {}) {
      let len = this.list.length;
      let formDefault = formInitVal(this.propOption);
      row = this.deepClone(
        Object.assign(
          {
            $cellEdit: true,
            $index: len,
          },
          formDefault,
          row
        )
      );
      this.list.push(row);
    },
    //行取消
    rowCancel(row, index) {
      if (this.validatenull(row[this.rowKey])) {
        this.list.splice(index, 1);
        delete this.cascaderDIC[index];
      } else {
        this.cascaderFormList[index].$cellEdit = false;
        this.cascaderDIC[index] = this.cascaderDicList[index];
        this.list[index] = this.cascaderFormList[index];
      }
      delete this.cascaderDicList[index];
      delete this.cascaderFormList[index];
      this.cascaderIndexList.splice(this.cascaderIndexList.indexOf(index), 1);
    },
    //行编辑点击
    rowCell(row, index) {
      if (row.$cellEdit) {
        this.rowCellUpdate(row, index);
      } else {
        this.rowCellEdit(row, index);
      }
    },
    rowCellUpdate(row, index) {
      const done = (newRow) => {
        row = newRow || row;
        this.btnDisabledList[index] = false;
        this.btnDisabled = false;
        row.$cellEdit = false;
        this.list[index] = row;
        this.cascaderIndexList.splice(this.cascaderIndexList.indexOf(index), 1);
        delete this.cascaderFormList[index];
      };
      const loading = () => {
        this.btnDisabledList[index] = false;
        this.btnDisabled = false;
      };
      this.validateCellField(index).then(() => {
        this.btnDisabledList[index] = true;
        this.btnDisabled = true;
        if (this.validatenull(row[this.rowKey])) {
          this.$emit("row-save", row, done, loading);
        } else {
          this.$emit("row-update", row, index, done, loading);
        }
      });
    },
    // 单元格编辑
    rowCellEdit(row, index) {
      row.$cellEdit = true;
      //缓冲行数据
      this.cascaderFormList[index] = this.deepClone(row);
      //缓冲级联字典
      this.cascaderDicList[index] = this.deepClone(this.cascaderDIC[index]);
    },
    // 对部分表单字段进行校验
    validateCellForm(cb) {
      return new Promise((resolve) => {
        this.$refs.cellForm.validate((valid, msg) => {
          resolve(msg);
        });
      });
    },
    validateCellField(index) {
      return new Promise((resolve, reject) => {
        this.$refs.cellForm.validate((valid, msg = {}) => {
          let result = true;
          let list = [];
          Object.keys(msg).forEach((ele) => {
            if (ele.indexOf(`list.${index}.`) !== -1) {
              result = false;
            } else {
              list.push(ele);
            }
          });
          if (!this.validatenull(list)) this.$refs.cellForm.clearValidate(list);
          if (result) resolve();
        });
      });
    },
    clearValidate(list) {
      this.$refs.cellForm.clearValidate(list);
    },
    rowAdd() {
      this.$refs.dialogForm.show("add");
    },
    rowSave() {
      return this.$refs.dialogForm.$refs.tableForm.submit();
    },
    rowUpdate() {
      return this.$refs.dialogForm.$refs.tableForm.submit();
    },
    closeDialog() {
      return this.$refs.dialogForm.closeDialog();
    },
    getPropRef(prop) {
      return this.$refs.dialogForm.$refs.tableForm.getPropRef(prop);
    },
    setVal() {
      this.$emit("update:modelValue", this.tableForm);
      this.$emit("change", this.tableForm);
    },
    // 编辑
    rowEdit(row, index) {
      this.tableForm = this.deepClone(row);
      this.tableIndex = index;
      this.setVal();
      this.$refs.dialogForm.show("edit");
    },
    //复制
    rowCopy(row) {
      this.tableForm = this.deepClone(row);
      delete this.tableForm[this.rowKey];
      this.tableIndex = -1;
      this.setVal();
      this.$refs.dialogForm.show("add");
    },
    //查看
    rowView(row, index) {
      this.tableForm = this.deepClone(row);
      this.tableIndex = index;
      this.setVal();
      this.$refs.dialogForm.show("view");
    },
    // 删除
    rowDel(row, index) {
      this.$emit("row-del", row, index, () => {
        let { parentList, index } = this.findData(row[this.rowKey]);
        if (parentList) parentList.splice(index, 1);
      });
    },
    //合并行
    tableSpanMethod(param) {
      if (typeof this.spanMethod === "function") return this.spanMethod(param);
    },
    //合集统计逻辑
    tableSummaryMethod(param) {
      let sumsList = {};
      let sums = [];
      const { columns, data } = param;
      //如果自己写逻辑则调用summaryMethod方法
      if (typeof this.summaryMethod === "function") {
        sums = this.summaryMethod(param);
        columns.forEach((column, index) => {
          sumsList[column.property] = sums[index];
        });
        this.sumsList = sumsList;
      } else {
        columns.forEach((column, index) => {
          let currItem = this.sumColumnList.find(
            (item) => item.name === column.property
          );
          if (currItem) {
            let decimals = currItem.decimals !== void 0 ? currItem.decimals : 2;
            let label = currItem.label || "";
            switch (currItem.type) {
              case "count":
                sums[index] = label + data.length;
                break;
              case "avg":
                let avgValues = data.map((item) =>
                  Number(item[column.property])
                );
                let nowindex = 1;
                sums[index] = avgValues.reduce((perv, curr) => {
                  let value = Number(curr);
                  if (!isNaN(value)) {
                    return (perv * (nowindex - 1) + curr) / nowindex++;
                  } else {
                    return perv;
                  }
                }, 0);
                sums[index] = label + sums[index].toFixed(decimals);
                break;
              case "sum":
                let values = data.map((item) => Number(item[column.property]));
                sums[index] = values.reduce((perv, curr) => {
                  let value = Number(curr);
                  if (!isNaN(value)) {
                    return perv + curr;
                  } else {
                    return perv;
                  }
                }, 0);
                sums[index] = label + sums[index].toFixed(decimals);
                break;
            }
            sumsList[column.property] = sums[index];
          } else {
            sums[index] = "";
          }
        });
      }
      this.sumsList = sumsList;
      return sums;
    },
    tableDrop(type, el, callback) {
      if (this.isSortable !== true) {
        if (type == "row" && !this.isRowSort) {
          return;
        } else if (type == "column" && !this.isColumnSort) {
          return;
        }
      } else if (!el) return;
      if (!window.Sortable) {
        packages.logs("Sortable");
        return;
      }
      return window.Sortable.create(el, {
        ghostClass: config.ghostClass,
        chosenClass: config.ghostClass,
        animation: 100,
        delay: 100,
        onEnd: (evt) => callback(evt),
        filter: ".el-table-fixed-column--right",
      });
    },
    findData(id) {
      let result = {};
      const callback = (parentList, parent) => {
        parentList.forEach((ele, index) => {
          if (ele[this.rowKey] == id) {
            result = {
              item: ele,
              index: index,
              parentList: parentList,
              parent: parent,
            };
          }
          if (ele[this.childrenKey]) {
            callback(ele[this.childrenKey], ele);
          }
        });
      };
      callback(this.list);
      return result;
    },
  },
});

export { script as default };
