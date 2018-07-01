<template>
  <el-date-picker :type="type"
                  v-model="text"
                  :size="size"
                  :format="format"
                  :value-format="valueFormat"
                  :placeholder="placeholder?placeholder:`请输入${label}`"
                  @change="handleChange"
                  :disabled="disabled"> </el-date-picker>
</template>

<script>
import crudCompoents from "../../mixins/crud-compoents.js";
export default {
  name: "AvueCrudDate",
  mixins: [crudCompoents()],
  data() {
    return {
      text: ""
    };
  },
  props: {
    type: {
      default: "date"
    },
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

<style>
</style>
