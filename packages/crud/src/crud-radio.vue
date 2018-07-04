<template>
  <el-radio-group v-model="text"
                  @change="handleChange"
                  :disabled="disabled">
    <el-radio v-for="(item,index) in dic"
              :label="item[valueKey]"
              :border="border"
              :key="index">{{item[labelKey]}}</el-radio>
  </el-radio-group>
</template>

<script>
import crudCompoents from "../../mixins/crud-compoents.js";
export default {
  name: "AvueCrudRadio",
  mixins: [crudCompoents()],
  data () {
    return {};
  },
  props: {},
  watch: {},
  created () { },
  mounted () { },
  methods: {
    handleChange (value) {
      this.$emit("input", value);
    }
  }
};
</script>

<style>
</style>
