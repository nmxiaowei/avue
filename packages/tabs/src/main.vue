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
        <!-- 自定义搜索 -->
        <template slot="search">
          <slot name="search"></slot>
        </template>
        <!-- 自定义搜索按钮 -->
        <template slot="searchMenu">
          <slot name="searchMenu"></slot>
        </template>
        <!-- 自定义表单列 -->
        <template slot-scope="scope"
                  v-for="item in formColumnOption"
                  :slot="item.prop">
          <slot :value="scope.value"
                :column="scope.column"
                :dic="scope.dic"
                :name="item.prop+'Form'"
                v-if="item.formsolt"></slot>
        </template>
        <!-- 自定义表格列 -->
        <template slot-scope="scope"
                  v-for="item in formColumnOption"
                  :slot="item.prop">
          <slot :value="scope.value"
                :column="scope.column"
                :dic="scope.dic"
                :name="item.prop"
                v-if="item.solt"></slot>
        </template>
        <!-- 表格左侧卡槽 -->
        <template slot="menuLeft">
          <slot name="menuLeft"></slot>
        </template>
        <!-- 表格右测卡槽 -->
        <template slot="menuRight">
          <slot name="menuRight"></slot>
        </template>
        <!-- 清空卡槽 -->
        <template slot="empty">
          <slot name="empty"
                v-if="$slots.empty"></slot>
        </template>
        <!-- 折叠面板卡槽 -->
        <template slot-scope="props"
                  slot="expand">
          <slot :row="props.row"
                name="expand"></slot>
        </template>
        <!-- 菜单栏按钮卡槽 -->
        <template slot-scope="scope"
                  slot="menuBtn">
          <slot name="menuBtn"
                :row="scope.row"
                :dic="scope.dic"
                :label="scope.label"
                :index="scope.$index"></slot>
        </template>
        <!-- 菜单栏 -->
        <template slot-scope="scope"
                  slot="menu">
          <slot name="menu"
                :value="scope.value"
                :column="scope.column"
                :dic="scope.dic"></slot>
        </template>
        <!-- 弹出框按钮 -->
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
import fun from '../../mixins/fun'
import { setTimeout } from 'timers';
export default create({
  name: 'tabs',
  mixins: [fun()],
  props: {
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
  }
});
</script>