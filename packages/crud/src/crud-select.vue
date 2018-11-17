<template>
  <el-select v-model="text"
             :size="size"
             :multiple="multiple"
             :filterable="filterable"
             :readonly="readonly"
             :clearable="disabled?false:clearable"
             :placeholder="placeholder?placeholder:`请选择${label}`"
             @change="handleChange"
             @click.native="handleClick"
             :disabled="disabled">
    <el-option v-for="(item,index) in dic"
               :key="index"
               :disabled="item[disabledKey]"
               :label="item[labelKey]"
               :value="item[valueKey]">
    </el-option>
  </el-select>

</template>

<script>
import create from '../../utils/create';
import crudCompoents from '../../mixins/crud-compoents.js';
export default create({
  name: 'crud-select',
  mixins: [crudCompoents()],
  data () {
    return {};
  },
  props: {
    value: {
    },
    multiple: {
      type: Boolean,
      default: false
    },
    filterable: {
      type: Boolean,
      default: false
    },
  },
  watch: {
  },
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