<template>
  <el-select v-model="text"
             :size="size"
             :multiple="multiple"
             :placeholder="placeholder?placeholder:`请选择${label}`"
             @change="handleChange"
             :disabled="disabled">
    <el-option v-for="(item,index) in dic"
               :key="index"
               :label="item[labelKey]"
               :value="item[valueKey]">
    </el-option>
  </el-select>
</template>

<script>
import crudCompoents from "../../mixins/crud-compoents.js";
export default {
  name: "AvueCrudSelect",
  mixins: [crudCompoents()],
  data() {
    return {};
  },
  props: {
    multiple: {
      type: Boolean,
      default: false
    }
  },
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
