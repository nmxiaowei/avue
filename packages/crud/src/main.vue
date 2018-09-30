<template>
  <div :class="b()">
    <el-card :class="b('box')">
      <div slot="header"
           :class="b('title')"
           v-if="vaildData(tableOption.title,false) || vaildData(tableOption.dateBtn,config.dateBtn)">
        <span>{{tableOption.title}}</span>
        <date-select @change="dateChange"
                     v-if="vaildData(tableOption.dateBtn,config.dateBtn)"
                     :default="vaildData(tableOption.dateDefault,config.dateDefault)"
                     :size="vaildData(tableOption.dateSize,config.dateBtnSize)">
        </date-select>
      </div>
      <div :class="b('header')">
        <el-collapse-transition>
          <el-form :model="searchForm"
                   :inline="true"
                   ref="searchForm"
                   v-if="searchShow && searchFlag">
            <!-- 循环列搜索框 -->
            <el-form-item :prop="column.prop"
                          :label="column.label"
                          v-for="(column,index) in columnOption"
                          :key="index"
                          v-if="column.search">
              <component :size="vaildData(tableOption.searchSize,config.searchComponentSize)"
                         :is="getSearchType(column.type)"
                         v-model="searchForm[column.prop]"
                         :type="getType(column)"
                         :props="column.props || tableOption.props"
                         :format="column.format"
                         :parent="column.parent"
                         :filterable="column.searchFilterable"
                         :filter-method="column.searchFilterMethod"
                         :value-format="column.valueFormat"
                         :multiple="config.searchMultiple.includes(column.type) && vaildData(column.searchMmultiple,false)"
                         clearable
                         :placeholder="column.label"
                         :dic="setDic(column.dicData,DIC[column.dicData])"></component>
            </el-form-item>
            <slot name="search"></slot>
            <el-form-item>
              <el-button type="primary"
                         @click="searchChange"
                         :icon="config.searchBtnIcon"
                         :size="vaildData(tableOption.searchSize,config.searchBtnSize)">{{config.searchBtnTitle}}</el-button>
              <el-button @click="searchReset"
                         :icon="config.emptyBtnIcon"
                         :size="vaildData(tableOption.searchSize,config.emptyBtnSize)">{{config.emptyBtnTitle}}</el-button>
              <slot name="searchMenu"></slot>
            </el-form-item>
          </el-form>
        </el-collapse-transition>
      </div>
      <!-- 表格功能列 -->
      <div :class="b('menu')">
        <div :class="b('left')">
          <el-button type="primary"
                     @click="rowAdd"
                     :icon="config.addBtnIcon"
                     :size="config.addBtnSize"
                     v-if="vaildData(tableOption.addBtn,config.addBtn)">{{config.addBtnTitle}}</el-button>
          <slot name="menuLeft"></slot>
        </div>
        <div :class="b('right')">
          <slot name="menuRight"></slot>
          <el-button :icon="config.refreshBtnIcon"
                     circle
                     :size="config.refreshBtnSize"
                     @click="refreshChange"
                     v-if="vaildData(tableOption.refreshBtn,config.refreshBtn)"></el-button>
          <el-button :icon="config.columnBtnIcon"
                     circle
                     :size="config.columnBtnSize"
                     @click="columnBox=true"
                     v-if="vaildData(tableOption.columnBtn,config.columnBtn)"></el-button>
          <el-button :icon="config.searchboxBtnIcon"
                     circle
                     :size="config.searchboxBtnSize"
                     @click="searchShow=!searchShow"
                     v-if="searchFlag && vaildData(tableOption.searchBtn,config.searchBtn)"></el-button>
        </div>
      </div>
      <el-tag class="avue-tip"
              v-if="vaildData(tableOption.tip,config.tip) && tableOption.selection">
        <i class="el-icon-info avue-tip__icon">&nbsp;</i>
        <span class="avue-tip__name">
          {{config.tipStartTitle}}
          <span class="avue-tip__name--bold">{{selectLen}}</span> {{config.tipEndTitle}}
        </span>
        <span class="avue-tip__btn"
              @click="selectClear"
              v-if="vaildData(tableOption.selectClearBtn,config.selectClearBtn) && tableOption.selection">
          {{config.tipBtnTitle}}
        </span>
      </el-tag>
      <el-table :data="list"
                :highlight-current-row="tableOption.highlightCurrentRow"
                @current-change="currentRowChange"
                :stripe="tableOption.stripe"
                :show-header="tableOption.showHeader"
                :default-sort="tableOption.defaultSort"
                @row-click="rowClick"
                @row-dblclick="rowDblclick"
                :row-class-name="rowClassName"
                :max-height="tableOption.maxHeight"
                :height="tableOption.height=='auto'?(clientHeight - vaildData(tableOption.calcHeight,config.calcHeight)):tableOption.height"
                ref="table"
                :width="setPx(tableOption.width,config.width)"
                :border="tableOption.border"
                v-loading="tableLoading"
                @selection-change="selectionChange"
                @sort-change="sortChange">
        <!-- 折叠面板  -->
        <el-table-column type="expand"
                         width="50"
                         fixed="left"
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
                         fixed="left"
                         align="center">
        </el-table-column>
        <!-- 序号 -->
        <el-table-column v-if="tableOption.index"
                         :label="vaildData(tableOption.indexLabel,config.indexLabel)"
                         type="index"
                         width="50"
                         :index="indexMethod"
                         fixed="left"
                         align="center">
        </el-table-column>
        <!-- 循环列 -->
        <el-table-column v-if="columnIndex.indexOf(column.prop)!=-1"
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
                         :fixed="column.fixed">
          <crud-components v-if="column.children"
                           :columnOption="column.children"
                           :tableOption="tableOption"
                           :tableForm="tableForm"
                           :columnIndex="columnIndex"
                           :DIC="DIC">
            <template slot-scope="scope"
                      v-for="item in column.children"
                      :slot="item.prop">
              <slot :row="scope.row"
                    :dic="scope.dic"
                    :label="scope.label"
                    :name="item.prop"
                    v-if="item.solt"></slot>
            </template>
          </crud-components>
          <template slot-scope="scope">
            <template v-if="cellEditFlag(scope.row,column)">
              <component size="small"
                         :is="getSearchType(column.type)"
                         v-model="tableForm[column.prop]"
                         :type="getType(column)"
                         clearable
                         :placeholder="column.label"
                         :dic="setDic(column.dicData,DIC[column.dicData])"></component>
            </template>
            <slot :row="scope.row"
                  :dic="setDic(column.dicData,DIC[column.dicData])"
                  :label="detail(scope.row,column)"
                  :name="column.prop"
                  v-else-if="column.solt"></slot>
            <template v-else>
              <span v-html="detail(scope.row,column)"></span>
            </template>
          </template>
        </el-table-column>
        <el-table-column fixed="right"
                         v-if="vaildData(tableOption.menu,config.menu)"
                         :label="config.menuTitle"
                         :align="tableOption.menuAlign"
                         :header-align="tableOption.menuHeaderAlign"
                         :width="vaildData(tableOption.menuWidth,config.menuWidth)">
          <template slot-scope="scope">
            <el-dropdown v-if="vaildData(tableOption.menuBtn,config.menuBtn)">

              <el-button type="primary"
                         :size="config.menuBtnSize">
                {{config.menuBtnTitle}}<i class="el-icon-arrow-down el-icon--right"></i>
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
                <slot name="dropMenu"
                      :row="scope.row"
                      :dic="scope.dic"
                      :label="scope.label"
                      :index="scope.$index"></slot>
              </el-dropdown-menu>
            </el-dropdown>
            <el-button type="primary"
                       :icon="scope.row.$cellEdit?config.cellSaveBtnIcon:config.cellEditBtnIcon"
                       :size="config.cellBtnSize"
                       @click.stop="rowCell(scope.row,scope.$index)"
                       v-if="vaildData(tableOption.cellBtn ,config.cellBtn)">{{scope.row.$cellEdit?config.cellSaveBtnTitle:config.cellEditBtnTitle}}</el-button>
            <el-button type="success"
                       :icon="config.viewBtnIcon"
                       :size="config.viewBtnSize"
                       @click.stop="rowView(scope.row,scope.$index)"
                       v-if="vaildData(tableOption.viewBtn,tableOption.menuBtn?false:config.viewBtn)">{{config.viewBtnTitle}}</el-button>
            <el-button type="primary"
                       :icon="config.editBtnIcon"
                       :size="config.editBtnSize"
                       @click.stop="rowEdit(scope.row,scope.$index)"
                       v-if="vaildData(tableOption.editBtn,tableOption.menuBtn?false:config.editBtn)">{{config.editBtnTitle}}</el-button>
            <el-button type="danger"
                       :icon="config.delBtnIcon"
                       :size="config.delBtnSize"
                       @click.stop="rowDel(scope.row,scope.$index)"
                       v-if="vaildData(tableOption.delBtn,tableOption.menuBtn?false:config.delBtn)">{{config.delBtnTitle}}</el-button>
            <slot name="menu"
                  :row="scope.row"
                  :dic="scope.dic"
                  :label="scope.label"
                  :index="scope.$index"></slot>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <div :class="b('pagination')"
           v-if="vaildData(tableOption.page,config.page) && listLen">
        <el-pagination :current-page.sync="page.currentPage"
                       :background="vaildData(tableOption.pageBackground,config.pageBackground)"
                       :page-size="page.pageSize"
                       :page-sizes="page.pageSizes"
                       @size-change="sizeChange"
                       @current-change="currentChange"
                       layout="total, sizes, prev, pager, next, jumper"
                       :total="page.total"></el-pagination>
      </div>
    </el-card>
    <!-- 表单 -->
    <el-dialog lock-scroll
               :custom-class="vaildData(tableOption.customClass,config.customClass)"
               :fullscreen="vaildData(tableOption.formFullscreen,config.formFullscreen)"
               :modal-append-to-body="false"
               :append-to-body="true"
               :title="dialogTitle"
               :visible.sync="boxVisible"
               :width="vaildData(tableOption.formWidth,config.formWidth)"
               @close="hide">
      <div :class="b('dialog', ['overflow'])">
        <avue-form v-model="tableForm"
                   ref="tableForm"
                   :disabled="keyBtn"
                   :uploadBefore="uploadBefore"
                   :uploadAfter="uploadAfter"
                   :option="formOption">
          <template slot-scope="scope"
                    v-for="item in columnOption"
                    :slot="item.prop">
            <slot :value="scope.value"
                  :column="scope.column"
                  :dic="scope.dic"
                  :row="tableForm"
                  :index="tableIndex"
                  :name="item.prop+'Form'"
                  v-if="item.formsolt"></slot>
          </template>
        </avue-form>
      </div>
      <span slot="footer"
            class="dialog-footer">
        <slot name="menuForm"
              :row="tableForm"
              :type="boxType"></slot>
        <el-button type="primary"
                   @click="rowUpdate"
                   v-if="boxType=='edit'"
                   :loading="keyBtn">{{config.updateBtnTitle}}</el-button>
        <el-button type="primary"
                   @click="rowSave"
                   :loading="keyBtn"
                   v-else-if="boxType=='add'">{{config.saveBtnTitle}}</el-button>
        <el-button @click="closeDialog">{{config.cancelBtnTitle}}</el-button>
      </span>
    </el-dialog>
    <!-- 动态列 -->
    <el-dialog lock-scroll
               :modal-append-to-body="false"
               :append-to-body="true"
               :title="config.columnBtnTitle"
               :visible.sync="columnBox">
      <el-checkbox-group v-model="columnIndex">
        <el-row :span="24">
          <el-col :span="6"
                  v-for="(item,index) in columnList"
                  :key="index">
            <el-checkbox :label="item.prop">{{item.label}}</el-checkbox>
          </el-col>
        </el-row>
      </el-checkbox-group>
    </el-dialog>
  </div>
