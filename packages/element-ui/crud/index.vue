<template>
  <div :class="b()">
    <el-card :class="b('box')">
      <!-- 头部组件 -->
      <header-title ref="headerTitle" v-show="printKey"></header-title>
      <!-- 搜索组件 -->
      <header-search v-model="searchForm" ref="tableSearch" v-show="printKey">
        <template slot="search">
          <slot name="search"></slot>
        </template>
        <template slot="searchMenu">
          <slot name="searchMenu"></slot>
        </template>
      </header-search>
      <!-- 表格功能列 -->
      <header-menu ref="headerMenu" v-show="printKey">
        <template slot="menuLeft">
          <slot name="menuLeft"></slot>
        </template>
        <template slot="menuRight">
          <slot name="menuRight"></slot>
        </template>
      </header-menu>
      <el-tag
        class="avue-tip"
        v-if="vaildData(tableOption.tip,config.tip) && tableOption.selection"
      >
        <i class="el-icon-info avue-tip__icon">&nbsp;</i>
        <span class="avue-tip__name">
          {{config.tipStartTitle}}
          <span class="avue-tip__name--bold">{{selectLen}}</span>
          {{config.tipEndTitle}}
        </span>
        <span
          class="avue-tip__btn"
          @click="selectClear"
          v-if="vaildData(tableOption.selectClearBtn,config.selectClearBtn) && tableOption.selection"
        >{{config.tipBtnTitle}}</span>
      </el-tag>
      <el-table
        :data="list"
        :size="controlSize"
        :highlight-current-row="tableOption.highlightCurrentRow"
        @current-change="currentRowChange"
        :show-summary="tableOption.showSummary"
        :summary-method="tableSummaryMethod"
        :empty-text="tableOption.emptyText"
        :span-method="tableSpanMethod"
        :stripe="tableOption.stripe"
        :show-header="tableOption.showHeader"
        :default-sort="tableOption.defaultSort"
        @row-click="rowClick"
        @row-dblclick="rowDblclick"
        :row-class-name="rowClassName"
        :cell-class-name="cellClassName"
        :header-cell-class-name="headerCellClassName"
        :max-height="tableOption.maxHeight"
        :height="tableOption.height=='auto'?(clientHeight - vaildData(tableOption.calcHeight,config.calcHeight)):tableOption.height"
        ref="table"
        :width="setPx(tableOption.width,config.width)"
        :border="tableOption.border"
        v-loading="tableLoading"
        @selection-change="selectionChange"
        @sort-change="sortChange"
      >
        <!-- 暂无数据提醒 -->
        <template slot="empty">
          <slot name="empty" v-if="$slots.empty"></slot>
          <span @click="refreshChange" v-else style="cursor:pointer">暂无数据，点击刷新</span>
        </template>

        <!-- 折叠面板  -->
        <el-table-column
          type="expand"
          width="60"
          fixed="left"
          align="center"
          v-if="tableOption.expand"
        >
          <template slot-scope="props">
            <slot :row="props.row" name="expand"></slot>
          </template>
        </el-table-column>
        <!-- 选择框 -->
        <el-table-column
          v-if="tableOption.selection"
          type="selection"
          width="50"
          fixed="left"
          align="center"
        ></el-table-column>
        <!-- 序号 -->
        <el-table-column
          v-if="tableOption.index"
          :label="tableOption.indexLabel || config.indexLabel"
          type="index"
          width="50"
          :index="indexMethod"
          fixed="left"
          align="center"
        ></el-table-column>

        <el-table-column
          v-for="(column,index) in columnOption"
          :prop="column.prop"
          :key="index"
          filter-placement="bottom-end"
          :filters="handleFilters(column)"
          :filter-method="column.filter? handleFiltersMethod : undefined"
          :filter-multiple="vaildData(column.filterMultiple,true)"
          :show-overflow-tooltip="column.overHidden"
          :min-width="column.minWidth"
          :sortable="column.sortable"
          :align="column.align || tableOption.align"
          :header-align="column.headerAlign || tableOption.headerAlign"
          :width="column.width"
          :label="column.label"
          :fixed="column.fixed"
        >
          <template slot-scope="scope">
            <template v-if="cellEditFlag(scope.row,column)">
              <component
                :is="getSearchType(column.type)"
                size="mini"
                v-model="scope.row[column.prop]"
                :type="getType(column)"
                :disabled="btnDisabled"
                :props="column.props || tableOption.props"
                :format="column.format"
                :parent="column.parent"
                :defaultExpandAll="column.defaultExpandAll"
                :filterable="column.searchFilterable"
                :filter-method="column.searchFilterMethod"
                :value-format="column.valueFormat"
                :multiple="column.multiple"
                :clearable="vaildData(column.clearable,false)"
                :placeholder="column.searchPlaceholder || column.label"
                :dic="DIC[column.prop]"
              ></component>
            </template>
            <slot
              :row="scope.row"
              :dic="DIC[column.prop]"
              :size="isMediumSize"
              :label="detail(scope.row,column,tableOption,DIC)"
              :name="column.prop"
              v-else-if="column.slot"
            ></slot>
            <template v-else-if="column.type==='upload'">
              <avue-img
                :align="column.align"
                :listType="column.listType"
                :imgWidth="column.imgWidth"
                :fullscreen="column.imgFullscreen"
                :imgHeight="column.imgHeight"
                :imgType="column.imgType"
                :type="menuText()"
                :dataType="column.dataType"
                :size="isMediumSize"
                :value="scope.row[column.prop]"
                v-if="scope.row[column.prop]"
              ></avue-img>
            </template>
            <template v-else>
              <span v-html="detail(scope.row,column,tableOption,DIC)"></span>
            </template>
          </template>
        </el-table-column>
        <el-table-column
          fixed="right"
          v-if="vaildData(tableOption.menu,config.menu) && printKey"
          :label="config.menuTitle"
          :align="tableOption.menuAlign || config.menuAlign"
          :header-align="tableOption.menuheaderAlign || config.menuheaderAlign"
          :width="tableOption.menuWidth || config.menuWidth"
        >
          <template slot-scope="scope">
            <el-dropdown v-if="menuType==='menu'" style="margin-right:9px;">
              <el-button type="primary" :size="isMediumSize">
                {{config.menuBtnTitle}}
                <i class="el-icon-arrow-down el-icon--right"></i>
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item
                  v-if="vaildData(tableOption.viewBtn,true)"
                  @click.native="rowView(scope.row,scope.$index)"
                >{{config.viewBtnTitle}}</el-dropdown-item>
                <el-dropdown-item
                  divided
                  v-if="vaildData(tableOption.editBtn,true)"
                  @click.native="rowEdit(scope.row,scope.$index)"
                >{{config.editBtnTitle}}</el-dropdown-item>
                <el-dropdown-item
                  divided
                  v-if="vaildData(tableOption.delBtn,true)"
                  @click.native="rowDel(scope.row,scope.$index)"
                >{{config.delBtnTitle}}</el-dropdown-item>
                <slot
                  name="menuBtn"
                  :row="scope.row"
                  :dic="scope.dic"
                  :label="scope.label"
                  :index="scope.$index"
                ></slot>
              </el-dropdown-menu>
            </el-dropdown>
            <template v-else-if="['button','text','icon'].includes(menuType)">
              <el-button
                :type="menuText('primary')"
                :icon="scope.row.$cellEdit?config.cellSaveBtnIcon:config.cellEditBtnIcon"
                :size="isMediumSize"
                :disabled="btnDisabled"
                @click.stop="rowCell(scope.row,scope.$index)"
                v-if="vaildData(tableOption.cellBtn ,config.cellBtn)"
              >{{menuIcon(scope.row.$cellEdit?config.cellSaveBtnTitle:config.cellEditBtnTitle)}}</el-button>

              <el-button
                :type="menuText('success')"
                :icon="config.viewBtnIcon"
                :size="isMediumSize"
                :disabled="btnDisabled"
                @click.stop="rowView(scope.row,scope.$index)"
                v-if="vaildData(tableOption.viewBtn,config.viewBtn)"
              >{{menuIcon(config.viewBtnTitle)}}</el-button>
              <el-button
                :type="menuText('primary')"
                :icon="config.editBtnIcon"
                :size="isMediumSize"
                :disabled="btnDisabled"
                @click.stop="rowEdit(scope.row,scope.$index)"
                v-if="vaildData(tableOption.editBtn,config.editBtn)"
              >{{menuIcon(config.editBtnTitle)}}</el-button>
              <el-button
                :type="menuText('danger')"
                :icon="config.delBtnIcon"
                :size="isMediumSize"
                :disabled="btnDisabled"
                @click.stop="rowDel(scope.row,scope.$index)"
                v-if="vaildData(tableOption.delBtn,config.delBtn)"
              >{{menuIcon(config.delBtnTitle)}}</el-button>
            </template>
            <slot
              name="menu"
              :row="scope.row"
              :dic="scope.dic"
              :label="scope.label"
              :type="menuText('primary')"
              :disabled="btnDisabled"
              :size="isMediumSize"
              :index="scope.$index"
            ></slot>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <table-page ref="tablePage" v-show="printKey"></table-page>
    </el-card>
    <!-- 表单 -->
    <dialog-form ref="dialogForm" v-model="tableForm">
      <template slot-scope="scope" v-for="item in columnOption" :slot="item.prop">
        <slot
          :value="scope.value"
          :column="scope.column"
          :dic="scope.dic"
          :size="scope.size"
          :label="scope.label"
          :disabled="scope.disabled"
          :row="tableForm"
          :index="tableIndex"
          :name="item.prop+'Form'"
          v-if="item.formslot"
        ></slot>
      </template>
      <template slot-scope="{tableForm,boxType}" slot="menuForm">
        <slot name="menuForm" :row="tableForm" :type="boxType"></slot>
      </template>
    </dialog-form>
    <!-- 动态列 -->
    <dialog-column ref="dialogColumn"></dialog-column>
  </div>
