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
      <avue-form :option="formOption"
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
export default create({
  name: 'form-tabs',
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
    formOption () {
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
    }
  }
});
</script>