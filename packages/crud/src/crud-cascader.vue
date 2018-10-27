<template>
  <el-cascader :options="dic"
               v-model="text"
               :placeholder="placeholder?placeholder:`请选择${label}`"
               :props="props"
               :readonly="readonly"
               :change-on-select="changeoOnSelect"
               :clearable="disabled?false:clearable"
               :expand-trigger="expandTrigger"
               :show-all-levels="showAllLevels"
               :filterable="filterable"
               :separator="separator"
               :disabled="disabled"
               @click.native="handleClick"
               @change="handleChange">
  </el-cascader>
</template>

<script>
import create from '../../utils/create';
import crudCompoents from '../../mixins/crud-compoents.js';
export default create({
  name: 'crud-cascader',
  mixins: [crudCompoents()],
  props: {
    value: {
      type: Array,
      default: () => []
    },
    changeoOnSelect: {
      type: Boolean,
      default: false
    },
    expandTrigger: {
      type: String,
      default: 'hover'
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
      default: '/'
    }
  },
  data () {
    return {};
  },
  watch: {},
  created () { },
  mounted () { },
  methods: {
    handleClick () {
      if (typeof this.click === 'function') this.click({ value: this.text, column: this.column });
    },
    handleChange (value) {
      if (typeof this.change === 'function') this.change({ value: value, column: this.column });
      this.$emit('input', value);
      this.$emit('change', value);
    }
  }
});
</script>
