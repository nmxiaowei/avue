<template>
  <div>
    <el-switch v-model="text"
               @change="handleChange"
               @click.native="handleClick"
               :active-text="getDic(0)[labelKey]"
               :active-value="getDic(0)[valueKey]"
               :inactive-value="getDic(1)[valueKey]"
               :inactive-text="getDic(1)[labelKey]"
               :disabled="disabled"
               :readonly="readonly"
               :size="size">
    </el-switch>
  </div>
</template>

<script>
import create from '../../utils/create';
import crudCompoents from '../../mixins/crud-compoents.js';
export default create({
  name: 'crud-switch',
  mixins: [crudCompoents()],
  props: {
    value: {

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
    },
    getDic (index) {
      return this.dic[index] ? this.dic[index] : {};
    }
  }
});
</script>

