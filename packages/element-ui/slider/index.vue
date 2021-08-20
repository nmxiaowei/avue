<template>
  <el-slider v-model="text"
             :disabled="disabled"
             :vertical="vertical"
             :height="height"
             :step="step"
             :min="min"
             :max="max"
             :range="range"
             :show-stops="showStops"
             :show-input="showInput"
             :marks="marks"
             :format-tooltip="formatTooltip"
             @click.native="handleClick"></el-slider>
</template>

<script>
import create from "core/create";
import props from "../../core/common/props.js";
import event from "../../core/common/event.js";
export default create({
  name: "slider",
  mixins: [props(), event()],
  props: {
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
    height: String
  }
});
</script>
