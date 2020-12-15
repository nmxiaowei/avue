<template>
  <div :class="b()">
    <!-- 搜索组件 -->
    <header-search :search="search"
                   ref="headerSearch">
      <template slot="search"
                slot-scope="{size,row}">
        <slot name="search"
              :row="row"
              :size="size"></slot>
      </template>
      <template slot="searchMenu"
                slot-scope="{size,row}">
        <slot name="searchMenu"
              :row="row"
              :size="size"></slot>
      </template>
      <template slot-scope="{value,column,dic,size,label,disabled}"
                v-for="item in columnFormOption"
                :slot="item.prop">
        <slot :value="value"
              :column="column"
              :dic="dic"
              :size="size"
              :label="label"
              :disabled="disabled"
              :row="search"
              :name="item.prop+'Search'"
              v-if="item.searchslot"></slot>
      </template>
    </header-search>
    <!-- 表格功能列 -->
    <header-menu ref="headerMenu"
                 v-if="vaildData(tableOption.header,true)">
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
                 v-permission="getPermission('selectClearBtn')"
                 v-if="vaildData(tableOption.selectClearBtn,config.selectClearBtn) && tableOption.selection">{{t('crud.emptyBtn')}}</el-button>
      <slot name="tip"></slot>
    </el-tag>
    <slot name="header"></slot>
    <el-table v-if="reload"
              :data="list"
              :row-key="handleGetRowKeys"
              :class="{'avue-crud--indeterminate':vaildData(tableOption.indeterminate,false)}"
              :size="$AVUE.tableSize || controlSize"
              :lazy="vaildData(tableOption.lazy,false)"
              :load="treeLoad"
              :tree-props="tableOption.treeProps || {}"
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
      <el-table-column width="1px"></el-table-column>
      <column :columnOption="columnOption">
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
      <el-table-column :class="b('btn')"
                       :fixed="vaildData(tableOption.menuFixed,config.menuFixed)"
                       v-if="vaildData(tableOption.menu,config.menu)&&getPermission('menu')"
                       :label="tableOption.menuTitle || t('crud.menu')"
                       :align="tableOption.menuAlign || config.menuAlign"
                       :header-align="tableOption.menuHeaderAlign || config.menuHeaderAlign"
                       :width="isMobile?(tableOption.menuXsWidth || config.menuXsWidth):( tableOption.menuWidth || config.menuWidth)">
        <template slot-scope="scope">
          <el-dropdown v-if="isMenu"
                       :size="isMediumSize"
                       style="margin-right:9px;">
            <el-button type="primary"
                       :size="isMediumSize">
              {{ tableOption.menuBtnTitle || t('crud.menuBtn')}}
              <i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item v-if="vaildData(tableOption.viewBtn,config.viewBtn)"
                                v-permission="getPermission('viewBtn',scope.row,scope.$index)"
                                @click.native="rowView(scope.row,scope.$index)">{{t('crud.viewBtn')}}</el-dropdown-item>
              <el-dropdown-item divided
                                v-if="vaildData(tableOption.editBtn,config.editBtn)"
                                v-permission="getPermission('editBtn',scope.row,scope.$index)"
                                @click.native="rowEdit(scope.row,scope.$index)">{{t('crud.editBtn')}}</el-dropdown-item>
              <el-dropdown-item divided
                                v-if="vaildData(tableOption.copyBtn,config.copyBtn)"
                                v-permission="getPermission('copyBtn',scope.row,scope.$index)"
                                @click.native="rowCopy(scope.row)">{{t('crud.copyBtn')}}</el-dropdown-item>
              <el-dropdown-item divided
                                v-if="vaildData(tableOption.delBtn,config.delBtn)"
                                v-permission="getPermission('delBtn',scope.row,scope.$index)"
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
                       :disabled="btnDisabledList[scope.$index]"
                       @click.stop="rowCell(scope.row,scope.$index)"
                       v-permission="getPermission('cellBtn',scope.row,scope.$index)"
                       v-if="vaildData(tableOption.cellBtn ,config.cellBtn)">
              <template v-if="!isIconMenu">
                {{menuIcon(scope.row.$cellEdit?'saveBtn':'editBtn')}}
              </template>
            </el-button>
            <el-button :type="menuText('danger')"
                       :icon="config.cancelBtnIcon"
                       :size="isMediumSize"
                       :disabled="btnDisabledList[scope.$index]"
                       @click.stop="rowCancel(scope.row,scope.$index)"
                       v-if="scope.row.$cellEdit && vaildData(tableOption.cancelBtn,config.cancelBtn)">
              <template v-if="!isIconMenu">
                {{menuIcon('cancelBtn')}}
              </template>
            </el-button>
            <el-button :type="menuText('success')"
                       :icon="config.viewBtnIcon"
                       :size="isMediumSize"
                       :disabled="btnDisabled"
                       @click.stop="rowView(scope.row,scope.$index)"
                       v-permission="getPermission('viewBtn',scope.row,scope.$index)"
                       v-if="vaildData(tableOption.viewBtn,config.viewBtn)">
              <template v-if="!isIconMenu">
                {{menuIcon('viewBtn')}}
              </template>
            </el-button>
            <el-button :type="menuText('primary')"
                       :icon="config.editBtnIcon"
                       :size="isMediumSize"
                       :disabled="btnDisabled"
                       @click.stop="rowEdit(scope.row,scope.$index)"
                       v-permission="getPermission('editBtn',scope.row,scope.$index)"
                       v-if="vaildData(tableOption.editBtn,config.editBtn)">
              <template v-if="!isIconMenu">
                {{menuIcon('editBtn')}}
              </template>
            </el-button>
            <el-button :type="menuText('primary')"
                       :icon="config.copyBtnIcon"
                       :size="isMediumSize"
                       :disabled="btnDisabled"
                       @click.stop="rowCopy(scope.row)"
                       v-permission="getPermission('copyBtn',scope.row,scope.$index)"
                       v-if="vaildData(tableOption.copyBtn,config.copyBtn)">
              <template v-if="!isIconMenu">
                {{menuIcon('copyBtn')}}
              </template>
            </el-button>
            <el-button :type="menuText('danger')"
                       :icon="config.delBtnIcon"
                       :size="isMediumSize"
                       :disabled="btnDisabled"
                       @click.stop="rowDel(scope.row,scope.$index)"
                       v-permission="getPermission('delBtn',scope.row,scope.$index)"
                       v-if="vaildData(tableOption.delBtn,config.delBtn) && !scope.row.$cellEdit">
              <template v-if="!isIconMenu">
                {{menuIcon('delBtn')}}
              </template>
            </el-button>
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
    <table-page ref="tablePage"
                v-if="vaildData(tableOption.page,true)"
                :page="page"></table-page>
    <!-- 表单 -->
    <dialog-form ref="dialogForm"
                 v-model="tableForm">
      <template slot-scope="scope"
                v-for="item in columnFormOption"
                :slot="item.prop">
        <slot v-bind="Object.assign(scope,{
              row:item.dynamic?scope.row:tableForm,
              index:item.dynamic?scope.row.$index:tableIndex
              })"
              v-if="item.formslot"
              :name="item.prop+'Form'"></slot>
      </template>
      <template slot-scope="scope"
                v-for="item in columnFormOption"
                :slot="item.prop+'Label'">
        <slot v-bind="Object.assign(scope,{
              row:tableForm,
              index:tableIndex
              })"
              :name="item.prop+'Label'"
              v-if="item.labelslot"></slot>
      </template>
      <template slot-scope="scope"
                v-for="item in columnFormOption"
                :slot="item.prop+'Error'">
        <slot v-bind="Object.assign(scope,{
              row:tableForm,
              index:tableIndex
              })"
              :name="item.prop+'Error'"
              v-if="item.errorslot"></slot>
      </template>
      <template slot-scope="scope"
                v-for="item in columnFormOption"
                :slot="item.prop+'Type'">
        <slot v-bind="Object.assign(scope,{
              row:tableForm,
              index:tableIndex
              })"
              :name="item.prop+'Type'"
              v-if="item.typeslot"></slot>
      </template>
      <template slot-scope="{tableForm,type,size,disabled}"
                slot="menuForm">
        <slot name="menuForm"
              :size="size"
              :disabled="disabled"
              :type="type"></slot>
      </template>
    </dialog-form>
    <!-- 动态列 -->
    <dialog-column ref="dialogColumn"
                   :show-column="showColumn"></dialog-column>
    <!-- 过滤器 -->
    <keep-alive>
      <dialog-filter ref="dialogFilter"></dialog-filter>
    </keep-alive>
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
import config from "./config.js";
import treeToArray, { addAttrs } from "./eval";
import { calcCascader, formInitVal } from "core/dataformat";
export default create({
  name: "crud",
  mixins: [init(), locale],
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
    tablePage, //分页
    headerSearch, //搜索
    headerMenu, //菜单头部
    dialogColumn, //显隐列
    dialogFilter, //过滤器
    dialogForm //分页,
  },
  data () {
    return {
      reload: true,
      isChild: false,
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
      btnDisabledList: {},
      btnDisabled: false,
    };
  },
  created () {
    // 初始化数据
    this.dataInit();
  },
  mounted () {
    this.refreshTable(() => {
      //如果有搜索激活搜索
      this.$refs.headerSearch.init();
      //动态计算表格高度
      this.getTableHeight();
      //是否开启表格排序
      this.setSort()
    })
  },
  computed: {
    isIconMenu () {
      return this.menuType === "icon"
    },
    isTextMenu () {
      return this.menuType === "text"
    },
    isMenu () {
      return this.menuType === "menu"
    },
    calcHeight () {
      return (this.tableOption.calcHeight || 0) + this.$AVUE.calcHeight
    },
    propOption () {
      let result = [];
      const safe = this;
      function findProp (list) {
        if (!Array.isArray(list)) return
        list.forEach(ele => {
          if (ele.prop || !ele.children) {
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
    isTree () {
      let flag = false;
      this.data.forEach(ele => {
        if (ele.children) {
          flag = true;
        }
      })
      return this.vaildData(this.tableOption.tree, flag);
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
    dynamicOption () {
      let list = [];
      this.propOption.forEach(ele => {
        if (ele.type === 'dynamic') {
          list = list.concat(ele.children.column.map(item => {
            return Object.assign(item, {
              dynamic: true
            })
          }));
        }
      })
      return list;
    },
    columnFormOption () {
      let list = [];
      this.propOption.forEach(column => {
        list.push(column);
      });
      if (this.isGroup) {
        this.groupOption.forEach(ele => {
          if (!ele.column) return;
          ele.column.forEach(column => {
            list.push(column);
          });
        });
      }
      return list.concat(this.dynamicOption);
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
    }
  },
  watch: {
    tableOption: {
      handler () {
        this.$refs.dialogColumn.columnInit()
      },
      deep: true
    },
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
    data: {
      handler () {
        this.dataInit();
        this.handleLoadCascaderDic()
      },
      deep: true
    },
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
    showColumn: {
      type: Array,
      default () {
        return [];
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
      if (this.tableOption.height == "auto") {
        this.$nextTick(() => {
          const tableStyle = this.$refs.table.$el;
          const pageStyle = this.$refs.tablePage ? this.$refs.tablePage.$el.offsetHeight : 0;
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
        callback && callback()
      })
    },
    //开启排序
    setSort () {
      const callback = () => {
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
      }
      if (this.isSortable) {
        this.$nextTick(() => {
          callback()
        })
      }
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
    menuIcon (value) {
      return this.vaildData(this.tableOption[value + 'Text'], this.t("crud." + value))
    },
    menuText (value) {
      return this.isTextMenu ? "text" : value;
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
        ((this.page.currentPage || 1) - 1) *
        (this.page.pageSize || 10)
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
        if (ele.$cellEdit && !this.formCascaderList[index]) {
          this.formCascaderList[index] = this.deepClone(ele);
        }
        ele.$index = index;
      });
    },
    //拖动表头事件
    headerDragend (newWidth, oldWidth, column, event) {
      this.$emit("header-dragend", newWidth, oldWidth, column, event);
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
      this.setSort();
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
    //单元格更新
    rowCellUpdate (row, index) {
      this.asyncValidator(this.formRules, row)
        .then(res => {
          this.btnDisabledList[index] = true;
          this.btnDisabled = true;
          this.$emit(
            "row-update",
            row,
            index,
            () => {
              this.btnDisabledList[index] = false;
              this.btnDisabled = false;
              row.$cellEdit = false;
              this.$set(this.list, index, row);
              delete this.formCascaderList[index]
            },
            () => {
              this.btnDisabledList[index] = false;
              this.btnDisabled = false;
            }
          );
        })
        .catch(errors => {
          this.$message.error(`第${index + 1}行:${errors[0].message}`);
        });
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
    //搜索
    searchChange () {
      this.$refs.headerSearch.searchChange();
    },
    getPropRef (prop) {
      return this.$refs.dialogForm.$refs.tableForm.getPropRef(prop);
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
    //复制
    rowCopy (row) {
      this.tableForm = this.rowClone(row);
      delete this.tableForm[this.rowKey]
      this.$emit("input", this.tableForm);
      this.tableIndex = -1;
      this.$refs.dialogForm.show("add");
    },
    //查看
    rowView (row, index) {
      this.tableForm = this.rowClone(row);
      this.$emit("input", this.tableForm);
      this.tableIndex = index;
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
    //清空表单
    resetForm () {
      this.$refs.dialogForm.resetForm();
      this.$emit("input", this.tableForm);
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
            let label = currItem.label;
            switch (currItem.type) {
              case "count":
                sums[index] = (label || this.t('crud.summary.count')) + data.length;
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
                sums[index] = (label || this.t('crud.summary.avg')) + sums[index].toFixed(decimals);
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
                sums[index] = (label || this.t('crud.summary.sum')) + sums[index].toFixed(decimals);
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
