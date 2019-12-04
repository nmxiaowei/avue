<template>
  <div :class="b()">
    <!-- 头部组件 -->
    <header-title ref="headerTitle"
                  v-show="vaildData(tableOption.header,true)"></header-title>
    <!-- 搜索组件 -->
    <header-search v-model="searchForm"
                   ref="headerSearch">
      <template slot="search">
        <slot name="search"></slot>
      </template>
      <template slot="searchMenu"
                slot-scope="{size}">
        <slot name="searchMenu"
              :size="size"></slot>
      </template>
      <template slot-scope="{value,column,dic,size,label,disabled}"
                v-for="item in columnOption"
                :slot="item.prop">
        <slot :value="value"
              :column="column"
              :dic="dic"
              :size="size"
              :label="label"
              :disabled="disabled"
              :row="searchForm"
              :name="item.prop+'Search'"
              v-if="item.searchslot"></slot>
      </template>
    </header-search>
    <!-- 表格功能列 -->
    <header-menu ref="headerMenu"
                 v-show="vaildData(tableOption.header,true)">
      <template slot="menuLeft">
        <slot name="menuLeft"></slot>
      </template>
      <template slot="menuRight">
        <slot name="menuRight"></slot>
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
                 v-permission="permission.selectClearBtn"
                 v-if="vaildData(tableOption.selectClearBtn,config.selectClearBtn) && tableOption.selection">{{t('crud.emptyBtn')}}</el-button>
      <slot name="tip"></slot>
    </el-tag>
    <slot name="header"></slot>
    <el-table v-if="doLayout"
              :data="list"
              :row-key="handleGetRowKeys"
              :class="{'avue-crud--indeterminate':vaildData(tableOption.indeterminate,false)}"
              :size="controlSize"
              :lazy="vaildData(tableOption.lazy,false)"
              :load="treeload"
              :tree-props="tableOption.treeProps || {}"
              :expand-row-keys="tableOption.expandRowKeys"
              :default-expand-all="tableOption.defaultExpandAll"
              :highlight-current-row="tableOption.highlightCurrentRow"
              @current-change="currentRowChange"
              @expand-change="expandChange"
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
              :header-cell-class-name="headerCellClassName"
              :max-height="tableOption.maxHeight"
              :height="tableHeight"
              ref="table"
              :width="setPx(tableOption.width,config.width)"
              :border="tableOption.border"
              v-loading="tableLoading"
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
                      :desc="tableOption.emptyText || 暂无数据"></avue-empty>
        </div>
      </template>

      <!-- 折叠面板  -->
      <el-table-column type="expand"
                       :width="tableOption.expandWidth || config.expandWidth"
                       :fixed="vaildData(tableOption.expandFixed,config.expandFixed)"
                       align="center"
                       v-if="tableOption.expand">
        <template slot-scope="props">
          <slot :row="props.row"
                name="expand"></slot>
        </template>
      </el-table-column>
      <!-- 拖动排序  -->
      <el-table-column v-if="tableOption.sortable && tableOption.dragHandler"
                       :width="tableOption.sortableWidth || config.sortableWidth"
                       :fixed="vaildData(tableOption.sortableFixed,config.sortableFixed)"
                       align="center">
        <template slot="header"
                  slot-scope="scope">
          <i class="el-icon-sort" />
        </template>
        <template slot-scope="scope">
          <span class="avue-crud__drag-handler">
            <i class="el-icon-rank" />
          </span>
        </template>
      </el-table-column>
      <!-- 选择框 -->
      <el-table-column v-if="tableOption.selection"
                       type="selection"
                       :selectable="tableOption.selectable"
                       :reserve-selection="vaildData(tableOption.reserveSelection,false)"
                       :width="tableOption.selectionWidth || config.selectionWidth"
                       :fixed="vaildData(tableOption.selectionFixed,config.selectionFixed)"
                       align="center"></el-table-column>
      <!-- 序号 -->
      <el-table-column v-if="this.vaildData(tableOption.index,false)"
                       :label="tableOption.indexLabel || config.indexLabel"
                       type="index"
                       :width="tableOption.indexWidth || config.indexWidth"
                       :index="indexMethod"
                       :fixed="vaildData(tableOption.indexFixed,config.indexFixed)"
                       align="center"></el-table-column>
      <!-- <el-table-column width="0px"></el-table-column> -->
      <column :columnOption="columnOption"
              :disabled="btnDisabled">
        <template v-for="(item,index) in propOption"
                  slot-scope="scope"
                  :slot="item.prop">
          <slot :row="scope.row"
                :dic="scope.dic"
                :size="scope.size"
                :label="scope.label"
                :name="item.prop"></slot>
        </template>
      </column>
      <el-table-column :fixed="vaildData(tableOption.menuFixed,config.menuFixed)"
                       v-if="vaildData(tableOption.menu,config.menu)"
                       :label="t('crud.menu')"
                       :align="tableOption.menuAlign || config.menuAlign"
                       :header-align="tableOption.menuheaderAlign || config.menuheaderAlign"
                       :width="isMobile?(tableOption.menuXsWidth || config.menuXsWidth):( tableOption.menuWidth || config.menuWidth)">
        <template slot-scope="scope">
          <el-dropdown v-if="menuType==='menu'"
                       style="margin-right:9px;">
            <el-button type="primary"
                       :size="isMediumSize">
              {{t('crud.menuBtn')}}
              <i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item v-if="vaildData(tableOption.viewBtn,true)"
                                v-permission="permission.viewBtn"
                                @click.native="rowView(scope.row,scope.$index)">{{t('crud.viewBtn')}}</el-dropdown-item>
              <el-dropdown-item divided
                                v-if="vaildData(tableOption.editBtn,true)"
                                v-permission="permission.editBtn"
                                @click.native="rowEdit(scope.row,scope.$index)">{{t('crud.editBtn')}}</el-dropdown-item>
              <el-dropdown-item divided
                                v-if="vaildData(tableOption.delBtn,true)"
                                v-permission="permission.delBtn"
                                @click.native="rowDel(scope.row,scope.$index)">{{t('crud.delBtn')}}</el-dropdown-item>
              <slot name="menuBtn"
                    :row="scope.row"
                    :dic="scope.dic"
                    :label="scope.label"
                    :index="scope.$index"></slot>
            </el-dropdown-menu>
          </el-dropdown>
          <template v-else-if="['button','text','icon'].includes(menuType)">
            <el-button :type="menuText('primary')"
                       :icon="scope.row.$cellEdit?config.saveBtnIcon:config.editBtnIcon"
                       :size="isMediumSize"
                       :disabled="btnDisabled"
                       @click.stop="rowCell(scope.row,scope.$index)"
                       v-permission="permission.cellBtn"
                       v-if="vaildData(tableOption.cellBtn ,config.cellBtn)">{{menuIcon(scope.row.$cellEdit?'saveBtn':'editBtn')}}</el-button>
            <el-button :type="menuText('danger')"
                       :icon="config.cancelBtnIcon"
                       :size="isMediumSize"
                       :disabled="btnDisabled"
                       @click.stop="rowCanel(scope.row,scope.$index)"
                       v-if="scope.row.$cellEdit && vaildData(tableOption.cancelBtn,config.cancelBtn)">{{menuIcon('cancelBtn')}}</el-button>
            <el-button :type="menuText('success')"
                       :icon="config.viewBtnIcon"
                       :size="isMediumSize"
                       :disabled="btnDisabled"
                       @click.stop="rowView(scope.row,scope.$index)"
                       v-permission="permission.viewBtn"
                       v-if="vaildData(tableOption.viewBtn,config.viewBtn)">{{menuIcon('viewBtn')}}</el-button>
            <el-button :type="menuText('primary')"
                       :icon="config.editBtnIcon"
                       :size="isMediumSize"
                       :disabled="btnDisabled"
                       @click.stop="rowEdit(scope.row,scope.$index)"
                       v-permission="permission.editBtn"
                       v-if="vaildData(tableOption.editBtn,config.editBtn)">{{menuIcon('editBtn')}}</el-button>
            <el-button :type="menuText('danger')"
                       :icon="config.delBtnIcon"
                       :size="isMediumSize"
                       :disabled="btnDisabled"
                       @click.stop="rowDel(scope.row,scope.$index)"
                       v-permission="permission.delBtn"
                       v-if="vaildData(tableOption.delBtn,config.delBtn) && !scope.row.$cellEdit">{{menuIcon('delBtn')}}</el-button>
          </template>
          <slot name="menu"
                :row="scope.row"
                :type="menuText('primary')"
                :disabled="btnDisabled"
                :size="isMediumSize"
                :index="scope.$index"></slot>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <table-page ref="tablePage"></table-page>
    <!-- 表单 -->
    <dialog-form ref="dialogForm"
                 :columnFormOption="columnFormOption"
                 v-model="tableForm">
      <template slot-scope="{value,column,dic,size,label,disabled}"
                v-for="item in columnFormOption"
                :slot="item.prop">
        <slot :value="value"
              :column="column"
              :dic="dic"
              :size="size"
              :label="label"
              :disabled="disabled"
              :row="tableForm"
              :index="tableIndex"
              :name="item.prop+'Form'"
              v-if="item.formslot"></slot>
      </template>
      <template slot-scope="{tableForm,boxType,size}"
                slot="menuForm">
        <slot name="menuForm"
              :size="size"
              :type="boxType"></slot>
      </template>
    </dialog-form>
    <!-- 动态列 -->
    <dialog-column ref="dialogColumn"></dialog-column>
    <!-- 过滤器 -->
    <keep-alive>
      <dialog-filter ref="dialogFilter"></dialog-filter>
    </keep-alive>
  </div>
