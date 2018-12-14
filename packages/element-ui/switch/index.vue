<template>
  <div>
    <el-switch
      v-model="text"
      @change="handleChange"
      @click.native="handleClick"
      :active-text="getDic(1)[labelKey]"
      :active-value="getDic(1)[valueKey]"
      :inactive-value="getDic(0)[valueKey]"
      :inactive-text="getDic(0)[labelKey]"
      :disabled="disabled"
      :readonly="readonly"
      :size="size"
    ></el-switch>
  </div>
</template>

<script>
import create from "core/create";
import props from "../../core/common/props.js";
import event from "../../core/common/event.js";
export default create({
  name: "switch",
  mixins: [props(), event()],
  props: {
    value: {}
  },
  data() {
    return {};
  },
  watch: {},
  created() {},
  mounted() {},
  methods: {
    getDic(index) {
      return this.dic[index] ? this.dic[index] : {};
    }
  }
});
</script>

