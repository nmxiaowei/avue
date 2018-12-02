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
import crudFun from '../../mixins/crud-fun.js';
export default create({
  name: 'crud-silder',
  mixins: [crudCompoents(), crudFun()],
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
  methods: {}
});
</script>
