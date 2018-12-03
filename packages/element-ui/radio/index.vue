<template>
  <el-radio-group
    v-model="text"
    @change="handleChange"
    @click.native="handleClick"
    :disabled="disabled"
  >
    <el-radio
      v-for="(item,index) in dic"
      :label="item[valueKey]"
      :border="border"
      :readonly="readonly"
      :disabled="item[disabledKey]"
      :key="index"
    >{{item[labelKey]}}</el-radio>
  </el-radio-group>
</template>

<script>
import create from "core/create";
import crudCompoents from "mixins/crud-compoents.js";
import crudFun from "mixins/crud-fun.js";
export default create({
  name: "radio",
  mixins: [crudCompoents(), crudFun()],
  data() {
    return {};
  },
  props: {
    value: {}
  },
  watch: {},
  created() {},
  mounted() {},
  methods: {}
});
</script>