<template>
  <div :class="b({'card':!option.card})">
    <component :is="tableOption.titleSize || 'h2'"
               :style="tableOption.titleStyle"
               v-if="tableOption.title">{{tableOption.title}}</component>
    <!-- 搜索组件 -->
    <header-search ref="headerSearch">
      <template slot="search"
                slot-scope="scope">
        <slot name="search"
              v-bind="scope"></slot>
      </template>
      <template slot="searchMenu"
                slot-scope="scope">
        <slot name="searchMenu"
              v-bind="scope"></slot>
      </template>
      <template slot-scope="scope"
                v-for="item in searchSlot"
                :slot="item">
        <slot v-bind="scope"
              :name="item"></slot>
      </template>
    </header-search>
    <el-card :shadow="isCard"
             :class="b('body')">
      <slot name="header"></slot>
      <!-- 表格功能列 -->
      <header-menu ref="headerMenu"
                   v-if="vaildData(tableOption.header,true)">
        <template slot="menuLeft"
                  slot-scope="scope">
          <slot name="menuLeft"
                v-bind="scope"></slot>
        </template>
        <template slot="menuRight"
                  slot-scope="scope">
          <slot name="menuRight"
                v-bind="scope"></slot>
        </template>
      </header-menu>
      <el-tag class="avue-crud__tip"
              v-if="vaildData(tableOption.tip,config.tip) && tableOption.selection">
        <span class="avue-crud__tip-name">
          {{t('crud.tipStartTitle')}}
          <span class="avue-crud__tip-count">{{selectLen}}</span>
          {{t('crud.tipEndTitle')}}
        </span>
        <el-button type="text"
                   size="small"
                   @click="clearSelection"
                   v-permission="getPermission('selectClearBtn')"
                   v-if="vaildData(tableOption.selectClearBtn,config.selectClearBtn) && tableOption.selection">{{t('crud.emptyBtn')}}</el-button>
        <slot name="tip"></slot>
      </el-tag>
      <slot name="body"></slot>
      <el-form :model="cellForm"
               :show-message="false"
               @validate="handleValidate"
               ref="cellForm">
        <component :is="tableName"
                   :key="reload"
                   :data="cellForm.list"
                   :row-key="rowKey"
                   :class="{'avue-crud--indeterminate':vaildData(tableOption.indeterminate,false)}"
                   :size="$AVUE.tableSize || controlSize"
                   :lazy="vaildData(tableOption.lazy,false)"
                   :load="treeLoad"
                   :tree-props="treeProps"
                   :expand-row-keys="tableOption.expandRowKeys"
                   :default-expand-all="tableOption.defaultExpandAll"
                   :highlight-current-row="tableOption.highlightCurrentRow"
                   @current-change="currentRowChange"
                   @expand-change="expandChange"
                   @header-dragend="headerDragend"
                   :tooltip-effect="tableOption.tooltipEffect"
                   :show-summary="tableOption.showSummary"
                   :summary-method="tableSummaryMethod"
                   :span-method="tableSpanMethod"
                   :stripe="tableOption.stripe"
                   :show-header="tableOption.showHeader"
                   :default-sort="tableOption.defaultSort"
                   @row-click="rowClick"
                   @row-dblclick="rowDblclick"
                   @cell-mouse-enter="cellMouseEnter"
                   @cell-mouse-leave="cellMouseLeave"
                   @cell-click="cellClick"
                   @header-click="headerClick"
                   @row-contextmenu="rowContextmenu"
                   @header-contextmenu="headerContextmenu"
                   @cell-dblclick="cellDblclick"
                   :row-class-name="rowClassName"
                   :cell-class-name="cellClassName"
                   :row-style="rowStyle"
                   :cell-style="cellStyle"
                   :fit="tableOption.fit"
                   :header-cell-class-name="headerCellClassName"
                   :header-row-class-name="headerRowClassName"
                   :header-row-style="headerRowStyle"
                   :header-cell-style="headerCellStyle"
                   :max-height="isAutoHeight?tableHeight:tableOption.maxHeight"
                   :height="tableHeight"
                   ref="table"
                   :width="setPx(tableOption.width,config.width)"
                   :border="tableOption.border"
                   v-loading="tableLoading"
                   :element-loading-text="tableOption.loadingText"
                   :element-loading-spinner="tableOption.loadingSpinner"
                   :element-loading-svg="tableOption.loadingSvg"
                   :element-loading-background="tableOption.loadingBackground"
                   @filter-change="filterChange"
                   @selection-change="selectionChange"
                   @select="select"
                   @select-all="selectAll"
                   @sort-change="sortChange">
          <template slot="empty">
            <div :class="b('empty')">
              <slot name="empty"
                    v-if="$slots.empty"></slot>
              <el-empty v-else
                        :image-size="100"
                        :description="tableOption.emptyText || t('crud.emptyText')"></el-empty>
            </div>
          </template>
          <column :columnOption="columnOption">
            <column-default ref="columnDefault"
                            slot="header">
              <template slot-scope="{row,index}"
                        slot="expand">
                <slot :row="row"
                      :index="index"
                      name="expand"></slot>
              </template>
            </column-default>
            <template v-for="item in mainSlot"
                      slot-scope="scope"
                      :slot="item">
              <slot v-bind="scope"
                    :name="item"></slot>
            </template>
            <column-menu slot="footer">
              <template slot="menuHeader"
                        slot-scope="scope">
                <slot name="menuHeader"
                      v-bind="scope"></slot>
              </template>
              <template slot="menuBefore"
                        slot-scope="scope">
                <slot name="menuBefore"
                      v-bind="scope"></slot>
              </template>
              <template slot="menu"
                        slot-scope="scope">
                <slot name="menu"
                      v-bind="scope"></slot>
              </template>
              <template slot="menuBtnBefore"
                        slot-scope="scope">
                <slot name="menuBtnBefore"
                      v-bind="scope"></slot>
              </template>
              <template slot="menuBtn"
                        slot-scope="scope">
                <slot name="menuBtn"
                      v-bind="scope"></slot>
              </template>
            </column-menu>
          </column>
        </component>
      </el-form>
      <slot name="footer"></slot>
    </el-card>
    <!-- 分页 -->
    <table-page ref="tablePage">
      <template slot="page">
        <slot name="page"></slot>
      </template>
    </table-page>

    <!-- 表单 -->
    <dialog-form ref="dialogForm">
      <template slot-scope="scope"
                v-for="item in formSlot"
                :slot="item">
        <slot v-bind="scope"
              :name="item"></slot>
      </template>
      <template slot-scope="scope"
                slot="menuFormBefore">
        <slot name="menuFormBefore"
              v-bind="scope"></slot>
      </template>
      <template slot-scope="scope"
                slot="menuForm">
        <slot name="menuForm"
              v-bind="scope"></slot>
      </template>
    </dialog-form>
    <dialog-column ref="dialogColumn"></dialog-column>
    <dialog-excel ref="dialogExcel"></dialog-excel>
    <dialog-filter ref="dialogFilter"></dialog-filter>
  </div>
