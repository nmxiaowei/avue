<template>
  <div class="crud-container pull-auto">
    <div class="crud-header">
      <el-collapse-transition>
        <el-form :model="searchForm"
                 :inline="true"
                 ref="searchForm"
                 v-if="searchShow && searchFlag">
          <!-- 循环列搜索框 -->
          <el-form-item :label="column.label"
                        :prop="column.prop"
                        v-for="(column,index) in columnOption"
                        :key="index"
                        v-if="column.search">
            <component size="small"
                       :is="getSearchType(column.type)"
                       v-model="searchForm[column.prop]"
                       :type="getType(column)"
                       :multiple="['checkbox','tree'].includes(column.type)"
                       clearable
                       :placeholder="column.label"
                       :dic="setDic(column.dicData,DIC[column.dicData])"></component>
          </el-form-item>
          <slot name="search"></slot>
          <el-form-item>
            <el-button type="primary"
                       @click="searchChange"
                       icon="el-icon-search"
                       size="small">搜索</el-button>
            <el-button @click="searchReset"
                       icon="el-icon-delete"
                       size="small">清空</el-button>
          </el-form-item>
        </el-form>
      </el-collapse-transition>
    </div>
    <!-- 表格功能列 -->
    <div class="crud-menu">
      <div class="crud-menu_left">
        <el-button type="primary"
                   @click="rowAdd"
                   icon="el-icon-plus"
                   v-if="vaildData(tableOption.addBtn,true)"
                   size="small">新 增</el-button>
        <slot name="menuLeft"></slot>
      </div>
      <div class="crud-menu_right">
        <slot name="menuRight"></slot>
        <el-button icon="el-icon-refresh"
                   circle
                   size="small"
                   @click="refreshChange"
                   v-if="vaildData(tableOption.refreshBtn,true)"></el-button>
        <el-button icon="el-icon-menu"
                   circle
                   size="small"
                   @click="showClomnuBox=true"
                   v-if="vaildData(tableOption.columnBtn,true)"></el-button>
        <el-button icon="el-icon-search"
                   circle
                   size="small"
                   @click="searchShow=!searchShow"
                   v-if="searchFlag && vaildData(tableOption.searchBtn,true)"></el-button>
      </div>
    </div>
    <el-tag class="avue-tip"
            v-if="vaildData(tableOption.tip,true) && tableOption.selection">
      <i class="el-icon-info">&nbsp;</i>
      <span class="name">当前表格已选择
        <span class="count">{{selectLen}}</span> 项</span>
      <span class="menu">
        <span @click="selectClear"
              v-if="vaildData(tableOption.selectClearBtn,true) && tableOption.selection">清空</span>
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
              :height="tableOption.height=='auto'?(clientHeight - vaildData(tableOption.calcHeight,300)):tableOption.height"
              ref="table"
              :width="setPx(tableOption.width,'100%')"
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
                       :label="vaildData(tableOption.indexLabel,'#')"
                       type="index"
                       width="50"
                       :index="indexMethod"
                       fixed="left"
                       align="center">
      </el-table-column>
      <!-- 循环列 -->
      <el-table-column v-if="showClomnuIndex.indexOf(column.prop)!=-1"
                       v-for="(column,index) in columnOption"
                       :prop="column.prop"
                       :key="column.prop"
                       filter-placement="bottom-end"
                       :filters="column.filters"
                       :filter-method="column.filterMethod"
                       :filter-multiple="vaildData(column.filterMultiple,true)"
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
                         :showClomnuIndex="showClomnuIndex"
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
                       v-if="vaildData(tableOption.menu,true)"
                       label="操作"
                       :align="tableOption.menuAlign"
                       :header-align="tableOption.menuHeaderAlign"
                       :width="vaildData(tableOption.menuWidth,240)">
        <template slot-scope="scope">
          <template v-if="vaildData(tableOption.menu,true)">
            <el-button type="primary"
                       :icon="scope.row.$cellEdit?'el-icon-check':'el-icon-edit'"
                       size="small"
                       @click.stop="rowCell(scope.row,scope.$index)"
                       v-if="vaildData(tableOption.cellBtn ,false)">{{scope.row.$cellEdit?'保存':'修改'}}</el-button>
            <el-button type="success"
                       icon="el-icon-view"
                       size="small"
                       @click.stop="rowView(scope.row,scope.$index)"
                       v-if="vaildData(tableOption.viewBtn,false)">查看</el-button>
            <el-button type="primary"
                       icon="el-icon-edit"
                       size="small"
                       @click.stop="rowEdit(scope.row,scope.$index)"
                       v-if="vaildData(tableOption.editBtn,true)">编 辑</el-button>
            <el-button type="danger"
                       icon="el-icon-delete"
                       size="small"
                       @click.stop="rowDel(scope.row,scope.$index)"
                       v-if="vaildData(tableOption.delBtn,true)">删 除</el-button>
          </template>
          <slot :row="scope.row"
                name="menu"
                :index="scope.$index"></slot>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <div class="crud-pagination"
         v-if="vaildData(tableOption.page,true) && listLen">
      <el-pagination :current-page.sync="page.currentPage"
                     :background="vaildData(tableOption.pageBackground,true)"
                     :page-size="page.pageSize"
                     :page-sizes="page.pageSizes"
                     @size-change="sizeChange"
                     @current-change="currentChange"
                     layout="total, sizes, prev, pager, next, jumper"
                     :total="page.total"></el-pagination>
    </div>
    <!-- 表单 -->
    <el-dialog lock-scroll
               :custom-class="vaildData(tableOption.customClass,'')"
               :fullscreen="vaildData(tableOption.formFullscreen,false)"
               :modal-append-to-body="false"
               :append-to-body="true"
               :title="boxType=='add'?'新增':'编辑'"
               :visible.sync="boxVisible"
               :width="vaildData(tableOption.formWidth,'50%')"
               @close="hide">
      <div class="avue-dialog">
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
                   :loading="keyBtn">修 改</el-button>
        <el-button type="primary"
                   @click="rowSave"
                   :loading="keyBtn"
                   v-else-if="boxType=='add'">新 增</el-button>
        <el-button @click="closeDialog">取 消</el-button>
      </span>
    </el-dialog>
    <!-- 动态列 -->
    <el-dialog lock-scroll
               :modal-append-to-body="false"
               :append-to-body="true"
               title="多选"
               :visible.sync="showClomnuBox">
      <el-checkbox-group v-model="showClomnuIndex">
        <el-row :span="24">
          <el-col :span="6"
                  v-for="(item,index) in showClomnuList"
                  :key="index">
            <el-checkbox :label="item.prop">{{item.label}}</el-checkbox>
          </el-col>
        </el-row>
      </el-checkbox-group>
    </el-dialog>
  </div>
