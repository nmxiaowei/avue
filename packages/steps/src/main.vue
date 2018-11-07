<template>
  <div :class="b()">
    <el-steps :active="formIndex"
              :space="option.space"
              :simple="option.simple"
              finish-status="process"
              process-status="wait"
              :align-center='vaildData(option.simple?false:option.alignCenter,true)'
              :direction="option.direction"
              :class="b('tabs',{'steps':option.direction})">
      <el-step :title="item.label"
               :icon="item.icon"
               :status="vaildData(item.status,status[index])"
               :description="item.description"
               v-for="(item,index) in columnOption"
               :key="index"
               @click.native="option.switchBtn?switchs(index):''"></el-step>
    </el-steps>
    <div :class="b('contail')">
      <slot name="before"></slot>
      <div v-if="crudFlag">
        <avue-crud ref="crud"
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
        <div :class="b('menu')">
          <el-button @click="submit"
                     icon="el-icon-back"
                     type="primary">{{lastFlag?'提交':'下一步'}}</el-button>
          <el-button @click="breaks"
                     icon="el-icon-back"
                     v-if="formIndex!=1&&vaildData(option.breakBtn,true)">返 回</el-button>
        </div>
      </div>

      <avue-form v-else
                 :option="formOption"
                 :class="b('form')"
                 @submit="submit"
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
          <el-button @click="breaks"
                     icon="el-icon-back"
                     v-if="formIndex!=1&&vaildData(option.breakBtn,true)">返 回</el-button>
          <slot name="menuForm"></slot>
        </template>
      </avue-form>
      <slot name="after"></slot>
    </div>
  </div>
</template>

<script>
import create from '../../utils/create';
import { deepClone } from '../../utils/util';
import fun from '../../mixins/fun'
import { formInitVal, vaildData } from '../../utils/util';
export default create({
  name: 'steps',
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
    lastFlag () {
      return this.formIndex === this.columnLen;
    },
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
      let formobj = deepClone(this.columnOption[this.formIndex - 1]);
      let submitText = formobj.option.submitText;
      if (!submitText && this.formIndex !== this.columnLen) formobj.option.submitText = '下一步';
      return formobj;
    },
    status () {
      let status = [];
      const leng = this.step - 1;
      for (let i = 0; i < leng; i++) {
        status.push('success');
      }
      return status;
    }

  },
  watch: {
    formOption () {
      this.formInit();
      this.$emit('change', this.objectOption);
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
      step: 1,
      tableForm: {},
      text: {},
      formIndex: 1
    };
  },
  created () {
    this.formInit();
    this.$emit('change', this.columnOption[this.formIndex - 1]);
  },
  methods: {
    reset () {
      this.formIndex = 1;
      this.step = 1;
    },
    switchs (index) {
      if (index < this.step) { this.formIndex = index + 1; }
    },
    next () {
      if (this.step <= this.formIndex) {
        this.step++;
      }
      if (!this.lastFlag) {
        this.formIndex++;
      }

    },
    breaks () {
      this.formIndex--;
    },
    vaildData (val, dafult) {
      return vaildData(val, dafult)
    },
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
      this.$emit('submit', this.tableForm, this.next);
    }
  }
});
</script>