</template>
<script>
import create from "core/create";
import packages from "core/packages";
import init from "../../core/crud/init.js";
import tablePage from "./table-page";
import headerSearch from "./header-search";
import locale from "../../core/common/locale";
import column from "./column";
import headerMenu from "./header-menu";
import headerTitle from "./header-title";
import dialogColumn from "./dialog-column";
import dialogFilter from "./dialog-filter";
import dialogForm from "./dialog-form";
import config from "./config.js";
import treeToArray, { addAttrs } from "./eval";
import { calcCascader } from "core/dataformat";

export default create({
  name: "crud",
  mixins: [init("crud"), locale],
  provide () {
    return {
      crud: this
    };
  },
  components: {
    column,
    tablePage, //分页
    headerSearch, //搜索
    headerMenu, //菜单头部
    headerTitle, //头部功能
    dialogColumn, //显隐列
    dialogFilter, //过滤器
    dialogForm //分页,
  },
  data () {
    return {
      doLayout: true,
      isChild: false,
      searchForm: {},
      config: config,
      list: [],
      expandList: [],
      tableForm: {},
      tableHeight: undefined,
      tableIndex: -1,
      tableSelect: [],
      formIndexList: [],
      sumsList: [],
      cascaderDicList: {},
      formCascaderList: {},
      formRules: {},
      formCellRules: {},
      btnDisabled: false,
    };
  },
  created () {
    // 初始化数据
    this.dataInit();
    // 规则初始化
    this.rulesInit();
    //初始化字典
    this.handleLoadDic();
  },
  mounted () {
    this.doLayout = false;
    this.$nextTick(() => {
      //初始化dialogForm对外方法
      this.dialogFormFun();
      this.doLayout = true;
      //如果有搜索激活搜索
      if (this.$refs.headerSearch) this.$refs.headerSearch.init();
      this.$nextTick(() => {
        //动态计算表格高度
        this.getTableHeight();
        //是否开启表格排序
        if (this.isSortable) setTimeout(this.setSort(), 0)
      })
    });
  },
  computed: {
    propOption () {
      let result = [];
      const safe = this;
      function findProp (list) {
        if (!Array.isArray(list)) return
        list.forEach(ele => {
          if (ele.prop) {
            result.push(ele);
          }
          if (ele.children) {
            safe.isChild = true;
            findProp(ele.children);
          }
        });
      }
      findProp(this.columnOption);
      if (this.isChild) {
        result = calcCascader(result);
      } else {
        result = calcCascader(this.columnOption);
      }
      return result;
    },
    isGroup () {
      return !this.validatenull(this.tableOption.group);
    },
    groupOption () {
      return this.parentOption.group;
    },
    isSortable () {
      return this.tableOption.sortable;
    },
    columnFormOption () {
      let list = [];
      if (this.isGroup) {
        this.groupOption.forEach(ele => {
          if (!ele.column) return;
          ele.column.forEach(column => {
            list.push(column);
          });
        });
      } else {
        list = this.propOption;
      }
      return list;
    },
    expandLevel () {
      return this.parentOption.expandLevel || 0;
    },
    expandAll () {
      return this.parentOption.expandAll || false;
    },
    rowKey () {
      return this.tableOption.rowKey || "id";
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
    }
  },
  watch: {
    tableForm: {
      handler () {
        this.$emit("input", this.tableForm);
      },
      deep: true
    },
    value: {
      handler () {
        this.formVal();
      },
      deep: true
    },
    page: {
      handler () {
        this.$refs.tablePage.pageInit();
      },
      deep: true
    },
    propOption () {
      this.$refs.dialogColumn.columnInit();
    },
    list () {
      this.refreshTable();
    },
    data () {
      this.dataInit();
      //初始化级联字典
      this.handleLoadCascaderDic();
    }
  },
  props: {
    permission: {
      type: Object,
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
    sortBy: Function,
    sortOrders: Function,
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
    data: {
      type: Array,
      required: true,
      default: () => {
        return [];
      }
    }
  },
  methods: {
    getTableHeight () {
      const clientHeight = document.documentElement.clientHeight;
      if (this.tableOption.height == "auto") {
        this.$nextTick(() => {
          const tableStyle = this.$refs.table.$el;
          const pageStyle = this.$refs.tablePage.$el;
          this.tableHeight = clientHeight - tableStyle.offsetTop - pageStyle.offsetHeight - 30
        })
      } else {
        this.tableHeight = this.tableOption.height;
      }
    },
    refreshTable () {
      this.doLayout = false;
      this.$nextTick(() => {
        this.doLayout = true;
      })
    },
    //开启排序
    setSort () {
      if (!window.Sortable) {
        packages.logs("Sortable")
        return
      }
      const el = this.$refs.table.$el.querySelectorAll('.el-table__body-wrapper > table > tbody')[0]
      this.sortable = window.Sortable.create(el, {
        ghostClass: 'avue-crud__sortable',
        handle: this.tableOption.dragHandler ? '.avue-crud__drag-handler' : undefined,
        onEnd: evt => {
          const oldindex = evt.oldIndex;
          const newindex = evt.newIndex;
          const targetRow = this.list.splice(oldindex, 1)[0]
          this.list.splice(newindex, 0, targetRow)
          this.$emit('sortable-change', oldindex, newindex, targetRow, this.list)
        }
      })
    },
    //树懒加载
    treeload (tree, treeNode, resolve) {
      this.$emit('tree-load', tree, treeNode, resolve)
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
    showRow (row) {
      const index = row.rowIndex;
      const show = row.row._parent
        ? row.row._parent._expand && row.row._parent._show
        : true;
      row.row._show = show;
      return show
        ? "animation:treeTableShow 1s;-webkit-animation:treeTableShow 1s;"
        : "display:none;";
    },
    //对部分表单字段进行校验的方法
    validateField (val) {
      return this.$refs.dialogForm.$refs.tableForm.validateField(val);
    },
    handleGetRowKeys (row) {
      const rowKey = row[this.rowKey];
      return rowKey;
    },
    rulesInit () {
      this.formRules = {};
      this.propOption.forEach(ele => {
        if (ele.rules) this.formRules[ele.prop] = ele.rules;
        if (ele.rules && ele.cell) this.formCellRules[ele.prop] = ele.rules;
      });
    },
    menuIcon (value) {
      return this.menuType === "icon" ? "" : this.t("crud." + value);
    },
    menuText (value) {
      return this.menuType === "text" ? "text" : value;
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
    indexMethod (index) {
      return (
        index +
        1 +
        ((this.$refs.tablePage.defaultPage.currentPage || 1) - 1) *
        (this.$refs.tablePage.defaultPage.pageSize || 10)
      );
    },
    formVal () {
      Object.keys(this.value).forEach(ele => {
        this.$set(this.tableForm, ele, this.value[ele]);
      });
    },
    dataInit () {
      this.list = this.data;
      //初始化序列的参数
      this.list.forEach((ele, index) => {
        ele.$index = index;
      });
    },
    //展开或则关闭
    expandChange (row, expand) {
      this.expandList = [...expand];
      this.$emit("expand-change", row, expand);
    },
    //设置单选
    currentRowChange (val) {
      this.$emit("current-row-change", val);
    },
    //刷新事件
    refreshChange () {
      this.$emit("refresh-change", {
        page: this.$refs.tablePage.defaultPage,
        searchForm: this.$refs.headerSearch.searchForm
      });
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
    rowCellAdd (obj = {}) {
      const len = this.list.length;
      this.list.push(
        this.deepClone(
          Object.assign(
            this.tableForm,
            {
              $cellEdit: true,
              $index: len
            },
            obj
          )
        )
      );
      this.formIndexList.push(len);
    },
    //行取消
    rowCanel (row, index) {
      if (this.validatenull(row[this.rowKey])) {
        this.list.splice(index, 1);
        return;
      }
      this.formCascaderList[index].$cellEdit = false;
      //设置行数据
      this.$set(this.list, index, this.formCascaderList[index]);
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
    //单元格更新
    rowCellUpdate (row, index) {
      this.btnDisabled = true;
      this.asyncValidator(this.formCellRules, row)
        .then(res => {
          this.$refs.dialogForm.keyBtn = true;
          this.$emit(
            "row-update",
            row,
            index,
            () => {
              row.$cellEdit = false;
              this.$set(this.list, index, row);
            },
            () => {
              this.btnDisabled = false
            }
          );
        })
        .catch(errors => {
          this.$message.warning(errors[0]);
        });
    },
    rowAdd () {
      this.$refs.dialogForm.show("add");
    },
    dialogFormFun () {
      let list = ['updateDic', 'rowSave', 'rowUpdate', 'closeDialog']
      list.forEach(ele => {
        this[ele] = (this.$refs.dialogForm | {})[ele];
      })
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
    //搜索
    searchChange () {
      this.$refs.headerSearch.searchChange();
    },
    //清空
    searchReset () {
      this.$refs.headerSearch.searchReset();
    },
    // 编辑
    rowEdit (row, index) {
      this.tableForm = this.rowClone(row);
      this.$emit("input", this.tableForm);
      this.tableIndex = index;
      this.$refs.dialogForm.show("edit", index);
    },

    //查看
    rowView (row, index) {
      this.tableForm = this.rowClone(row);
      this.$emit("input", this.tableForm);
      this.tableIndex = index;
      this.$refs.dialogForm.show("view");
    },
    // 删除
    rowDel (row, index) {
      this.$emit("row-del", row, index);
    },
    //清空表单
    resetForm () {
      this.$refs.dialogForm.resetForm();
      this.$emit("input", this.tableForm);
    },
    //搜索指定的属性配置
    findColumnIndex (value) {
      return this.findArray(this.propOption, value, "prop");
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
            sums[index] = this.tableOption.sumText || config.sumText;
          } else if (currItem) {
            switch (currItem.type) {
              case "count":
                sums[index] = "计数:" + data.length;
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
                sums[index] = "平均:" + sums[index].toFixed(2);
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
                sums[index] = "合计:" + sums[index].toFixed(2);
                break;
            }
          } else {
            sums[index] = "-";
          }
        });
      }
      this.sumsList = sums;
      return sums;
    }
  }
});
</script>
