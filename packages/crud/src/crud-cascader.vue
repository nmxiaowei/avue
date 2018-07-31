<template>
  <el-cascader :options="dic"
               v-model="text"
               :placeholder="placeholder?placeholder:`请选择${label}`"
               :props="props"
               :change-on-select="changeoOnSelect"
               :clearable="clearable"
               :expand-trigger="expandTrigger"
               :show-all-levels="showAllLevels"
               :filterable="filterable"
               :separator="separator"
               :disabled="disabled"
               @change="handleChange">
  </el-cascader>
</template>

<script>
import crudCompoents from "../../mixins/crud-compoents.js";
export default {
  name: "AvueCrudCascader",
  mixins: [crudCompoents()],
  props: {
    value: {
      type: Array,
      default: () => []
    },
    changeoOnSelect: {
      type: Boolean,
      default: false,
    },
    expandTrigger: {
      type: String,
      default: "hover"
    },
    showAllLevels: {
      type: Boolean,
      default: true
    },
    filterable: {
      type: Boolean,
      default: false
    },
    separator: {
      type: String,
      default: "/"
    }
  },
  data () {
    return {};
  },
  watch: {},
  created () { },
  mounted () { },
  methods: {
    handleChange (value) {
      this.$emit("input", value);
      this.$emit("change", value);
    }
  }
};
</script>
