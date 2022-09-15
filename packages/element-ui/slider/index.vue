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
             :show-tooltip="showTooltip"
             :show-input="showInput"
             :show-input-controls="showInputControls"
             :input-size="size"
             :tooltip-class="tooltipClass"
             :marks="marks"
             :format-tooltip="formatTooltip"
             @click.native="handleClick"></el-slider>
</template>

<script>
import create from "core/create";
import props from "common/common/props.js";
import event from "common/common/event.js";
export default create({
  name: "slider",
  mixins: [props(), event()],
  props: {
    step: Number,
    min: Number,
    max: Number,
    marks: Number,
    range: Boolean,
    showTooltip: Boolean,
    showInput: Boolean,
    showStops: Boolean,
    vertical: Boolean,
    formatTooltip: Function,
    height: String,
    showInputControls: Boolean,
    tooltipClass: String
  }
});
</script>
