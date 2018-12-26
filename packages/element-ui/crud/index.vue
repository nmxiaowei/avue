<template>
  <div :class="b()">
    <el-card :class="b('box')">
      <!-- 头部组件 -->
      <header-title ref="headerTitle"
                    v-show="printKey && vaildData(tableOption.header,true)"></header-title>
      <!-- 搜索组件 -->
      <header-search v-model="searchForm"
                     ref="headerSearch"
                     v-show="printKey">
        <template slot="search">
          <slot name="search"></slot>
        </template>
        <template slot="searchMenu">
          <slot name="searchMenu"></slot>
        </template>
      </header-search>
      <!-- 表格功能列 -->
      <header-menu ref="headerMenu"
                   v-show="printKey">
        <template slot="menuLeft">
          <slot name="menuLeft"></slot>
        </template>
        <template slot="menuRight">
          <div class="avue-tip"
               v-if="vaildData(tableOption.tip,config.tip) && tableOption.selection">
            <span class="avue-tip__name">
              {{config.tipStartTitle}}
              <span class="avue-tip__name--bold">{{selectLen}}</span>
              {{config.tipEndTitle}}
            </span>
            <small class="avue-tip__btn"
                   @click="selectClear"
                   v-if="vaildData(tableOption.selectClearBtn,config.selectClearBtn) && tableOption.selection">{{config.tipBtnTitle}}</small>
          </div>
          <slot name="menuRight"></slot>
        </template>
      </header-menu>
      <el-table :data="list"
                :size="controlSize"
                :highlight-current-row="tableOption.highlightCurrentRow"
                @current-change="currentRowChange"
                @expand-change="expandChange"
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
                :height="tableHeight"
                ref="table"
                :width="setPx(tableOption.width,config.width)"
                :border="tableOption.border"
                v-loading="tableLoading"
                @selection-change="selectionChange"
                @sort-change="sortChange">
        <!-- 暂无数据提醒 -->
        <template slot="empty">
          <slot name="empty"
                v-if="$slots.empty"></slot>
          <span @click="refreshChange"
                v-else
                style="cursor:pointer">暂无数据，点击刷新</span>
        </template>

        <!-- 折叠面板  -->
        <el-table-column type="expand"
                         width="60"
                         :fixed="fixedFlag"
                         align="center"
                         v-if="tableOption.expand">
          <template slot-scope="props">
            <slot :row="props.row"
                  name="expand"></slot>
          </template>
        </el-table-column>
        <!-- 选择框 -->
        <el-table-column v-if="tableOption.selection"
                         type="selection"
                         width="50"
                         :fixed="fixedFlag"
                         align="center"></el-table-column>
        <!-- 序号 -->
        <el-table-column v-if="tableOption.index"
                         :label="tableOption.indexLabel || config.indexLabel"
                         type="index"
                         width="50"
                         :index="indexMethod"
                         fixed="left"
                         align="center"></el-table-column>

        <el-table-column v-for="(column,index) in columnOption"
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
                         :fixed="isMobile?false:column.fixed"
                         v-if="(($refs.dialogColumn || []).columnIndex || []).includes(column.prop)">
          <template slot-scope="scope">
            <template v-if="cellEditFlag(scope.row,column)">
              <component :is="getSearchType(column.type)"
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
                         @change="column.cascader?handleChange(index,scope.row):''"
                         :dic="(cascaderDIC[scope.row.$index] || {})[column.prop] || DIC[column.prop]"></component>
            </template>
            <slot :row="scope.row"
                  :dic="DIC[column.prop]"
                  :size="isMediumSize"
                  :label="scope.row['$'+column.prop]"
                  :name="column.prop"
                  v-else-if="column.slot"></slot>
            <template v-else-if="column.type==='upload'">
              <avue-img :align="column.align"
                        :listType="column.listType"
                        :imgWidth="column.imgWidth"
                        :fullscreen="column.imgFullscreen"
                        :imgHeight="column.imgHeight"
                        :imgType="column.imgType"
                        :type="menuText()"
                        :dataType="column.dataType"
                        :size="isMediumSize"
                        :value="scope.row[column.prop]"
                        v-if="scope.row[column.prop]"></avue-img>
            </template>
            <template v-else>
              <span v-if="column.parentProp">{{handleDetail(scope.row,column,(cascaderDIC[scope.row.$index] || {})[column.prop])}}</span>
              <span v-else
                    v-html="handleDetail(scope.row,column,DIC[column.prop])"></span>
            </template>
          </template>
        </el-table-column>
        <el-table-column fixed="right"
                         v-if="vaildData(tableOption.menu,config.menu) && printKey"
                         :label="config.menuTitle"
                         :align="tableOption.menuAlign || config.menuAlign"
                         :header-align="tableOption.menuheaderAlign || config.menuheaderAlign"
                         :width="isMobile?80:( tableOption.menuWidth || config.menuWidth)">
          <template slot-scope="scope">
            <el-dropdown v-if="menuType==='menu'"
                         style="margin-right:9px;">
              <el-button type="primary"
                         :size="isMediumSize">
                {{config.menuBtnTitle}}
                <i class="el-icon-arrow-down el-icon--right"></i>
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item v-if="vaildData(tableOption.viewBtn,true)"
                                  @click.native="rowView(scope.row,scope.$index)">{{config.viewBtnTitle}}</el-dropdown-item>
                <el-dropdown-item divided
                                  v-if="vaildData(tableOption.editBtn,true)"
                                  @click.native="rowEdit(scope.row,scope.$index)">{{config.editBtnTitle}}</el-dropdown-item>
                <el-dropdown-item divided
                                  v-if="vaildData(tableOption.delBtn,true)"
                                  @click.native="rowDel(scope.row,scope.$index)">{{config.delBtnTitle}}</el-dropdown-item>
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
                         v-if="vaildData(tableOption.cellBtn ,config.cellBtn)">{{menuIcon(scope.row.$cellEdit?config.saveBtnTitle:config.editBtnTitle)}}</el-button>
              <el-button :type="menuText('danger')"
                         :icon="config.canelBtnIcon"
                         :size="isMediumSize"
                         :disabled="btnDisabled"
                         @click.stop="rowCanel(scope.row,scope.$index)"
                         v-if="scope.row.$cellEdit">{{menuIcon(config.canelBtnTitle)}}</el-button>
              <el-button :type="menuText('success')"
                         :icon="config.viewBtnIcon"
                         :size="isMediumSize"
                         :disabled="btnDisabled"
                         @click.stop="rowView(scope.row,scope.$index)"
                         v-if="vaildData(tableOption.viewBtn,config.viewBtn)">{{menuIcon(config.viewBtnTitle)}}</el-button>
              <el-button :type="menuText('primary')"
                         :icon="config.editBtnIcon"
                         :size="isMediumSize"
                         :disabled="btnDisabled"
                         @click.stop="rowEdit(scope.row,scope.$index)"
                         v-if="vaildData(tableOption.editBtn,config.editBtn)">{{menuIcon(config.editBtnTitle)}}</el-button>
              <el-button :type="menuText('danger')"
                         :icon="config.delBtnIcon"
                         :size="isMediumSize"
                         :disabled="btnDisabled"
                         @click.stop="rowDel(scope.row,scope.$index)"
                         v-if="vaildData(tableOption.delBtn,config.delBtn) && !scope.row.$cellEdit">{{menuIcon(config.delBtnTitle)}}</el-button>
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
                  v-show="printKey"></table-page>
    </el-card>
    <!-- 表单 -->
    <dialog-form ref="dialogForm"
                 v-model="tableForm">
      <template slot-scope="{value,column,dic,size,label,disabled}"
                v-for="item in columnOption"
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
import init from "../../core/crud/init.js";
import tablePage from "./table-page";
import headerSearch from "./header-search";
import headerMenu from "./header-menu";
import headerTitle from "./header-title";
import dialogColumn from "./dialog-column";
import dialogFilter from "./dialog-filter";
import dialogForm from "./dialog-form";
import config from "./config.js";
import { sendDic } from "core/dic";
import { getSearchType, getType, calcCascader } from "core/dataformat";

