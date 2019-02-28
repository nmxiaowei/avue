<template>
  <div class="b()">
    <el-tabs v-model="formIndex"
             :type="option.type"
             @tab-click="handleSwitch"
             :tab-position="option.tabPosition">
      <el-tab-pane v-for="(item,index) in columnOption"
                   :key="index"
                   :disabled="item.disabled"
                   :name="index+''">
        <span slot="label">
          <i :class="item.icon"></i>
          {{item.label}}
        </span>
      </el-tab-pane>
    </el-tabs>
    <div>
      <slot name="before"></slot>
      <template v-for="(item,index) in columnOption">
        <slot :name="item.prop"
              v-if="index+''===formIndex"></slot>
      </template>
      <slot name="after"></slot>
    </div>
  </div>
</template>

<script>
import create from "../../utils/create";
export default create({
  name: "tabs",
  props: {
    option: {
      type: Object,
      required: true
    }
  },
  computed: {
    columnOption() {
      return this.option.column || [];
    },
    columnLen() {
      return this.columnOption.length;
    },
    objectOption() {
      return this.columnOption[this.formIndex];
    }
  },
  watch: {},
  data() {
    return {
      formIndex: 0
    };
  },
  created() {
    this.setVal();
  },
  methods: {
    handleSwitch(tab) {
      this.formIndex = tab.index;
      this.setVal();
    },
    changeTabs(active) {
      this.formIndex = active;
    },
    setVal() {
      this.$emit("change", this.columnOption[this.formIndex]);
    }
  }
});
</script>