</template>
<script>
import create from "core/create";
import init from "../../core/crud/init.js";
import tablePage from "./table-page";
import headerSearch from "./header-search";
import headerMenu from "./header-menu";
import headerTitle from "./header-title";
import dialogColumn from "./dialog-column";
import dialogForm from "./dialog-form";
import config from "./config.js";
import { formInitVal, getSearchType, getType } from "core/dataformat";

export default create({
  name: "crud",
  mixins: [init()],
  components: {
    tablePage, //分页
    headerSearch, //搜索
    headerMenu, //菜单头部
    headerTitle, //头部功能
    dialogColumn, //显隐列
    dialogForm //分页,
  },
  data() {
    return {
      clientHeight: document.documentElement.clientHeight,
      defaultForm: {
        tableForm: {}
      },
      searchForm: {},
      config: config,
      list: [],
      tableForm: {},
      tableIndex: -1,
      tableSelect: [],
      formRules: {},
      printKey: true
    };
  },
  created() {
    //初始化全局方法
    this.getType = getType;
    // 初始化数据
    this.dataInit();
    // 规则初始化
    this.rulesInit();
  },
  mounted() {
    this.getSearchType = getSearchType;
    // 初始化列
    this.$refs.dialogColumn.columnInit();
  },
  computed: {
    btnDisabled() {
      return this.$refs.dialogForm.keyBtn && this.tableOption.cellBtn;
    },
    columnOption() {
      return this.tableOption.column || [];
    },
    sumColumnList() {
      return this.tableOption.sumColumnList || [];
    },
    selectLen() {
      return this.tableSelect ? this.tableSelect.length : 0;
    }
  },
  watch: {
    value: {
      handler() {
        this.formVal();
      },
      deep: true
    },
    page: {
      handler() {
        this.$refs.tablePage.pageInit();
      },
      deep: true
    },
    columnOption() {
      this.$refs.dialogColumn.columnInit();
    },
    data() {
      this.dataInit();
    }
  },
  props: {
    value: {
      type: Object,
      default: () => {
        return {};
      }
    },
    spanMethod: Function,
    summaryMethod: Function,
    beforeClose: Function,
    beforeOpen: Function,
    rowClassName: Function,
    cellClassName: Function,
    headerCellClassName: Function,
    uploadBefore: Function,
    uploadAfter: Function,
    page: {
      type: Object,
      default() {
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
    rulesInit() {
      this.formRules = {};
      this.columnOption.forEach(ele => {
        if (ele.rules) this.formRules[ele.prop] = ele.rules;
      });
    },
    cellEditFlag(row, column) {
      return (
        row.$cellEdit &&
        [
          undefined,
          "select",
          "radio",
          "checkbox",
          "cascader",
          "number",
          "switch",
          "input",
          "tree",
          "dates",
          "date",
          "datetime",
          "week",
          "month",
          "year"
        ].includes(column.type) &&
        column.solt !== true &&
        column.cell
      );
    },
    menuIcon(value) {
      return this.menuType === "icon" ? "" : value;
    },
    menuText(value) {
      return this.menuType === "text" ? "text" : value;
    },
    selectClear() {
      this.$refs.table.clearSelection();
    },
    indexMethod(index) {
      return (
        index +
        1 +
        ((this.$refs.tablePage.defaultPage.currentPage || 1) - 1) *
          (this.$refs.tablePage.defaultPage.pageSize || 10)
      );
    },
    formVal() {
      Object.keys(this.value).forEach(ele => {
        this.tableForm[ele] = this.value[ele];
      });
      this.$emit("input", this.tableForm);
    },
    dataInit() {
      this.list = [...this.data];
      //初始化序号
      this.list.forEach((ele, index) => {
        ele.$index = index;
      });
    },
    dataformat() {
      this.defaultForm = formInitVal(this.columnOption);
      this.tableForm = this.deepClone(this.defaultForm.tableForm);
      this.formVal();
    },
    //设置单选
    currentRowChange(currentRow, oldCurrentRow) {
      this.$emit("current-row-change", currentRow, oldCurrentRow);
    },
    //刷新事件
    refreshChange() {
      this.$emit("refresh-change", {
        page: this.defaultPage,
        searchForm: this.searchForm
      });
    },
    //表格筛选逻辑
    handleFiltersMethod(value, row, column) {
      const columnNew = this.columnOption.filter(
        ele => ele.prop === column.property
      )[0];
      if (typeof columnNew.filtersMethod === "function") {
        return columnNew.filtersMethod(value, row, columnNew);
      } else {
        return row[columnNew.prop] === value;
      }
    },
    //表格筛选字典
    handleFilters(column) {
      if (column.filter !== true) return undefined;
      if (this.validatenull(column.dicFilters)) {
        let list = [];
        (this.DIC[column.prop] || []).forEach(ele => {
          const props = column.props || this.tableOption.props || {};
          list.push({
            text: ele[props.label || "label"],
            value: ele[props.value || "value"]
          });
        });
        return list;
      }
      return column.dicFilters;
    },
    //设置多选选中
    setCurrentRow(row) {
      this.$refs.table.setCurrentRow(row);
    },
    // 选中实例
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.table.toggleRowSelection(row);
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
    //行编辑点击
    rowCell(row, index) {
      if (row.$cellEdit) this.rowCellUpdate(row, index);
      else this.rowCellEdit(row, index);
    },
    // 单元格编辑
    rowCellEdit(row, index) {
      row.$cellEdit = !row.$cellEdit;
      this.$set(this.list, index, row);
    },
    //单元格更新
    rowCellUpdate(row, index) {
      this.asyncValidator(this.formRules, row)
        .then(res => {
          this.$refs.dialogForm.keyBtn = true;
          this.$emit(
            "row-update",
            row,
            index,
            () => {
              row.$cellEdit = !row.$cellEdit;
              this.$set(this.list, index, row);
            },
            () => {
              this.$refs.dialogForm.keyBtn = false;
            }
          );
        })
        .catch(errors => {
          this.$message.warning(errors[0]);
        });
    },
    rowAdd(row) {
      this.$refs.headerTitle.rowAdd(row);
    },
    // 编辑
    rowEdit(row, index) {
      this.tableForm = this.deepClone(row);
      this.$emit("input", this.tableForm);
      this.tableIndex = index;
      this.$refs.dialogForm.show("edit");
    },

    //查看
    rowView(row, index) {
      this.tableForm = this.deepClone(row);
      this.$emit("input", this.tableForm);
      this.tableIndex = index;
      this.$refs.dialogForm.show("view");
    },
    // 删除
    rowDel(row, index) {
      this.$emit("row-del", row, index);
    },
    //清空表单
    resetForm() {
      this.$refs.dialogForm.resetForm();
      this.$emit("input", this.tableForm);
    },
    //合并行
    tableSpanMethod(param) {
      if (typeof this.spanMethod === "function") return this.spanMethod(param);
    },
    //合集统计逻辑
    tableSummaryMethod(param) {
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
                    return (perv + curr) / nowindex++;
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
      return sums;
    }
  }
});
</script>