</template>
<script>
import dateSelect from '../../date-select'
import create from '../../utils/create';
import crud from '../../mixins/crud.js';
import column from '../../mixins/column.js';
import crudComponents from './crud-components';
import config from './config.js';
import {
  validatenull
} from '../../utils/validate.js';
import {
  setTimeout
} from 'timers';
export default create({
  name: 'crud',
  mixins: [crud(), column()],
  components: {
    crudComponents,
    dateSelect
  },
  data () {
    return {
      clientHeight: document.documentElement.clientHeight,
      defaultForm: {
        tableForm: {},
        searchForm: {}
      },
      defaultParam: ['$index'],
      keyBtn: false,
      config: config,
      list: [],
      searchShow: true,
      searchForm: {},
      boxVisible: false,
      boxType: 'add',
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
  created () {
    // 初始化数据
    this.dataInit();
    // 初始化列
    this.columnInit();
  },
  computed: {
    dialogTitle () {
      const key = `${this.boxType}Title`;
      return this.tableOption[key] || this.config[key];
    },
    listLen () {
      return this.list.length !== 0
    },
    columnOption () {
      return this.tableOption.column || [];
    },
    selectLen () {
      return this.tableSelect ? this.tableSelect.length : 0;
    },
    searchSolt () {
      return this.vaildData(this.tableOption.searchsolt, false);
    },
    searchFlag () {
      if (this.searchSolt) return true;
      else return !validatenull(this.searchForm);
    },
    formOption () {
      let option = this.deepClone(this.tableOption);
      option.submitBtn = false;
      option.submitPostion = 'right';
      option.boxType = this.boxType;
      option.dicFlag = false;
      option.dicData = this.DIC;
      option.emptyBtn = false;
      return option;
    }
  },
  watch: {
    columnOption () {
      this.columnInit();
    },
    data () {
      this.dataInit();
    }
  },
  mounted () { },
  props: {
    value: {
      type: Object,
      default: () => {
        return {};
      }
    },
    beforeClose: Function,
    beforeOpen: Function,
    rowClassName: Function,
    uploadBefore: Function,
    uploadAfter: Function,
    page: {
      type: Object,
      default () {
        return {
          total: 0, // 总页数
          currentPage: 0, // 当前页数
          pageSize: 10, // 每页显示多少条
          pageSizes: [10, 20, 30, 40, 50, 100],
          background: true // 背景颜色
        };
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
    closeDialog () {
      this.tableIndex = -1;
      this.tableForm = {};
      this.boxVisible = false;
      this.keyBtn = false;
    },
    selectClear () {
      this.$refs.table.clearSelection();
    },
    indexMethod (index) {
      return (index + 1) + (((this.page.currentPage || 1) - 1) * (this.page.pageSize || 10));
    },
    refreshChange () {
      this.$emit('refresh-change', {
        page: this.page,
        searchForm: this.searchForm
      });
    },
    rulesInit () {
      this.tableFormRules = {};
      this.columnOption.forEach(ele => {
        if (ele.rules) this.tableFormRules[ele.prop] = ele.rules;
      });
    },
    columnInit: function () {
      const safe = this;
      this.columnIndex = [];
      this.columnList = [];

      function addChild (list) {
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
      addChild(this.columnOption)
    },
    formVal () {
      Object.keys(this.value).forEach(ele => {
        this.tableForm[ele] = this.value[ele];
      })
      this.$emit('input', this.tableForm);
    },
    dataInit () {
      this.list = [].concat(this.data);
      //初始化序号
      this.list.forEach((ele, index) => {
        ele.$index = index;
      })
    },
    formInit () {
      this.defaultForm = this.formInitVal(this.columnOption);
      this.tableForm = this.deepClone(this.defaultForm.tableForm);
      this.searchForm = this.deepClone(this.defaultForm.searchForm);
      this.searchShow = this.vaildData(this.tableOption.searchShow, this.config.searchShow);
      this.formVal();
    },
    // 搜索清空
    searchReset () {
      this.$refs['searchForm'].resetFields();
      this.$emit('search-reset');
    },
    // 页大小回调
    sizeChange (val) {
      this.$emit('size-change', val);
    },
    //日期组件回调
    dateChange (val) {
      this.$emit('date-change', val);
    },
    // 页码回调
    currentChange (val) {
      this.$emit('current-change', val);
    },
    //设置单选
    currentRowChange (currentRow, oldCurrentRow) {
      this.$emit('current-row-change', currentRow, oldCurrentRow);
    },
    //设置多选选中
    setCurrentRow (row) {
      this.$refs.table.setCurrentRow(row);
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
      this.$emit('selection-change', this.tableSelect);
    },
    // 排序回调
    sortChange (val) {
      this.$emit('sort-change', val);
    },
    // 搜索回调
    searchChange () {
      this.$emit('search-change', this.searchForm);
    },
    // 行双击
    rowDblclick (row, event) {
      this.$emit('row-dblclick', row, event);
    },
    // 行单机
    rowClick (row, event, column) {
      this.$emit('row-click', row, event, column);
    },
    // 新增
    rowAdd () {
      this.boxType = 'add';
      this.tableForm = this.deepClone(this.defaultForm.tableForm);
      this.clearDefaultParam();
      this.$emit('input', this.tableForm);
      this.show();
    },
    rowCell (row, index) {
      if (row.$cellEdit) this.rowCellUpdate(row, index)
      else this.rowCellEdit(row, index)
    },
    // 单元格编辑
    rowCellEdit (row, index) {
      if (this.tableIndex != -1) {
        this.$message.error('先保存当前编辑的数据');
        return;
      }
      this.tableIndex = index;
      this.tableForm = this.deepClone(row);
      this.$emit('input', this.tableForm);
      row.$cellEdit = !row.$cellEdit;
      this.$set(this.list, index, row);
    },
    // 编辑
    rowEdit (row, index) {
      this.tableForm = this.deepClone(row);
      this.clearDefaultParam();
      this.$emit('input', this.tableForm);
      this.tableIndex = index;
      this.boxType = 'edit';
      this.show();
    },

    //查看
    rowView (row, index) {
      this.tableForm = this.deepClone(row);
      this.clearDefaultParam();
      this.$emit('input', this.tableForm);
      this.tableIndex = index;
      this.boxType = 'view';
      this.keyBtn = true;
      this.show();
    },
    rowCellUpdate (row, index) {
      const form = this.deepClone(this.tableForm);
      this.$emit('input', form);
      this.$emit(
        'row-update',
        form,
        index,
        () => {
          row.$cellEdit = !row.$cellEdit;
          this.tableForm = {};
          this.tableIndex = -1;
          this.$set(this.list, index, form);
        }
      );
    },
    // 删除
    rowDel (row, index) {
      this.$emit('row-del', row, index);
    },
    // 保存
    rowSave () {
      this.$refs['tableForm'].validate().then(() => {
        this.keyBtn = true;
        this.$emit('row-save', this.deepClone(this.tableForm), this.closeDialog,
          () => {
            this.keyBtn = false;
          });
      });
    },
    // 更新
    rowUpdate () {
      this.$refs['tableForm'].validate().then(() => {
        this.keyBtn = true;
        const index = this.tableIndex;
        this.$emit(
          'row-update',
          this.deepClone(this.tableForm),
          index,
          this.closeDialog,
          () => {
            this.keyBtn = false;
          }
        );
      });
    },
    // 显示表单
    show (cancel) {
      const callack = () => {
        if (cancel !== true) {
          this.$nextTick(() => {
            this.$refs['tableForm'].clearValidate();
            this.$refs['tableForm'].cascadeInit();
          });
          this.boxVisible = true;
        }
      };
      if (typeof this.beforeOpen === 'function') this.beforeOpen(callack, this.boxType);
      else callack();
    },
    // 隐藏表单
    hide (cancel) {
      const callack = () => {
        if (cancel !== false) {
          this.$refs['tableForm'].resetForm();
          this.$refs['tableForm'].clearValidate();
        }
      };
      if (typeof this.beforeClose === 'function') this.beforeClose(callack, this.boxType);
      else callack();
    },
    //清空多余字段
    clearDefaultParam () {
      this.defaultParam.forEach(ele => {
        delete this.tableForm[ele];
      })
    },
    resetForm () {
      this.$refs['tableForm'].resetForm();
      this.$emit('input', this.tableForm);
    }

  }
});
</script>
