<template>
  <el-switch v-model="text"
             @change="handleChange"
             :active-text="getDic(0)[labelKey]"
             :active-value="getDic(0)[valueKey]"
             :inactive-value="getDic(1)[valueKey]"
             :inactive-text="getDic(1)[labelKey]"
             :disabled="disabled"
             :size="size">
  </el-switch>
</template>

<script>
import crudCompoents from "../../mixins/crud-compoents.js";
export default {
  name: "AvueCrudSwitch",
  mixins: [crudCompoents()],
  props: {
    value: {

    },
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
    },
    getDic (index) {
      return this.dic[index] ? this.dic[index] : {};
    }
  }
};
</script>