</template>
<script>
import crud from '../../mixins/crud.js';
import column from '../../mixins/column.js';
import crudComponents from './crud-components';
import {
  validatenull
} from '../../utils/validate.js';
export default {
  name: 'AvueCrud',
  mixins: [crud(), column()],
  components: { crudComponents },
  data () {
    return {
      clientHeight: document.documentElement.clientHeight,
      defaultForm: {
        tableForm: {},
        searchForm: {}
      },
      keyBtn: false,
      list: [],
      searchShow: true,
      searchForm: {},
      boxVisible: false,
      boxType: 'add',
      showClomnuIndex: [],
      showClomnuBox: false,
      showClomnuList: [],
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
    this.showClomnuInit();
  },
  computed: {
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
      let option = Object.assign({}, this.tableOption);
      option.submitBtn = false;
      option.submitPostion = 'right';
      option.boxType = this.boxType;
      option.dicFlag = false;
      option.dicData = this.DIC;
      return option;
    }
  },
  watch: {
    columnOption () {
      this.showClomnuInit();
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
      this.$emit('refresh-change', this.page);
    },
    rulesInit () {
      this.tableFormRules = {};
      this.columnOption.forEach(ele => {
        if (ele.rules) this.tableFormRules[ele.prop] = ele.rules;
      });
    },
    showClomnuInit: function () {
      const safe = this;
      this.showClomnuIndex = [];
      this.showClomnuList = [];
      function addChild (list) {
        list.forEach((ele, index) => {
          const children = ele.children;
          if (!validatenull(children)) {
            safe.tableOption.columnBtn = false;
            addChild(children);
          }
          if (validatenull(ele.hide)) safe.showClomnuIndex.push(ele.prop);
          if (ele.showClomnu !== false) {
            let obj = {
              label: ele.label,
              prop: ele.prop,
              index: index
            };
            safe.showClomnuList.push(Object.assign({}, obj));
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
      this.list = Object.assign([], this.data);
      //初始化序号
      this.list.forEach((ele, index) => {
        ele.$index = index;
      })
    },
    formInit () {
      this.defaultForm = this.formInitVal(this.columnOption);
      this.tableForm = Object.assign({}, this.defaultForm.tableForm);
      this.searchForm = Object.assign({}, this.defaultForm.searchForm);
      this.searchShow = this.vaildData(this.tableOption.search, true);
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
      this.tableForm = Object.assign({}, this.defaultForm.tableForm);
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
      this.tableForm = Object.assign({}, row);
      this.$emit('input', this.tableForm);
      row.$cellEdit = !row.$cellEdit;
      this.$set(this.list, index, row);
    },
    // 编辑
    rowEdit (row, index) {
      this.tableForm = Object.assign({}, row);
      this.$emit('input', this.tableForm);
      this.tableIndex = index;
      this.boxType = 'edit';
      this.show();
    },

    //查看
    rowView (row, index) {
      this.tableForm = Object.assign({}, row);
      this.$emit('input', this.tableForm);
      this.tableIndex = index;
      this.boxType = 'view';
      this.keyBtn = true;
      this.show();
    },
    rowCellUpdate (row, index) {
      const form = Object.assign({}, this.tableForm);
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
        this.$emit('row-save', Object.assign({}, this.tableForm), this.closeDialog);
      });
    },
    // 更新
    rowUpdate () {
      this.$refs['tableForm'].validate().then(() => {
        this.keyBtn = true;
        const index = this.tableIndex;
        this.$emit(
          'row-update',
          Object.assign({}, this.tableForm),
          index,
          this.closeDialog
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
      if (typeof this.beforeOpen === 'function') this.beforeOpen(callack);
      else callack();
    },
    // 隐藏表单
    hide (cancel) {
      const callack = () => {
        if (cancel !== false) {
          this.$refs['tableForm'].resetForm();
          this.tableForm = Object.assign({}, this.defaultForm.tableForm);
          this.$emit('input', this.tableForm);
        }
      };
      if (typeof this.beforeClose === 'function') this.beforeClose(callack);
      else callack();
    },
    resetForm () {
      this.$refs['tableForm'].resetForm();
      this.$emit('input', this.tableForm);
    },
  }
};
</script>
