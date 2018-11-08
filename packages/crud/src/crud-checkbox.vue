<template>
  <el-checkbox-group v-model="text"
                     @change="handleChange"
                     :disabled="disabled"
                     @click.native="handleClick">
    <el-checkbox v-for="(item,index) in dic"
                 :label="item[valueKey]"
                 :border="border"
                 :min="min"
                 :readonly="readonly"
                 :max="max"
                 :disabled="item[disabledKey]"
                 :key="index">{{item[labelKey]}}</el-checkbox>
  </el-checkbox-group>
</template>

<script>
import create from '../../utils/create';
import crudCompoents from '../../mixins/crud-compoents.js';
export default create({
  name: 'crud-checkbox',
  mixins: [crudCompoents()],
  data () {
    return {};
  },
  props: {
    value: {
      type: Array,
      default: () => []
    }
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

