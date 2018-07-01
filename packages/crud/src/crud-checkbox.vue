<template>
  <el-checkbox-group v-model="text"
                     @change="handleChange">
    <el-checkbox v-for="(item,index) in dic"
                 :label="item[valueKey]"
                 :border="border"
                 :min="min"
                 :max="max"
                 :key="index">{{item[labelKey]}}</el-checkbox>
  </el-checkbox-group>
</template>

<script>
import crudCompoents from "../../mixins/crud-compoents.js";
export default {
  name: "AvueCrudCheckbox",
  mixins: [crudCompoents()],
  data() {
    return {};
  },
  props: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    handleChange(value) {
      this.$emit("input", value);
    }
  }
};
</script>

<style>
</style>
