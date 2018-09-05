<template>
  <el-radio-group v-model="text"
                  @change="handleChange"
                  @click.native="handleClick"
                  :disabled="disabled">
    <el-radio v-for="(item,index) in dic"
              :label="item[valueKey]"
              :border="border"
              :readonly="readonly"
              :disabled="item[disabledKey]"
              :key="index">{{item[labelKey]}}</el-radio>
  </el-radio-group>
</template>

<script>
import create from '../../utils/create';
import crudCompoents from '../../mixins/crud-compoents.js';
export default create({
  name: 'crud-radio',
  mixins: [crudCompoents()],
  data () {
    return {};
  },
  props: {
    value: {}
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