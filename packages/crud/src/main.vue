<template>
  <div :class="b()">
    <el-card :class="b('box')">
      <div
        slot="header"
        :class="b('title')"
        v-if="vaildData(tableOption.title,false) || vaildData(tableOption.dateBtn,config.dateBtn)"
      >
        <span>{{tableOption.title}}</span>
        <date-group
          @change="dateChange"
          v-if="vaildData(tableOption.dateBtn,config.dateBtn)"
          :default="vaildData(tableOption.dateDefault,config.dateDefault)"
          :size="isMediumSize"
        ></date-group>
      </div>
      <div :class="b('header')" v-if="vaildData(tableOption.header,true)">
        <el-collapse-transition>
          <el-form
            :model="searchForm"
            :inline="true"
            ref="searchForm"
            v-if="searchShow && searchFlag"
          >
            <!-- 循环列搜索框 -->
            <el-form-item
              :prop="column.prop"
              :label="column.label"
              v-for="(column,index) in columnOption"
              :key="index"
              v-if="column.search"
            >
              <component
                :is="getSearchType(column.type)"
                :size="isMediumSize"
                v-model="searchForm[column.prop]"
                :type="getType(column)"
                :props="column.props || tableOption.props"
                :format="column.format"
                :parent="column.parent"
                :defaultExpandAll="column.defaultExpandAll"
                :filterable="column.searchFilterable"
                :filter-method="column.searchFilterMethod"
                :value-format="column.valueFormat"
                :multiple="config.searchMultiple.includes(column.type) && vaildData(column.searchMmultiple,false)"
                :clearable="column.searchClearable"
                :placeholder="column.searchPlaceholder || column.label"
                :dic="setDic(column.dicData,DIC[column.dicData])"
              ></component>
            </el-form-item>
            <slot name="search"></slot>
            <el-form-item>
              <el-button
                type="primary"
                @click="searchChange"
                :icon="config.searchBtnIcon"
                :size="isMediumSize"
              >{{config.searchBtnTitle}}</el-button>
              <el-button
                @click="searchReset"
                :icon="config.emptyBtnIcon"
                :size="isMediumSize"
              >{{config.emptyBtnTitle}}</el-button>
              <slot name="searchMenu"></slot>
            </el-form-item>
          </el-form>
        </el-collapse-transition>
      </div>
      <!-- 表格功能列 -->
      <div :class="b('menu')" v-if="vaildData(tableOption.header,true)">
        <div :class="b('left')">
          <el-button
            type="primary"
            @click="rowAdd"
            :icon="config.addBtnIcon"
            :size="isMediumSize"
            v-if="vaildData(tableOption.addBtn,config.addBtn)"
          >{{config.addBtnTitle}}</el-button>
          <slot name="menuLeft"></slot>
        </div>
        <div :class="b('right')">
          <slot name="menuRight"></slot>
          <el-button
            :icon="config.refreshBtnIcon"
            circle
            :size="isMediumSize"
            @click="refreshChange"
            v-if="vaildData(tableOption.refreshBtn,config.refreshBtn)"
          ></el-button>
          <el-button
            :icon="config.columnBtnIcon"
            circle
            :size="isMediumSize"
            @click="columnBox=true"
            v-if="vaildData(tableOption.columnBtn,config.columnBtn)"
          ></el-button>
          <el-button
            :icon="config.searchboxBtnIcon"
            circle
            :size="isMediumSize"
            @click="searchShow=!searchShow"
            v-if="searchFlag && vaildData(tableOption.searchBtn,config.searchBtn)"
          ></el-button>
        </div>
      </div>
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
          width="50"
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
          :label="vaildData(tableOption.indexLabel,config.indexLabel)"
          type="index"
          width="50"
          :index="indexMethod"
          fixed="left"
          align="center"
        ></el-table-column>
        <!-- 循环列 -->
        <el-table-column
          v-if="columnIndex.indexOf(column.prop)!=-1"
          v-for="(column,index) in columnOption"
          :prop="column.prop"
          :key="index"
          filter-placement="bottom-end"
          :filters="column.filters"
          :filter-method="column.filterMethod"
          :filter-multiple="vaildData(column.filterMultiple,config.filterMultiple)"
          :show-overflow-tooltip="column.overHidden"
          :min-width="column.minWidth"
          :sortable="column.sortable"
          :align="vaildData(column.align,tableOption.align)"
          :header-align="vaildData(column.headerAlign,tableOption.headerAlign)"
          :width="column.width"
          :label="column.label"
          :fixed="column.fixed"
        >
          <crud-components
            v-if="column.children"
            :columnOption="column.children"
            :tableOption="tableOption"
            :tableForm="tableForm"
            :columnIndex="columnIndex"
            :DIC="DIC"
          >
            <template slot-scope="scope" v-for="item in column.children" :slot="item.prop">
              <slot
                :row="scope.row"
                :dic="scope.dic"
                :type="getType(column)"
                :size="isMediumSize"
                :label="scope.label"
                :name="item.prop"
                v-if="item.solt"
              ></slot>
            </template>
          </crud-components>
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
                :value-format="column.valueFormat"
                :multiple="column.multiple"
                :clearable="vaildData(column.clearable,false)"
                :placeholder="column.label"
                :dic="setDic(column.dicData,DIC[column.dicData])"
              ></component>
            </template>
            <slot
              :row="scope.row"
              :dic="setDic(column.dicData,DIC[column.dicData])"
              :label="detail(scope.row,column)"
              :name="column.prop"
              v-else-if="column.solt"
            ></slot>
            <template v-else-if="column.type==='upload'">
              <avue-crud-img
                :listType="column.listType"
                :imgWidth="column.imgWidth"
                :fullscreen="column.imgFullscreen"
                :imgHeight="column.imgHeight"
                :type="column.imgType"
                :dataType="column.dataType"
                :size="isMediumSize"
                :value="scope.row[column.prop]"
              ></avue-crud-img>
            </template>
            <template v-else>
              <span v-html="detail(scope.row,column)"></span>
            </template>
          </template>
        </el-table-column>
        <el-table-column
          fixed="right"
          v-if="vaildData(tableOption.menu,config.menu)"
          :label="config.menuTitle"
          :align="tableOption.menuAlign"
          :header-align="tableOption.menuHeaderAlign"
          :width="vaildData(tableOption.menuWidth,config.menuWidth)"
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
                  :type="menuText()"
                  :dic="scope.dic"
                  :size="isMediumSize"
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
              :type="menuText()"
              :dic="scope.dic"
              :disabled="btnDisabled"
              :size="isMediumSize"
              :label="scope.label"
              :index="scope.$index"
            ></slot>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <div :class="b('pagination')" v-if="pageFlag">
        <el-pagination
          :current-page.sync="defaultPage.currentPage"
          :background="vaildData(defaultPage.pageBackground,config.pageBackground)"
          :page-size="defaultPage.pageSize"
          :page-sizes="defaultPage.pageSizes"
          @size-change="sizeChange"
          @current-change="currentChange"
          layout="total, sizes, prev, pager, next, jumper"
          :total="defaultPage.total"
        ></el-pagination>
      </div>
    </el-card>
    <!-- 表单 -->
    <el-dialog
      lock-scroll
      :custom-class="vaildData(tableOption.customClass,config.customClass)"
      :fullscreen="tableOption.dialogFullscreen"
      :modal-append-to-body="false"
      :append-to-body="true"
      :title="dialogTitle"
      :close-on-press-escape="tableOption.dialogEscape"
      :close-on-click-modal="tableOption.dialogClickModal"
      :modal="tableOption.dialogModal"
      :show-close="tableOption.dialogCloseBtn"
      :visible.sync="boxVisible"
      :width="vaildData(tableOption.dialogWidth,config.dialogWidth)"
      @close="closeDialog"
    >
      <div :class="b('dialog', ['overflow'])">
        <avue-form
          v-model="tableForm"
          ref="tableForm"
          :disabled="keyBtn"
          :uploadBefore="uploadBefore"
          :uploadAfter="uploadAfter"
          :option="formOption"
        >
          <template slot-scope="scope" v-for="item in columnOption" :slot="item.prop">
            <slot
              :value="scope.value"
              :column="scope.column"
              :dic="scope.dic"
              :disabled="scope.disabled"
              :size="scope.size"
              :row="tableForm"
              :index="tableIndex"
              :name="item.prop+'Form'"
              v-if="item.formsolt"
            ></slot>
          </template>
        </avue-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <!-- 弹出框按钮组 -->
        <slot name="menuForm" :row="tableForm" :type="boxType"></slot>
        <el-button
          type="primary"
          @click="rowUpdate"
          :size="controlSize"
          v-if="boxType=='edit'"
          :loading="keyBtn"
        >{{vaildData(tableOption.updateBtnTitle,config.updateBtnTitle)}}</el-button>
        <el-button
          type="primary"
          @click="rowSave"
          :size="controlSize"
          :loading="keyBtn"
          v-else-if="boxType=='add'"
        >{{vaildData(tableOption.saveBtnTitle,config.saveBtnTitle)}}</el-button>
        <el-button
          :size="controlSize"
          @click="closeDialog"
        >{{vaildData(tableOption.cancelBtnTitle,config.cancelBtnTitle)}}</el-button>
      </span>
    </el-dialog>
    <!-- 动态列 -->
    <el-dialog
      lock-scroll
      :modal-append-to-body="false"
      :append-to-body="true"
      :title="config.columnBtnTitle"
      :visible.sync="columnBox"
    >
      <el-checkbox-group v-model="columnIndex">
        <el-row :span="24">
          <el-col :span="6" v-for="(item,index) in columnList" :key="index">
            <el-checkbox :label="item.prop">{{item.label}}</el-checkbox>
          </el-col>
        </el-row>
      </el-checkbox-group>
    </el-dialog>
  </div>
