<template>
  <el-slider v-model="text"
             :disabled="disabled"
             :vertical="vertical"
             :height="setPx(height)"
             :step="step"
             :min="min"
             :max="max"
             :range="range"
             :show-stops="showStops"
             :show-input="showInput"
             :marks="marks"
             :format-tooltip="formatTooltip"
             @click="handleClick"></el-slider>
</template>

<script>
import create from "core/create";
import props from "common/common/props.js";
import event from "common/common/event.js";
export default create({
  name: "slider",
  mixins: [props(), event()],
  props: {
    modelValue: {},
    step: {
      type: Number
    },
    min: {
      type: Number
    },
    max: {
      type: Number
    },
    marks: {
      type: Object
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
    vertical: {
      type: Boolean,
      default: false
    },
    formatTooltip: Function,
    height: String,
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
