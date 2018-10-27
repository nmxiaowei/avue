<template>
  <div class="b()">
    <el-tabs v-model="formIndex"
             :type="option.type"
             :tab-position="option.tabPosition">
      <el-tab-pane v-for="(item,index) in columnOption"
                   :key="index"
                   :disabled="item.disabled"
                   :name="index+''">
        <span slot="label">
          <i :class="item.icon"></i> {{item.label}}</span>
      </el-tab-pane>
    </el-tabs>
    <div>
      <slot name="before"></slot>
      <avue-crud v-if="crudFlag"
                 ref="crud"
                 :option="formOption"
                 :data="data"
                 :table-loading="tableLoading"
                 :before-open="beforeOpen"
                 :before-close="beforeClose"
                 :upload-before="uploadBefore"
                 :upload-after="uploadAfter"
                 :row-class-name="rowClassName"
                 :span-method="spanMethod"
                 :summary-method="summaryMethod"
                 @refresh-change="refreshChange"
                 @search-reset="searchReset"
                 @size-change="size-change"
                 @date-change="date-change"
                 @current-change="currentChange"
                 @current-row-change="currentRowChange"
                 @selection-change="selectionChange"
                 @sort-change="sortChange"
                 @search-change="searchChange"
                 @row-dblclick="rowDblclick"
                 @row-click="rowClick"
                 @row-del="rowDel"
                 @row-save="rowSave"
                 @row-update="rowUpdate"
                 v-model="text">
        <template slot-scope="scope"
                  v-for="item in formColumnOption"
                  :slot="item.prop">
          <slot :value="scope.value"
                :column="scope.column"
                :dic="scope.dic"
                :name="item.prop"
                v-if="item.formsolt"></slot>
        </template>
        <template slot="menuForm">
          <slot name="menuForm"></slot>
        </template>
      </avue-crud>
      <avue-form v-else
                 :option="formOption"
                 :upload-before="uploadBefore"
                 :upload-after="uploadAfter"
                 @submit="submit"
                 ref="form"
                 v-model="text">
        <template slot-scope="scope"
                  v-for="item in formColumnOption"
                  :slot="item.prop">
          <slot :value="scope.value"
                :column="scope.column"
                :dic="scope.dic"
                :name="item.prop"
                v-if="item.formsolt"></slot>
        </template>
        <template slot="menuForm">
          <slot name="menuForm"></slot>
        </template>
      </avue-form>
      <slot name="after"></slot>
    </div>
  </div>
</template>

<script>
import create from '../../utils/create';
import { formInitVal } from '../../utils/util';
import { setTimeout } from 'timers';
export default create({
  name: 'tabs',
  props: {
    tableLoading: {
      type: Boolean,
      default: false,
    },
    beforeOpen: Function,
    beforeClose: Function,
    uploadBefore: Function,
    uploadAfter: Function,
    rowClassName: Function,
    spanMethod: Function,
    summaryMethod: Function,
    data: {
      type: Array,
      default: () => []
    },
    value: {
      type: Object,
      default: () => { }
    },
    option: {
      type: Object,
      required: true
    }
  },
  computed: {
    crudFlag () {
      return this.objectOption.type === 'crud'
    },
    columnOption () {
      return this.option.column || [];
    },
    columnLen () {
      return this.columnOption.length;
    },
    formOption () {
      return this.objectOption.option;
    },
    formColumnOption () {
      return this.formOption.column || [];
    },
    objectOption () {
      return this.columnOption[this.formIndex];
    }
  },
  watch: {
    formIndex () {
      if (!this.crudFlag) {
        setTimeout(() => {
          this.$refs.form.clearValidate();
        }, 0)
      }
      this.formInit();
      this.$emit('change', this.columnOption[this.formIndex]);
    },
    text: {
      handler () {
        for (let o in this.tableForm) {
          this.tableForm[o] = this.text[o];
        }
      },
      deep: true
    },
    value: {
      handler () {
        this.formVal();
      },
      deep: true
    }
  },
  data () {
    return {
      tableForm: {},
      text: {},
      formIndex: '0'
    };
  },
  created () {
    this.formInit();
    this.$emit('change', this.columnOption[this.formIndex]);
  },
  methods: {
    formInit () {
      const column = this.formOption.column;
      this.tableForm = formInitVal(column).tableForm;
      this.formVal();
    },
    formVal () {
      for (let o in this.value) {
        this.text[o] = this.value[o];
      }
      for (let o in this.tableForm) {
        this.tableForm[o] = this.text[o];
      }
      this.$emit('input', this.tableForm);
    },
    submit () {
      this.$emit('submit', this.tableForm);
    },
    refreshChange (params) {
      this.$emit('refresh-change', params);
    },
    searchReset () {
      this.$emit('search-reset');
    },
    sizeChange (val) {
      this.$emit('size-change', val);
    },
    dateChange (val) {
      this.$emit('date-change', val);
    },
    currentChange (val) {
      this.$emit('current-change', val);
    },
    currentRowChange (currentRow, oldCurrentRow) {
      this.$emit('current-row-change', currentRow, oldCurrentRow);
    },
    selectionChange (val) {
      this.$emit('selection-change', val);
    },
    sortChange (val) {
      this.$emit('sort-change', val);
    },
    searchChange (val) {
      this.$emit('search-change', val);
    },
    rowDblclick (row, event) {
      this.$emit('row-dblclick', row, event);
    },
    rowClick (row, event, column) {
      this.$emit('row-click', row, event, column);
    },
    rowDel (row, index) {
      this.$emit('row-del', row, index);
    },
    rowSave (row, done, loading) {
      this.$emit('row-save', row, done, loading);
    },
    rowUpdate (row, index, done, loading) {
      this.$emit('row-update', row, index, done, loading);
    },
    rowAdd () {
      this.$refs.crud.rowAdd();
    },
    rowEdit (row, index) {
      this.$refs.crud.rowEdit(row, index);
    }
  }
});
</script>