</template>
<script>
import create from "core/create";
import packages from "core/packages";
import permission from 'common/directive/permission';
import init from "common/common/init.js";
import tableGrid from './grid/index'
import tablePage from "./table-page";
import headerSearch from "./header-search";
import locale from "core/locale";
import column from "./column";
import headerMenu from "./header-menu";
import dialogColumn from "./dialog-column";
import dialogFilter from "./dialog-filter";
import dialogForm from "./dialog-form";
import dialogExcel from './dialog-excel'
import columnMenu from './column-menu'
import columnDefault from './column-default'
import config from "./config.js";
import { calcCascader, formInitVal } from "core/dataformat";
import { DIC_PROPS } from 'global/variable';
import { getColumn } from 'utils/util'
export default create({
  name: "crud",
  mixins: [init('crud'), locale],
  directives: {
    permission
  },
  provide () {
    return {
      crud: this
    };
  },
  components: {
    column,
    columnDefault,//其它列,
    columnMenu,//操作栏，
    tableGrid,
    tablePage, //分页
    headerSearch, //搜索
    headerMenu, //菜单头部
    dialogColumn, //显隐列
    dialogFilter, //过滤器
    dialogExcel,//导出数据
    dialogForm //分页,
  },
  data () {
    return {
      reload: Math.random(),
      cellForm: {
        list: []
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
      gridShow: false
    };
  },
  created () {
    this.gridShow = this.tableOption.grid
  },
  mounted () {
    this.dataInit();
    this.getTableHeight();
    this.refreshTable()
  },
  computed: {
    tableName () {
      return this.gridShow ? 'tableGrid' : 'elTable'
    },
    tableColumnName () {
      return this.gridShow ? 'tableGridColumn' : 'elTableColumn'
    },
    isSortable () {
      return this.tableOption.sortable;
    },
    isRowSort () {
      return this.tableOption.rowSort;
    },
    isColumnSort () {
      return this.tableOption.columnSort;
    },
    rowParentKey () {
      return this.option.rowParentKey || DIC_PROPS.rowParentKey
    },
    childrenKey () {
      return this.treeProps.children || DIC_PROPS.children
    },
    hasChildrenKey () {
      return this.treeProps.hasChildren || DIC_PROPS.hasChildren
    },
    treeProps () {
      return this.tableOption.treeProps || {}
    },
    isAutoHeight () {
      return this.tableOption.height === "auto"
    },
    formSlot () {
      return this.getSlotList(['Error', 'Label', 'Type', 'Form', 'Header'], this.$scopedSlots, this.propOption)
    },
    searchSlot () {
      return this.getSlotList(['Search'], this.$scopedSlots, this.propOption)
    },
    mainSlot () {
      let result = [];
      this.propOption.forEach(item => {
        if (this.$scopedSlots[item.prop]) result.push(item.prop)
      })
      return this.getSlotList(['Header', 'Form'], this.$scopedSlots, this.propOption).concat(result)
    },
    calcHeight () {
      return (this.tableOption.calcHeight || 0) + this.$AVUE.calcHeight
    },
    propOption () {
      let result = [];
      function findProp (list = []) {
        if (!Array.isArray(list)) return
        list.forEach(ele => {
          if (Array.isArray(ele.children)) findProp(ele.children);
          else result.push(ele);
        });
      }
      findProp(this.columnOption);
      result = calcCascader(result);
      return result;
    },
    isShowSummary () {
      return this.option.showSummary
    },
    isHeader () {
      let flag = false;
      this.columnOption.forEach(ele => {
        if (ele.children) {
          flag = true;
        }
      })
      return flag;
    },
    isTree () {
      let flag = false;
      this.data.forEach(ele => {
        if (ele.children) {
          flag = true;
        }
      })
      return flag
    },
    isCard () {
      return this.option.card ? 'always' : 'never'
    },
    expandLevel () {
      return this.parentOption.expandLevel || 0;
    },
    expandAll () {
      return this.parentOption.expandAll || false;
    },
    parentOption () {
      return this.tableOption || {};
    },
    columnOption () {
      let tableOption = this.deepClone(this.tableOption)
      return getColumn(tableOption.column)
    },
    sumColumnList () {
      return this.tableOption.sumColumnList || [];
    },
    selectLen () {
      return this.tableSelect ? this.tableSelect.length : 0;
    },
  },
  watch: {
    value: {
      handler () {
        this.tableForm = this.value;
      },
      immediate: true,
      deep: true
    },
    list: {
      handler () {
        this.cellForm.list = this.list;
      },
      deep: true
    },
    data: {
      handler () {
        this.dataInit();
      },
      deep: true
    }
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
      }
    },
    value: {
      type: Object,
      default: () => {
        return {};
      }
    },
    search: {
      type: Object,
      default () {
        return {};
      }
    },
    page: {
      type: Object,
      default () {
        return {};
      }
    },
    tableLoading: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    data: {
      type: Array,
      required: true,
      default: () => {
        return [];
      }
    }
  },
  methods: {
    handleGridShow () {
      this.gridShow = !this.gridShow
      this.$emit('grid-status-change', this.gridShow)
    },
    handleValidate (prop, valid, msg) {
      if (!this.listError[prop]) this.$set(this.listError, prop, { valid: false, msg: '' })
      this.listError[prop].valid = !valid
      this.listError[prop].msg = msg
    },
    getPermission (key, row, index) {
      if (typeof this.permission === "function") {
        return this.permission(key, row, index)
      } else if (!this.validatenull(this.permission[key])) {
        return this.permission[key]
      } else {
        return true;
      }
    },
    getTableHeight () {
      if (this.isAutoHeight) {
        this.$nextTick(() => {
          const clientHeight = document.documentElement.clientHeight;
          const calcHeight = this.calcHeight || 0;
          const tableRef = this.$refs.table;
          const tablePageRef = this.$refs.tablePage;
          let tableHeight = clientHeight - calcHeight;
          if (tableRef && tableRef.$el.getBoundingClientRect) {
            const tableBoundingClientRect = tableRef.$el.getBoundingClientRect();
            tableHeight -= tableBoundingClientRect.top;
          }
          if (tablePageRef && tablePageRef.$el.getBoundingClientRect) {
            const tablePageBoundingClientRect = tablePageRef.$el.getBoundingClientRect();
            tableHeight -= tablePageBoundingClientRect.height;
          }
          this.tableHeight = tableHeight;
        });
      } else {
        this.tableHeight = this.tableOption.height;
      }
    },
    doLayout () {
      this.$refs.table.doLayout()
    },
    refreshTable (callback) {
      this.reload = Math.random()
      this.$nextTick(() => {
        callback && callback()
      })
    },
    //树懒加载
    treeLoad (tree, treeNode, resolve) {
      this.$emit('tree-load', tree, treeNode, (data) => {
        tree.children = data;
        resolve(data);
      })
    },
    menuIcon (value) {
      return this.vaildData(this.tableOption[value + 'Text'], this.t("crud." + value))
    },
    getBtnIcon (value) {
      const name = value + 'Icon';
      return this.tableOption[name] || config[name]
    },
    //对部分表单字段进行校验的方法
    validateField (val, fn) {
      return this.$refs.dialogForm.$refs.tableForm.validateField(val, fn);
    },
    clearSelection () {
      this.$emit('selection-clear', this.deepClone(this.tableSelect))
      this.$refs.table.clearSelection();

    },
    toggleAllSelection () {
      this.$refs.table.toggleAllSelection();
    },
    toggleRowSelection (row, selected) {
      this.$refs.table.toggleRowSelection(row, selected);
    },
    toggleRowExpansion (row, expanded) {
      this.$refs.table.toggleRowExpansion(row, expanded);
    },
    setCurrentRow (row) {
      this.$refs.table.setCurrentRow(row);
    },
    dataInit () {
      this.list = this.data;
      this.list.forEach((ele, index) => {
        if (ele.$cellEdit && !this.cascaderFormList[index]) {
          this.cascaderFormList[index] = this.deepClone(ele);
        }
        this.$set(ele, '$cellEdit', ele.$cellEdit || false);
        this.$set(ele, '$index', index);
      });
    },
    //拖动表头事件
    headerDragend (newWidth, oldWidth, column, event) {
      let obj = this.objectOption[column.property];
      if (obj) this.$set(this.objectOption[column.property], 'width', newWidth)
      this.$emit("header-dragend", newWidth, oldWidth, column, event);
    },
    headerSort (oldIndex, newIndex) {
      let column = this.columnOption;
      const notHideColumn = column.filter(ele => ele.hide != true);
      const newColumn = notHideColumn[newIndex]
      const oldColumn = notHideColumn[oldIndex];
      newIndex = column.findIndex(ele => ele.prop == newColumn.prop)
      oldIndex = column.findIndex(ele => ele.prop == oldColumn.prop)
      let targetRow = column.splice(oldIndex, 1)[0]
      column.splice(newIndex, 0, targetRow)
      this.refreshTable()
    },
    // 清除过滤器执行函数
    clearFilter (name) {
      this.$refs.table.clearFilter(name);
    },
    //展开或则关闭
    expandChange (row, expand) {
      this.$emit("expand-change", row, expand);
    },
    //设置单选
    currentRowChange (currentRow, oldCurrentRow) {
      this.$emit("current-row-change", currentRow, oldCurrentRow);
    },
    //刷新事件
    refreshChange () {
      this.$emit("refresh-change");
    },
    // 选中实例
    toggleSelection (rows, checked) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.table.toggleRowSelection(row, checked);
        });
      } else {
        this.$refs.table.clearSelection();
      }
    },
    // 选择回调
    selectionChange (val) {
      this.tableSelect = val;
      this.$emit("selection-change", this.tableSelect);
    },
    // 单个选择回调
    select (selection, row) {
      this.$emit("select", selection, row);
    },
    // 点击勾选全选 Checkbox
    selectAll (selection) {
      this.$emit("select-all", selection);
    },
    //筛选回调用
    filterChange (filters) {
      this.$emit("filter-change", filters);
    },
    // 排序回调
    sortChange (val) {
      this.$emit("sort-change", val);
    },
    // 行双击
    rowDblclick (row, event) {
      this.$emit("row-dblclick", row, event);
    },
    // 行单机
    rowClick (row, event, column) {
      this.$emit("row-click", row, event, column);
    },
    //清空排序
    clearSort () {
      this.$refs.table.clearSort();
    },
    //当单元格 hover 进入时会触发该事件
    cellMouseEnter (row, column, cell, event) {
      this.$emit("cell-mouse-enter", row, column, cell, event);
    },
    //当单元格 hover 退出时会触发该事件
    cellMouseLeave (row, column, cell, event) {
      this.$emit("cell-mouse-leave", row, column, cell, event);
    },
    //当某个单元格被点击时会触发该事件
    cellClick (row, column, cell, event) {
      this.$emit("cell-click", row, column, cell, event);
    },
    //	当某一列的表头被点击时会触发该事件
    headerClick (column, event) {
      this.$emit("header-click", column, event);
    },
    //当某一行被鼠标右键点击时会触发该事件
    rowContextmenu (row, column, event) {
      this.$emit("row-contextmenu", row, column, event);
    },
    //当某一列的表头被鼠标右键点击时触发该事件
    headerContextmenu (column, event) {
      this.$emit("header-contextmenu", column, event);
    },
    //当某个单元格被双击击时会触发该事件
    cellDblclick (row, column, cell, event) {
      this.$emit("cell-dblclick", row, column, cell, event);
    },
    //单元格新增
    rowCellAdd (row = {}) {
      let len = this.list.length
      let formDefault = formInitVal(this.propOption).tableForm;
      row = this.deepClone(
        Object.assign(
          {
            $cellEdit: true,
            $index: len,
          },
          formDefault,
          row
        ))
      this.list.push(row);
    },
    //行取消
    rowCancel (row, index) {
      if (this.validatenull(row[this.rowKey])) {
        this.list.splice(index, 1);
        delete this.cascaderDIC[index]
      } else {
        this.cascaderFormList[index].$cellEdit = false;
        this.$set(this.cascaderDIC, index, this.cascaderDicList[index]);
        this.$set(this.list, index, this.cascaderFormList[index]);
      }
      delete this.cascaderDicList[index]
      delete this.cascaderFormList[index]
      this.cascaderIndexList.splice(this.cascaderIndexList.indexOf(index), 1);
    },
    //行编辑点击
    rowCell (row, index) {
      if (row.$cellEdit) {
        this.rowCellUpdate(row, index);
      } else {
        this.rowCellEdit(row, index);
      }
    },
    rowCellUpdate (row, index) {
      row = this.deepClone(row);
      var result = this.validateCellField(index)
      const done = () => {
        this.btnDisabledList[index] = false;
        this.btnDisabled = false;
        this.list[index] = row;
        this.list[index].$cellEdit = false
        this.cascaderIndexList.splice(this.cascaderIndexList.indexOf(index), 1);
        delete this.cascaderFormList[index]
      }
      const loading = () => {
        this.btnDisabledList[index] = false;
        this.btnDisabled = false;
      }
      if (result) {
        this.btnDisabledList[index] = true;
        this.btnDisabled = true;
        if (this.validatenull(row[this.rowKey])) {
          this.$emit("row-save", row, done, loading);
        } else {
          this.$emit("row-update", row, index, done, loading);
        }
      }
    },
    // 单元格编辑
    rowCellEdit (row, index) {
      row.$cellEdit = true;
      //缓冲行数据
      this.cascaderFormList[index] = this.deepClone(row);
      //缓冲级联字典
      this.cascaderDicList[index] = this.deepClone(this.cascaderDIC[index]);
    },
    // 对部分表单字段进行校验
    validateCellForm (cb) {
      return new Promise(resolve => {
        this.$refs.cellForm.validate((valid, msg) => {
          resolve(msg)
        });
      })
    },
    validateCellField (index) {
      let result = true
      for (const item of this.$refs.cellForm.fields) {
        if (item.prop.split('.')[1] == index) {
          this.$refs.cellForm.validateField(item.prop, (error) => {
            if (error) {
              result = false
            }
          })
        }
        if (!result) break
      }
      return result
    },
    rowAdd () {
      this.$refs.dialogForm.show("add");
    },
    rowSave () {
      return this.$refs.dialogForm.$refs.tableForm.submit();
    },
    rowUpdate () {
      return this.$refs.dialogForm.$refs.tableForm.submit();
    },
    closeDialog () {
      return this.$refs.dialogForm.closeDialog()
    },
    getPropRef (prop) {
      return this.$refs.dialogForm.$refs.tableForm.getPropRef(prop);
    },
    setVal () {
      this.$emit("input", this.tableForm);
      this.$emit("change", this.tableForm);
    },
    // 编辑
    rowEdit (row, index) {
      this.tableForm = this.deepClone(row);
      this.tableIndex = index;
      this.setVal()
      this.$refs.dialogForm.show("edit");
    },
    //复制
    rowCopy (row) {
      this.tableForm = this.deepClone(row);
      delete this.tableForm[this.rowKey]
      this.tableIndex = -1;
      this.setVal()
      this.$refs.dialogForm.show("add");
    },
    //查看
    rowView (row, index) {
      this.tableForm = this.deepClone(row);
      this.tableIndex = index;
      this.setVal()
      this.$refs.dialogForm.show("view");
    },
    // 删除
    rowDel (row, index) {
      this.$emit("row-del", row, index, () => {
        let { parentList, index } = this.findData(row[this.rowKey])
        if (parentList) parentList.splice(index, 1);
      });
    },
    //合并行
    tableSpanMethod (param) {
      if (typeof this.spanMethod === "function") return this.spanMethod(param);
    },
    //合集统计逻辑
    tableSummaryMethod (param) {
      let sumsList = {}
      let sums = [];
      const { columns, data } = param;
      //如果自己写逻辑则调用summaryMethod方法
      if (typeof this.summaryMethod === "function") {
        sums = this.summaryMethod(param)
        columns.forEach((column, index) => {
          sumsList[column.property] = sums[index]
        })
        this.sumsList = sumsList;
      } else {
        columns.forEach((column, index) => {
          let currItem = this.sumColumnList.find(item => item.name === column.property);
          if (currItem) {
            let decimals = currItem.decimals || 2;
            let label = currItem.label || '';
            switch (currItem.type) {
              case "count":
                sums[index] = label + data.length;
                break;
              case "avg":
                let avgValues = data.map(item => Number(item[column.property]));
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
                let values = data.map(item => Number(item[column.property]));
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
            sumsList[column.property] = sums[index]
          } else {
            sums[index] = "";
          }
        });
      }
      this.sumsList = sumsList;
      return sums;
    },
    tableDrop (type, el, callback) {
      if (this.isSortable !== true) {
        if (type == 'row' && !this.isRowSort) {
          return
        } else if (type == 'column' && !this.isColumnSort) {
          return
        }
      } else if (!el) return
      if (!window.Sortable) {
        packages.logs("Sortable")
        return
      }
      return window.Sortable.create(el, {
        ghostClass: config.ghostClass,
        chosenClass: config.ghostClass,
        animation: 100,
        delay: 0,
        onEnd: evt => callback(evt)
      })
    },
    findData (id) {
      let result = {}
      const callback = (parentList, parent) => {
        parentList.forEach((ele, index) => {
          if (ele[this.rowKey] == id) {
            result = {
              item: ele,
              index: index,
              parentList: parentList,
              parent: parent
            }
          }
          if (ele[this.childrenKey]) {
            callback(ele[this.childrenKey], ele)
          }
        })
      }
      callback(this.list)
      return result;
    },
  }
});
</script>
