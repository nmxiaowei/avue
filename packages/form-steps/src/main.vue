<template>
  <div :class="b()">
    <el-steps :active="formIndex"
              :space="option.space"
              :simple="option.simple"
              :process-status="option.processStatus"
              :align-center='vaildData(option.alignCenter,true)'
              :direction="option.direction"
              :class="b({'steps':option.direction})">
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
      <avue-form :option="formOption"
                 :class="b('form')"
                 :style="{width:vaildData(formOption.width,'40%')}"
                 @submit="submit"
                 v-model="text">
        <template slot-scope="scope"
                  v-for="item in formOption.column"
                  :slot="item.prop">
          <slot :value="scope.value"
                :column="scope.column"
                :dic="scope.dic"
                :name="item.prop"
                v-if="item.formsolt"></slot>
        </template>
        <template slot="menuForm">
          <el-button @click="breaks"
                     v-if="formIndex!=1&&formIndex!=columnLen&&vaildData(option.breakBtn,true)">返回</el-button>
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
  name: 'form-steps',
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
    objectOption () {
      return this.columnOption[this.formIndex - 1];
    },
    status () {
      let status = [];
      const leng = this.step - 1;
      for (let i = 0; i < leng; i++) {
        status.push(this.vaildData(this.option.finishStatus, 'success'));
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
      this.formIndex++;
    },
    breaks () {
      this.formIndex--;
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