</template>
<script>
import dateGroup from "../../date-group";
import create from "../../utils/create";
import crud from "../../mixins/crud.js";
import column from "../../mixins/column.js";
import crudComponents from "./crud-components";
import config from "./config.js";
import { validatenull, asyncValidator } from "../../utils/validate.js";
import { setTimeout } from "timers";
export default create({
  name: "crud",
  mixins: [crud(), column()],
  components: {
    crudComponents,
    dateGroup
  },
  data() {
    return {
      clientHeight: document.documentElement.clientHeight,
      defaultForm: {
        tableForm: {},
        searchForm: {}
      },
      defaultPage: {
        total: 0, // 总页数
        currentPage: 1, // 当前页数
        pageSize: 10, // 每页显示多少条
        pageSizes: [10, 20, 30, 40, 50, 100],
        background: true // 背景颜色
      },
      defaultParam: ["$index"],
      keyBtn: false,
      config: config,
      list: [],
      searchShow: true,
      searchForm: {},
      boxVisible: false,
      boxType: "add",
      columnIndex: [],
      columnBox: false,
      columnList: [],
      tableForm: {},
      tableOption: {},
      tableFormRules: {},
      tableIndex: -1,
      tableSelect: []
    };
  },
  created() {
    // 初始化数据
    this.dataInit();
    // 初始化列
    this.columnInit();

    //初始化分页
    this.pageInit();
    this.$emit("on-load", this.defaultPage);
  },
  computed: {
    btnDisabled() {
      return this.keyBtn && this.tableOption.cellBtn;
    },
    pageFlag() {
      return !validatenull(this.page.total);
    },
    dialogTitle() {
      const key = `${this.boxType}Title`;
      return this.tableOption[key] || this.config[key];
    },
    columnOption() {
      return this.tableOption.column || [];
    },
    sumColumnList() {
      return this.tableOption.sumColumnList || [];
    },
    selectLen() {
      return this.tableSelect ? this.tableSelect.length : 0;
    },
    searchSolt() {
      return this.vaildData(this.tableOption.searchsolt, false);
    },
    searchFlag() {
      if (this.searchSolt) return true;
      else return !validatenull(this.searchForm);
    },
    formOption() {
      let option = this.deepClone(this.tableOption);
      option.submitBtn = false;
      option.submitPostion = "right";
      option.boxType = this.boxType;
      option.dicFlag = false;
      option.dicData = this.DIC;
      option.emptyBtn = false;
      return option;
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
        this.pageInit();
      },
      deep: true
    },
    columnOption() {
      this.columnInit();
    },
    data() {
      this.dataInit();
    }
  },
  mounted() {},
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
    menuIcon(value) {
      return this.menuType === "icon" ? "" : value;
    },
    menuText(value) {
      return this.menuType === "text" ? "text" : value;
    },
    closeDialog() {
      this.tableIndex = -1;
      this.tableForm = {};
      this.boxVisible = false;
      this.keyBtn = false;
      this.hide();
    },
    selectClear() {
      this.$refs.table.clearSelection();
    },
    indexMethod(index) {
      return (
        index +
        1 +
        ((this.defaultPage.currentPage || 1) - 1) *
          (this.defaultPage.pageSize || 10)
      );
    },
    refreshChange() {
      this.$emit("refresh-change", {
        page: this.defaultPage,
        searchForm: this.searchForm
      });
    },
    pageInit() {
      this.defaultPage.total = this.page.total || 0;
      this.defaultPage.currentPage = this.page.currentPage || 1;
      this.defaultPage.pageSize = this.page.pageSize || 10;
      this.defaultPage.pageSizes = this.page.pageSizes || [
        10,
        20,
        30,
        40,
        50,
        100
      ];
      this.defaultPage.background = this.page.background || true;
    },
    rulesInit() {
      this.tableFormRules = {};
      this.columnOption.forEach(ele => {
        if (ele.rules) this.tableFormRules[ele.prop] = ele.rules;
      });
    },
    columnInit: function() {
      const safe = this;
      this.columnIndex = [];
      this.columnList = [];

      function addChild(list) {
        list.forEach((ele, index) => {
          const children = ele.children;
          if (!validatenull(children)) {
            safe.tableOption.columnBtn = false;
            addChild(children);
          }
          if (validatenull(ele.hide)) safe.columnIndex.push(ele.prop);
          if (ele.showClomnu !== false) {
            let obj = {
              label: ele.label,
              prop: ele.prop,
              index: index
            };
            safe.columnList.push(safe.deepClone(obj));
          }
        });
      }
      addChild(this.columnOption);
    },
    formVal() {
      Object.keys(this.value).forEach(ele => {
        this.tableForm[ele] = this.value[ele];
      });
      this.$emit("input", this.tableForm);
    },
    dataInit() {
      this.list = [].concat(this.data);
      //初始化序号
      this.list.forEach((ele, index) => {
        ele.$index = index;
      });
    },
    formInit() {
      this.defaultForm = this.formInitVal(this.columnOption);
      this.tableForm = this.deepClone(this.defaultForm.tableForm);
      this.searchForm = this.deepClone(this.defaultForm.searchForm);
      this.searchShow = this.vaildData(
        this.tableOption.searchShow,
        this.config.searchShow
      );
      this.formVal();
    },
    // 搜索清空
    searchReset() {
      this.$refs["searchForm"].resetFields();
      this.$emit("search-reset");
    },
    // 页大小回调
    sizeChange(val) {
      this.defaultPage.currentPage = 1;
      this.defaultPage.pageSize = val;
      this.$emit("on-load", this.defaultPage);
      this.$emit("size-change", val);
    },
    //日期组件回调
    dateChange(val) {
      this.$emit("date-change", val);
    },
    // 页码回调
    currentChange(val) {
      this.$emit("on-load", this.defaultPage);
      this.$emit("current-change", val);
    },
    //设置单选
    currentRowChange(currentRow, oldCurrentRow) {
      this.$emit("current-row-change", currentRow, oldCurrentRow);
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
    // 搜索回调
    searchChange() {
      this.$emit("search-change", this.searchForm);
    },
    // 行双击
    rowDblclick(row, event) {
      this.$emit("row-dblclick", row, event);
    },
    // 行单机
    rowClick(row, event, column) {
      this.$emit("row-click", row, event, column);
    },
    // 新增
    rowAdd() {
      this.boxType = "add";
      this.tableForm = this.deepClone(this.defaultForm.tableForm);
      this.clearDefaultParam();
      this.$emit("input", this.tableForm);
      this.show();
    },
    rowCell(row, index) {
      if (row.$cellEdit) this.rowCellUpdate(row, index);
      else this.rowCellEdit(row, index);
    },
    // 编辑
    rowEdit(row, index) {
      this.tableForm = this.deepClone(row);
      this.clearDefaultParam();
      this.$emit("input", this.tableForm);
      this.tableIndex = index;
      this.boxType = "edit";
      this.show();
    },
    // 单元格编辑
    rowCellEdit(row, index) {
      row.$cellEdit = !row.$cellEdit;
      this.$set(this.list, index, row);
    },
    //单元格更新
    rowCellUpdate(row, index) {
      asyncValidator(this.tableFormRules, row)
        .then(res => {
          this.keyBtn = true;
          this.$emit(
            "row-update",
            row,
            index,
            () => {
              row.$cellEdit = !row.$cellEdit;
              this.$set(this.list, index, row);
            },
            () => {
              this.keyBtn = false;
            }
          );
        })
        .catch(errors => {
          this.$message.warning(errors[0]);
        });
    },
    //查看
    rowView(row, index) {
      this.tableForm = this.deepClone(row);
      this.clearDefaultParam();
      this.$emit("input", this.tableForm);
      this.tableIndex = index;
      this.boxType = "view";
      this.keyBtn = true;
      this.show();
    },
    // 删除
    rowDel(row, index) {
      this.$emit("row-del", row, index);
    },
    // 保存
    rowSave() {
      this.$refs["tableForm"].validate(vaild => {
        if (vaild) {
          this.keyBtn = true;
          this.$emit(
            "row-save",
            this.deepClone(this.tableForm),
            this.closeDialog,
            () => {
              this.keyBtn = false;
            }
          );
        }
      });
    },
    // 更新
    rowUpdate() {
      this.$refs["tableForm"].validate(vaild => {
        if (vaild) {
          this.keyBtn = true;
          const index = this.tableIndex;
          this.$emit(
            "row-update",
            this.deepClone(this.tableForm),
            index,
            this.closeDialog,
            () => {
              this.keyBtn = false;
            }
          );
        }
      });
    },
    // 显示表单
    show(cancel) {
      const callack = () => {
        if (cancel !== true) {
          this.boxVisible = true;
          this.$nextTick(() => {
            this.$refs["tableForm"].cascadeInit();
            this.$refs["tableForm"].clearValidate();
          });
        }
      };
      if (typeof this.beforeOpen === "function")
        this.beforeOpen(callack, this.boxType);
      else callack();
    },
    // 隐藏表单
    hide(cancel) {
      const callack = () => {
        if (cancel !== false) {
          this.$refs["tableForm"].resetForm();
          this.$refs["tableForm"].clearValidate();
        }
      };
      if (typeof this.beforeClose === "function")
        this.beforeClose(callack, this.boxType);
      else callack();
    },
    //清空多余字段
    clearDefaultParam() {
      this.defaultParam.forEach(ele => {
        delete this.tableForm[ele];
      });
    },
    //清空表单
    resetForm() {
      this.$refs["tableForm"].resetForm();
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
