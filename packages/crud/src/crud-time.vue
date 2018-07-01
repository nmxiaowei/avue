<template>
  <el-time-picker v-model="text"
                  type="date"
                  :size="size"
                  :format="format"
                  :value-format="valueFormat"
                  :placeholder="placeholder?placeholder:`请输入${label}`"
                  @change="handleChange"
                  :disabled="disabled"> </el-time-picker>
</template>

<script>
import crudCompoents from "../../mixins/crud-compoents.js";
export default {
  name: "AvueCrudTime",
  mixins: [crudCompoents()],
  data() {
    return {};
  },
  props: {
    valueFormat: {
      default: ""
    },
    format: {
      default: ""
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

<style scoped>
</style>

