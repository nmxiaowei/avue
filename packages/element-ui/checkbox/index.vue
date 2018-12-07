<template>
  <div :class="b()">
    <el-checkbox-group
      v-model="text"
      @change="handleChange"
      :disabled="disabled"
      @click.native="handleClick"
    >
      <el-checkbox
        v-for="(item,index) in dic"
        :label="item[valueKey]"
        :border="border"
        :min="min"
        :readonly="readonly"
        :max="max"
        :disabled="item[disabledKey]"
        :key="index"
      >{{item[labelKey]}}</el-checkbox>
    </el-checkbox-group>
  </div>
</template>

<script>
import create from "core/create";
import props from "../../core/common/props.js";
import event from "../../core/common/event.js";
export default create({
  name: "checkbox",
  mixins: [props(), event()],
  data() {
    return {};
  },
  props: {
    value: {
      type: Array,
      default: () => []
    }
  },
  watch: {},
  created() {},
  mounted() {},
  methods: {}
});
</script>

