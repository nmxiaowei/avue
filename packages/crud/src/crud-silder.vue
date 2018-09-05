<template>
  <el-slider v-model="text"
             :disabled="disabled"
             :step="step"
             :min="min"
             :max="max"
             :range="range"
             :show-stops="showStops"
             :show-input="showInput"
             :format-tooltip="formatTooltip"
             @click.native="handleClick"
             @change="handleChange"></el-slider>
</template>

<script>
import create from '../../utils/create';
import crudCompoents from '../../mixins/crud-compoents.js';
export default create({
  name: 'crud-silder',
  mixins: [crudCompoents()],
  props: {
    value: {

    },
    step: {
      type: Number
    },
    min: {
      type: Number
    },
    max: {
      type: Number
    },
    range: {
      type: Boolean,
      default: false
    },
    showInput: {
      type: Boolean,
      default: false
    },
    showStops: {
      type: Boolean,
      default: false
    },
    formatTooltip: Function
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