export default create({
  name: "crud",
  mixins: [init()],
  components: {
    tablePage, //分页
    headerSearch, //搜索
    headerMenu, //菜单头部
    headerTitle, //头部功能
    dialogColumn, //显隐列
    dialogFilter, //过滤器
    dialogForm //分页,
  },
  data() {
    return {
      searchForm: {},
      config: config,
      list: [],
      expandList: [],
      tableForm: {},
      tableIndex: -1,
      tableSelect: [],
      formIndexList: [],
      sumsList: [],
      cascaderDicList: {},
      formCascaderList: {},
      formRules: {},
      formCellRules: {},
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
    //初始化字典
    this.handleLoadDic();
  },
  mounted() {
    this.getSearchType = getSearchType;
  },
  computed: {
    fixedFlag() {
      return this.isMobile ? false : "left";
    },
    idKey() {
      return this.tableOption.idKey || "id";
    },
    tableHeight() {
      const clientHeight = document.documentElement.clientHeight;
      const height =
        this.tableOption.height == "auto"
          ? clientHeight -
            this.vaildData(this.tableOption.calcHeight, config.calcHeight)
          : this.tableOption.height;
      return height <= 300 ? 300 : height;
    },
    btnDisabled() {
      return this.$refs.dialogForm.keyBtn && this.tableOption.cellBtn;
    },
    columnOption() {
      const list = calcCascader(this.tableOption.column || []);
      return list;
    },
    sumColumnList() {
      return this.tableOption.sumColumnList || [];
    },
    selectLen() {
      return this.tableSelect ? this.tableSelect.length : 0;
    }
  },
  watch: {
    tableForm: {
      handler() {
        this.$emit("input", this.tableForm);
      },
      deep: true
    },
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
      //初始化级联字典
      this.handleLoadCascaderDic();
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
    handleChange(index, row) {
      const columnOption = [...this.columnOption];
      //本节点;
      const column = columnOption[index];
      const list = column.cascader;
      const value = row[column.prop];
      const rowIndex = row.$index;
      // 下一个节点
      const columnNext = columnOption[index + 1];
      const columnNextProp = columnNext.prop;

      //最后一级
      if (
        this.validatenull(list) ||
        this.validatenull(value) ||
        this.validatenull(columnNext) ||
        this.validatenull(row[column.prop])
      ) {
        return;
      }
      // 如果本节点没有字典则创建节点数组
      if (this.validatenull(this.cascaderDIC[rowIndex])) {
        this.$set(this.cascaderDIC, rowIndex, {});
      }
      // 如果存在队列中则清空字典和值
      if (this.formIndexList.includes(rowIndex)) {
        //清空子类字典
        list.forEach(ele => {
          this.$set(this.cascaderDIC[rowIndex], ele.prop, []);
          list.forEach(ele => (row[ele] = ""));
        });
      }

      sendDic(columnNext.dicUrl.replace("{{key}}", value)).then(res => {
        // 修改字典
        const dic = Array.isArray(res) ? res : [];
        this.$set(this.cascaderDIC[rowIndex], columnNextProp, dic);
        /**
         * 1.是change多级默认联动
         * 2.字典不为空
         * 3.非首次加载
         */
        if (
          column.cascaderChange &&
          !this.validatenull(dic) &&
          this.formIndexList.includes(rowIndex)
        ) {
          //取字典的指定项或则第一项
          const dicvalue = dic[columnNext.defaultIndex || 0];
          row[columnNext.prop] =
            dicvalue[(columnNext.props || {}).value || "value"];
        }
      });
    },
    handleDetail(row, column, DIC) {
      if (!this.validatenull(DIC)) {
        const result = this.detail(row, column, this.tableOption, DIC);
        row["$" + column.prop] = result;
        return result;
      }
      return row[column.prop];
    },
    rulesInit() {
      this.formRules = {};
      this.columnOption.forEach(ele => {
        if (ele.rules) this.formRules[ele.prop] = ele.rules;
        if (ele.rules && ele.cell) this.formCellRules[ele.prop] = ele.rules;
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
    },
    dataInit() {
      this.list = [...this.data];
      //初始化序列的参数
      this.list.forEach((ele, index) => {
        ele.$index = index;
      });
    },
    //展开或则关闭
    expandChange(row, expand) {
      this.expandList = [...expand];
      this.$emit("expand-change", row, expand);
    },
    //设置单选
    currentRowChange(val) {
      this.$emit("current-row-change", val);
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
      if (row.$cellEdit) {
        this.rowCellUpdate(row, index);
      } else {
        this.rowCellEdit(row, index);
      }
    },
    //单元格新增
    rowCellAdd(obj = {}) {
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
    rowCanel(row, index) {
      if (this.validatenull(row[this.idKey])) {
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
    rowCellEdit(row, index) {
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
    rowCellUpdate(row, index) {
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
              this.$refs.dialogForm.keyBtn = false;
            }
          );
        })
        .catch(errors => {
          this.$message.warning(errors[0]);
        });
    },
    rowAdd() {
      this.$refs.dialogForm.show("add");
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
    //搜索指定的属性配置
    findColumnIndex(value) {
      return this.findArray(this.columnOption, value, "prop");
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
      this.sumsList = sums;
      return sums;
    }
  }
});
</script>
