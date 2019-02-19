<template>
  <div :class="b()">
    <el-steps :active="formIndex"
              :space="option.space"
              :simple="option.simple"
              finish-status="process"
              process-status="wait"
              :align-center="vaildData(option.simple?false:option.alignCenter,true)"
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
      <template v-for="(item,index) in columnOption">
        <slot :name="item.prop"
              v-if="(index+1)===formIndex"></slot>
      </template>
      <slot name="after"></slot>
    </div>
    <div :class="b('menu')">
      <slot name="menu"></slot>
      <el-button type="primary"
                 @click="next">{{submitText}}</el-button>
      <el-button @click="breaks"
                 v-if="formIndex>1">返 回</el-button>
    </div>
  </div>
</template>

<script>
import create from "../../utils/create";
import { vaildData } from "../../utils/util";
export default create({
  name: "steps",
  props: {
    option: {
      type: Object,
      required: true
    }
  },
  computed: {
    submitText() {
      if (this.formIndex < this.columnLen) {
        return "下一步";
      } else {
        return "完 成";
      }
    },
    lastFlag() {
      return this.formIndex === this.columnLen;
    },
    columnOption() {
      return this.option.column || [];
    },
    columnLen() {
      return this.columnOption.length;
    },
    status() {
      let status = [];
      const leng = this.step - 1;
      for (let i = 0; i < leng; i++) {
        status.push("success");
      }
      return status;
    }
  },
  watch: {},
  data() {
    return {
      step: 1,
      formIndex: 1
    };
  },
  created() {
    this.setVal();
  },
  methods: {
    setVal() {
      this.$emit("change", this.columnOption[this.formIndex - 1]);
    },
    switchs(index) {
      if (index < this.step) {
        this.formIndex = index + 1;
        this.setVal();
      }
    },
    next() {
      const callback = () => {
        if (this.step <= this.formIndex) {
          this.step++;
        }
        if (!this.lastFlag) {
          this.formIndex++;
        }
        this.setVal();
      };
      this.$emit("submit", callback);
    },
    breaks() {
      this.formIndex--;
      this.setVal();
    },
    vaildData
  }
});
</script>

