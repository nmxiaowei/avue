<template>
  <div :class="b({'card':!option.card})">
    <component :is="tableOption.titleSize || 'h2'"
               :style="tableOption.titleStyle"
               v-if="tableOption.title">{{tableOption.title}}</component>
    <!-- 搜索组件 -->
    <header-search :search="search"
                   ref="headerSearch">
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
    <el-card :shadow="isCard">
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
                   @click="selectClear"
                   v-permission="getPermission('selectClearBtn')"
                   v-if="vaildData(tableOption.selectClearBtn,config.selectClearBtn) && tableOption.selection">{{t('crud.emptyBtn')}}</el-button>
        <slot name="tip"></slot>
      </el-tag>
      <slot name="header"></slot>
      <el-form :model="cellForm"
               :show-message="false"
               @validate="handleValidate"
               ref="cellForm">
        <el-table v-if="reload"
                  :data="cellForm.list"
                  :row-key="handleGetRowKeys"
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
                  :sort-method="sortMethod"
                  :sort-orders="sortOrders"
                  :sort-by="sortBy"
                  :fit="tableOption.fit"
                  :header-cell-class-name="headerCellClassName"
                  :max-height="isAutoHeight?tableHeight:tableOption.maxHeight"
                  :height="tableHeight"
                  ref="table"
                  :width="setPx(tableOption.width,config.width)"
                  :border="tableOption.border"
                  v-loading="tableLoading"
                  @filter-change="filterChange"
                  @selection-change="selectionChange"
                  @select="select"
                  @select-all="selectAll"
                  @sort-change="sortChange">
          <!-- 暂无数据提醒 -->
          <template slot="empty">
            <div :class="b('empty')">
              <slot name="empty"
                    v-if="$slots.empty"></slot>
              <avue-empty v-else
                          size="50"
                          image="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNDEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMCAxKSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgIDxlbGxpcHNlIGZpbGw9IiNGNUY1RjUiIGN4PSIzMiIgY3k9IjMzIiByeD0iMzIiIHJ5PSI3Ii8+CiAgICA8ZyBmaWxsLXJ1bGU9Im5vbnplcm8iIHN0cm9rZT0iI0Q5RDlEOSI+CiAgICAgIDxwYXRoIGQ9Ik01NSAxMi43Nkw0NC44NTQgMS4yNThDNDQuMzY3LjQ3NCA0My42NTYgMCA0Mi45MDcgMEgyMS4wOTNjLS43NDkgMC0xLjQ2LjQ3NC0xLjk0NyAxLjI1N0w5IDEyLjc2MVYyMmg0NnYtOS4yNHoiLz4KICAgICAgPHBhdGggZD0iTTQxLjYxMyAxNS45MzFjMC0xLjYwNS45OTQtMi45MyAyLjIyNy0yLjkzMUg1NXYxOC4xMzdDNTUgMzMuMjYgNTMuNjggMzUgNTIuMDUgMzVoLTQwLjFDMTAuMzIgMzUgOSAzMy4yNTkgOSAzMS4xMzdWMTNoMTEuMTZjMS4yMzMgMCAyLjIyNyAxLjMyMyAyLjIyNyAyLjkyOHYuMDIyYzAgMS42MDUgMS4wMDUgMi45MDEgMi4yMzcgMi45MDFoMTQuNzUyYzEuMjMyIDAgMi4yMzctMS4zMDggMi4yMzctMi45MTN2LS4wMDd6IiBmaWxsPSIjRkFGQUZBIi8+CiAgICA8L2c+CiAgPC9nPgo8L3N2Zz4K"
                          :desc="tableOption.emptyText || '暂无数据'"></avue-empty>
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
              <template slot="menu"
                        slot-scope="scope">
                <slot name="menu"
                      v-bind="scope"></slot>
              </template>
              <template slot="menuBtn"
                        slot-scope="scope">
                <slot name="menuBtn"
                      v-bind="scope"></slot>
              </template>
            </column-menu>
          </column>
        </el-table>
      </el-form>
      <slot name="footer"></slot>
      <!-- 分页 -->
      <table-page ref="tablePage"
                  :page="page">
        <template slot="page">
          <slot name="page"></slot>
        </template>
      </table-page>
    </el-card>
    <!-- 表单 -->
    <dialog-form ref="dialogForm">
      <template slot-scope="scope"
                v-for="item in formSlot"
                :slot="item">
        <slot v-bind="scope"
              :name="item"></slot>
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
import permission from '../../core/directive/permission';
import init from "../../core/common/init.js";
import tablePage from "./table-page";
import headerSearch from "./header-search";
import locale from "../../core/common/locale";
import column from "./column";
import headerMenu from "./header-menu";
import dialogColumn from "./dialog-column";
import dialogFilter from "./dialog-filter";
import dialogForm from "./dialog-form";
import dialogExcel from './dialog-excel'
import columnMenu from './column-menu'
import columnDefault from './column-default'
import config from "./config.js";
import treeToArray, { addAttrs } from "./eval";
import { calcCascader, formInitVal } from "core/dataformat";
export default create({
  name: "crud",
  mixins: [init(), locale,],
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
      reload: true,
      config: config,
      list: [],
      listError: {},
      tableForm: {},
      tableHeight: undefined,
      tableIndex: -1,
      tableSelect: [],
      formIndexList: [],
      sumsList: [],
      cascaderDicList: {},
      formCascaderList: {},
      btnDisabledList: {},
      btnDisabled: false,
      defaultColumn: [{
        label: this.t('crud.column.hide'),
        prop: 'hide'
      }, {
        label: this.t('crud.column.fixed'),
        prop: 'fixed'
      }, {
        label: this.t('crud.column.filters'),
        prop: 'filters'
      }, {
        label: this.t('crud.column.screen'),
        prop: 'screen'
      }, {
        label: this.t('crud.column.sortable'),
        prop: 'sortable'
      }, {
        label: this.t('crud.column.index'),
        prop: 'index',
        hide: true
      }, {
        label: this.t('crud.column.width'),
        prop: 'width',
        hide: true
      }],
      default: {},
      defaultBind: {},

    };
  },
  created () {
    // 初始化数据
    this.dataInit();
  },
  mounted () {
    this.refreshTable(() => {
      //动态计算表格高度
      this.getTableHeight();
    })
  },
  computed: {
    isSortable () {
      return this.tableOption.sortable;
    },
    treeProps () {
      return this.tableOption.treeProps || {}
    },
    isAutoHeight () {
      return this.tableOption.height === "auto"
    },
    cellForm () {
      let list = this.list
      list = list.filter(ele => {
        let result = [];
        for (var o in this.objectOption) {
          if (!this.validatenull(this.objectOption[o].screenValue)) {
            let value = (ele['$' + o] ? ele['$' + o] : ele[o]) + ''
            result.push(value.indexOf(this.objectOption[o].screenValue) !== -1);
          }
        }
        if (this.validatenull(result)) {
          return true;
        }
        return eval(result.join('&&'));
      })
      return {
        list
      }
    },
    formSlot () {
      return this.getSlotList(['Error', 'Label', 'Type', 'Form'], this.$scopedSlots, this.propOption)
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
          result.push(ele);
          if (ele.children) findProp(ele.children);
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
    rowParentKey () {
      return this.tableOption.rowParentKey || "parentId";
    },
    parentOption () {
      return this.tableOption || {};
    },
    columnOption () {
      return this.tableOption.column || [];
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
    data: {
      handler () {
        this.dataInit();
      },
      deep: true
    }
  },
  props: {
    sortBy: Function,
    sortOrders: Array,
    sortMethod: Function,
    spanMethod: Function,
    summaryMethod: Function,
    rowStyle: Function,
    cellStyle: Function,
    beforeClose: Function,
    beforeOpen: Function,
    rowClassName: Function,
    cellClassName: Function,
    headerCellClassName: Function,
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
          const tableRef = this.$refs.table
          const tablePageRef = this.$refs.tablePage
          if (!tableRef) return
          const tableStyle = tableRef.$el;
          const pageStyle = tablePageRef.$el.offsetHeight || 20;
          this.tableHeight = config.clientHeight - tableStyle.offsetTop - pageStyle - this.calcHeight
        })
      } else {
        this.tableHeight = this.tableOption.height;
      }
    },
    doLayout () {
      this.$refs.table.doLayout()
    },
    refreshTable (callback) {
      this.reload = false;
      this.$nextTick(() => {
        this.reload = true;
        //是否开启表格排序
        setTimeout(() => this.$refs.columnDefault.setSort())
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
    // 格式化数据源
    formatData () {
      const data = this.data;
      if (data.length === 0) {
        return [];
      }
      addAttrs(this, data, {
        expand: this.expandAll,
        expandLevel: this.expandLevel
      });
      this.list = treeToArray(this, data);
    },
    menuIcon (value) {
      return this.vaildData(this.tableOption[value + 'Text'], this.t("crud." + value))
    },
    getBtnIcon (value) {
      const name = value + 'Icon';
      return this.tableOption[name] || config[name]
    },
    //对部分表单字段进行校验的方法
    validateField (val) {
      return this.$refs.dialogForm.$refs.tableForm.validateField(val);
    },
    handleGetRowKeys (row) {
      const rowKey = row[this.rowKey];
      return rowKey;
    },
    selectClear () {
      this.$refs.table.clearSelection();
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
    columnInit () {
      this.propOption.forEach(column => {
        if (this.defaultBind[column.prop] === true) return
        this.defaultColumn.forEach(ele => {
          if (!this.objectOption[column.prop][ele.prop] && ele.prop == 'index') this.$set(this.objectOption[column.prop], ele.prop, '')
          if (['hide', 'filters', 'index'].includes(ele.prop)) {
            this.$watch(`objectOption.${column.prop}.${ele.prop}`, () => this.refreshTable())
          }
        })
        this.defaultBind[column.prop] = true;
      })
    },
    dataInit () {
      this.list = this.data;
      //初始化序列的参数
      this.list.forEach((ele, index) => {
        if (ele.$cellEdit && !this.formCascaderList[index]) {
          this.formCascaderList[index] = this.deepClone(ele);
        }
        ele.$index = index;
      });
    },
    //拖动表头事件
    headerDragend (newWidth, oldWidth, column, event) {
      this.objectOption[column.property].width = newWidth
      this.$emit("header-dragend", newWidth, oldWidth, column, event);
    },
    headerSort (oldIndex, newIndex) {
      let column = this.propOption;
      let targetRow = column.splice(oldIndex, 1)[0]
      column.splice(newIndex, 0, targetRow)
      this.propOption.forEach((ele, index) => {
        this.objectOption[ele.prop].index = index + 1;
      })
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
    toggleSelection (rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.table.toggleRowSelection(row);
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
    //行编辑点击
    rowCell (row, index) {
      if (row.$cellEdit) {
        this.rowCellUpdate(row, index);
      } else {
        this.rowCellEdit(row, index);
      }
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
      this.formIndexList.push(len);
      setTimeout(() => this.$refs.columnDefault.setSort())
    },
    //行取消
    rowCancel (row, index) {
      if (this.validatenull(row[this.rowKey])) {
        this.list.splice(index, 1);
        return;
      }
      this.formCascaderList[index].$cellEdit = false;
      //设置行数据
      this.$set(this.list, index, this.formCascaderList[index]);
      delete this.formCascaderList[index]
      //设置级联字典
      this.$set(this.cascaderDIC, index, this.cascaderDicList[index]);
      this.formIndexList.splice(this.formIndexList.indexOf(index), 1);
    },
    // 单元格编辑
    rowCellEdit (row, index) {
      row.$cellEdit = true;
      this.$set(this.list, index, row);
      //缓冲行数据
      this.formCascaderList[index] = this.deepClone(row);
      //缓冲级联字典
      this.cascaderDicList[index] = this.deepClone(this.cascaderDIC[index]);
      setTimeout(() => {
        this.formIndexList.push(index);
      }, 1000);
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
    rowCellUpdate (row, index) {
      var result = this.validateCellField(index)
      const done = () => {
        this.btnDisabledList[index] = false;
        this.btnDisabled = false;
        row.$cellEdit = false;
        this.$set(this.list, index, row);
        delete this.formCascaderList[index]
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
    //对象克隆
    rowClone (row) {
      let rowData = {};
      Object.keys(row).forEach(ele => {
        if (!["_parent", "children"].includes(ele)) {
          rowData[ele] = row[ele];
        }
      });
      return rowData;
    },
    getPropRef (prop) {
      return this.$refs.dialogForm.$refs.tableForm.getPropRef(prop);
    },
    // 编辑
    rowEdit (row, index) {
      this.tableForm = this.rowClone(row);
      this.tableIndex = index;
      this.$emit("input", this.tableForm);
      this.$refs.dialogForm.show("edit");
    },
    //复制
    rowCopy (row) {
      this.tableForm = this.rowClone(row);
      delete this.tableForm[this.rowKey]
      this.tableIndex = -1;
      this.$emit("input", this.tableForm);
      this.$refs.dialogForm.show("add");
    },
    //查看
    rowView (row, index) {
      this.tableForm = this.rowClone(row);
      this.tableIndex = index;
      this.$emit("input", this.tableForm);
      this.$refs.dialogForm.show("view");
    },
    vaildParent (row) {
      return this.validatenull(row[this.rowParentKey])
    },
    // 删除
    rowDel (row, index) {
      this.$emit("row-del", row, index, () => {
        const callback = (list = []) => {
          let index = list.findIndex(ele => ele[this.rowKey] === row[this.rowKey])
          list.splice(index, 1);
        }
        if (this.isTree) {
          if (this.vaildParent(row)) {
            callback(this.data)
          } else {
            let parent = this.findObject(this.data, row[this.rowParentKey], this.rowKey);
            if (parent === undefined) {
              callback(this.data)
            } else {
              callback(parent.children)
            }
          }
        } else {
          callback(this.data)
        }

      });
    },
    //合并行
    tableSpanMethod (param) {
      if (typeof this.spanMethod === "function") return this.spanMethod(param);
    },
    //合集统计逻辑
    tableSummaryMethod (param) {
      //如果自己写逻辑则调用summaryMethod方法
      if (typeof this.summaryMethod === "function")
        return this.summaryMethod(param);
      const { columns, data } = param;
      const sums = [];
      if (columns.length > 0) {
        columns.forEach((column, index) => {
          let currItem = this.sumColumnList.find(
            item => item.name === column.property
          );
          if (index === 0) {
            sums[index] = ''
          } else if (currItem) {
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
          } else {
            sums[index] = "-";
          }
        });
      }
      this.sumsList = sums;
      return sums;
    },
    tableDrop (el, callback) {
      if (this.isSortable) {
        if (!window.Sortable) {
          packages.logs("Sortable")
          return
        }
        window.Sortable.create(el, {
          ghostClass: config.ghostClass,
          chosenClass: config.ghostClass,
          animation: 500,
          delay: 0,
          onEnd: evt => callback(evt)
        })
      }
    }
  }
});
</script>
